import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

interface AppointmentRecord {
  id: string;
  patientName: string;
  patientPhone: string;
  patientBirth: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  date: string;
  time: string;
  visitType: 'first' | 'return';
  symptomDescription: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  qrCodeId: string;
}

// In-memory appointments store with initial sample
const appointmentsStore: AppointmentRecord[] = [
  {
    id: 'MC-20260730-001',
    patientName: '홍길동',
    patientPhone: '010-1234-5678',
    patientBirth: '1985-05-15',
    departmentId: 'internal',
    departmentName: '소화기·순환기 내과',
    doctorId: 'doc-1',
    doctorName: '이수진',
    doctorTitle: '대표원장 / 소화기내과 전문의',
    date: '2026-08-03',
    time: '10:00 AM',
    visitType: 'first',
    symptomDescription: '식후 상복부 둔통 및 가끔 속쓰림 증상',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    qrCodeId: 'QR-MC-850515-001',
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hospitalName: '서울대학교병원' });
  });

  // Appointment API routes
  app.get('/api/appointments', (req, res) => {
    const { phone, name } = req.query;
    if (phone && typeof phone === 'string') {
      const filtered = appointmentsStore.filter(
        (a) => a.patientPhone.replace(/[^0-9]/g, '') === phone.replace(/[^0-9]/g, '')
      );
      res.json({ appointments: filtered });
      return;
    }
    res.json({ appointments: appointmentsStore });
  });

  app.post('/api/appointments', (req, res) => {
    const body = req.body;
    if (!body.patientName || !body.patientPhone || !body.doctorId || !body.date) {
      res.status(400).json({ error: '필수 예약 정보가 누락되었습니다.' });
      return;
    }

    const newAppt: AppointmentRecord = {
      id: `MC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: body.patientName,
      patientPhone: body.patientPhone,
      patientBirth: body.patientBirth || '1990-01-01',
      departmentId: body.departmentId || 'internal',
      departmentName: body.departmentName || '진료과',
      doctorId: body.doctorId,
      doctorName: body.doctorName,
      doctorTitle: body.doctorTitle || '전문의',
      date: body.date,
      time: body.time || '10:00 AM',
      visitType: body.visitType || 'first',
      symptomDescription: body.symptomDescription || '상담 후 진료',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      qrCodeId: `QR-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };

    appointmentsStore.unshift(newAppt);
    res.json({ success: true, appointment: newAppt });
  });

  app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const index = appointmentsStore.findIndex((a) => a.id === id);
    if (index !== -1) {
      appointmentsStore[index].status = 'cancelled';
      res.json({ success: true, appointment: appointmentsStore[index] });
    } else {
      res.status(404).json({ error: '예약을 찾을 수 없습니다.' });
    }
  });

  // Gemini AI Symptom Assistant endpoint
  app.post('/api/ai-consult', async (req, res) => {
    const { symptom, history } = req.body;

    if (!symptom || typeof symptom !== 'string') {
      res.status(400).json({ error: '증상 설명을 입력해주세요.' });
      return;
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY is not set
        res.json({
          reply: `[서울대학교병원 AI 건강상담 - 기본 모드]\n입력하신 증상: "${symptom}"\n\n- 추천 진료과: 소화기내과 또는 가정의학과\n- 조언: 지속되는 불편감이 있으신 경우 병원에 방문하시어 전문의 진찰 및 신체 검사를 받아보시는 것을 권장합니다.\n- 응급 상황: 흉통, 심한 호흡곤란, 39도 이상의 고열, 마비 증상이 동반되면 즉시 24시간 응급의료센터(02-1588-0000)로 내원하세요.`,
          suggestedDepartmentIds: ['internal', 'neurosurgery'],
          urgencyLevel: symptom.includes('가슴') || symptom.includes('응급') || symptom.includes('마비') ? 'emergency' : 'normal',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemPrompt = `
You are Seoul National University Hospital's empathetic AI Medical Health Assistant (서울대학교병원 AI 건강상담 도우미) in South Korea.
Your goal is to provide compassionate, clear, structured medical guidance in professional Korean based on the patient's symptoms.

Hospital Departments Available:
1. 소화기·순환기 내과 (id: internal) - 위/장, 간, 고혈압, 당뇨, 심장
2. 정형외과·관절센터 (id: orthopedics) - 관절, 허리/목 디스크, 인대, 골절
3. 신경외과·뇌혈관센터 (id: neurosurgery) - 뇌졸중, 두통, 어지럼증, 신경마비
4. 심장혈관흉부외과 (id: cardiovascular) - 흉통, 협심증, 하지정맥류, 숨참
5. 소아청소년과 (id: pediatrics) - 영유아/소아 질환, 발열, 아토피, 성장
6. 안과 센터 (id: ophthalmology) - 백내장, 시력, 안구건조, 눈 통증
7. 피부성형외과 (id: dermatology) - 피부 질환, 습진, 레이저 치료
8. 종합건강증진센터 (id: health_checkup) - 전신 종합검진, 암검진, 3.0T MRI

Response Instructions:
- Answer in warm, respectful, reassuring Korean.
- Structure your answer clearly with sections:
  1. 🩺 **증상 분석 및 예상 질환 참고사항** (Explain possible causes in simple terms)
  2. 🏥 **추천 진료과** (Recommend matching hospital department(s))
  3. 💡 **자가 관리 및 내원 전 주의사항** (Rest, hydration, fasting instructions if needed)
  4. ⚠️ **즉시 응급실 내원이 필요한 경고 증상 (Red Flags)**
- Include an explicit medical disclaimer at the end: "※ 본 AI 상담은 의사의 정밀 진단을 대체할 수 없으며, 정확한 진단을 위해 본원 전문의 진료를 권장합니다."
- Determine urgency level: 'normal' (일반 외래), 'caution' (주의 필요), or 'emergency' (24시간 응급실 권장).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: `환자의 증상 문의: "${symptom}"` }] },
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const textOutput = response.text || '상담 결과를 생성하지 못했습니다.';

      let urgencyLevel: 'normal' | 'caution' | 'emergency' = 'normal';
      if (symptom.includes('가슴') || symptom.includes('흉통') || symptom.includes('마비') || symptom.includes('의식') || symptom.includes('출혈')) {
        urgencyLevel = 'emergency';
      } else if (symptom.includes('어지러') || symptom.includes('고열') || symptom.includes('심한')) {
        urgencyLevel = 'caution';
      }

      // Extract matching department IDs
      const suggestedDepartmentIds: string[] = [];
      if (symptom.includes('위') || symptom.includes('속') || symptom.includes('소화') || symptom.includes('배')) suggestedDepartmentIds.push('internal');
      if (symptom.includes('무릎') || symptom.includes('허리') || symptom.includes('관절') || symptom.includes('다리')) suggestedDepartmentIds.push('orthopedics');
      if (symptom.includes('머리') || symptom.includes('두통') || symptom.includes('어지')) suggestedDepartmentIds.push('neurosurgery');
      if (symptom.includes('가슴') || symptom.includes('숨') || symptom.includes('심장')) suggestedDepartmentIds.push('cardiovascular');
      if (symptom.includes('아이') || symptom.includes('아기') || symptom.includes('열')) suggestedDepartmentIds.push('pediatrics');
      if (symptom.includes('눈') || symptom.includes('시력')) suggestedDepartmentIds.push('ophthalmology');
      if (suggestedDepartmentIds.length === 0) suggestedDepartmentIds.push('internal');

      res.json({
        reply: textOutput,
        suggestedDepartmentIds,
        urgencyLevel,
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        error: 'AI 상담 서비스 연결 중 오류가 발생했습니다.',
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Seoul National University Hospital Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
