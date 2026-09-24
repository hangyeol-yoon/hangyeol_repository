import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRAYER_REQUESTS } from './src/data/churchData.js';
import { PrayerRequest } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory prayer requests list initialized with sample data
  let prayerList: PrayerRequest[] = [...INITIAL_PRAYER_REQUESTS];
  let newFamilyList: any[] = [];

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', church: '은혜와 평강 교회' });
  });

  // Get Prayer Requests
  app.get('/api/prayers', (req, res) => {
    res.json({ success: true, data: prayerList });
  });

  // Add Prayer Request
  app.post('/api/prayers', (req, res) => {
    const { author, isPrivate, category, content } = req.body;
    if (!content || !category) {
      return res.status(400).json({ success: false, error: '내용과 카테고리를 입력해주세요.' });
    }

    const newPrayer: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      author: author || '성도',
      isPrivate: Boolean(isPrivate),
      category: category || '기타',
      content,
      createdAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      prayCount: 1,
    };

    prayerList.unshift(newPrayer);
    res.json({ success: true, data: newPrayer });
  });

  // Increment Pray Count ("함께 기도하기")
  app.post('/api/prayers/:id/pray', (req, res) => {
    const { id } = req.params;
    const prayer = prayerList.find((p) => p.id === id);
    if (prayer) {
      prayer.prayCount += 1;
      return res.json({ success: true, prayCount: prayer.prayCount });
    }
    res.status(404).json({ success: false, error: '기도 항목을 찾을 수 없습니다.' });
  });

  // New Family Registration
  app.post('/api/new-family', (req, res) => {
    const formData = req.body;
    if (!formData.name || !formData.phone) {
      return res.status(400).json({ success: false, error: '이름과 연락처는 필수 입력 항목입니다.' });
    }
    const entry = {
      id: `fam-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    newFamilyList.push(entry);
    res.json({ success: true, message: '새가족 등록 신청이 성공적으로 접수되었습니다. 담당 교역자가 조만간 연락드리겠습니다.', data: entry });
  });

  // AI Daily Bible Meditation Generator (Gemini Server-side Route)
  app.post('/api/ai/devotional', async (req, res) => {
    try {
      const { topic, passage } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback default response if key not configured
        return res.json({
          success: true,
          devotional: {
            passage: passage || '시편 23편 1절 - 여호화는 나의 목자시니 내게 부족함이 없으리로다.',
            theme: topic || '주님의 동행과 위로',
            reflection: '하나님은 우리의 진정한 목자이시며 삶의 모든 필요를 채우시는 분이십니다. 오늘 하루도 환경을 바라보기보다 내 삶을 인도하시는 주님의 손길을 신뢰하며 나아갑시다.',
            prayer: '선하신 목자이신 하나님, 오늘 하루도 제 삶의 걸음을 인도하여 주시고 마음의 평강을 누리게 하소서. 예수님의 이름으로 기도합니다. 아멘.',
            keyAction: '오늘 주변의 누군가에게 따뜻한 격려의 말 한마디 건네기',
          },
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `당신은 한국 교회의 따뜻하고 지혜로운 은혜와 평강교회 목회자입니다.
주제: ${topic || '희망과 은혜'}
성경 구절: ${passage || '마태복음 11장 28절 - 수고하고 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라'}

다음 내용이 담긴 오늘의 성경 묵상(QT) 글을 JSON 형식으로 작성해 주세요.
응답 형식(JSON만 출력):
{
  "passage": "성경 본문과 구절",
  "theme": "묵상 주제 제목",
  "reflection": "따뜻하고 영적인 2~3문장의 묵상 글",
  "prayer": "마무리 짧은 한 문장의 기도문",
  "keyAction": "오늘 하루 실천해볼 한 가지 작은 실천 지침"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      // Parse JSON from result
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, devotional: parsed });
      } else {
        return res.json({
          success: true,
          devotional: {
            passage: passage || '마태복음 11:28',
            theme: '주님 안에서의 참된 안식',
            reflection: text,
            prayer: '주님 안에서 피곤한 영혼이 힘을 얻게 하소서.',
            keyAction: '감사한 일 3가지 찾아 적어보기',
          },
        });
      }
    } catch (err: any) {
      console.error('Gemini Devotional Error:', err);
      res.json({
        success: true,
        devotional: {
          passage: '이사야 40장 31절',
          theme: '새 힘을 주시는 주님',
          reflection: '오직 여호와를 바라는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다.',
          prayer: '오늘도 저에게 거룩한 새 힘을 부어주옵소서.',
          keyAction: '잠시 숨을 고르고 5분간 마음으로 기도하기',
        },
      });
    }
  });

  // Vite middleware setup for development
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
    console.log(`[Church Web App] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
