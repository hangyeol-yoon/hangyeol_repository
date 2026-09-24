import {
  CeoInfo,
  CompanyOverviewInfo,
  HistoryItem,
  OrgNode,
  ServiceItem,
  PricingPlan,
  SolutionItem,
  PortfolioProject,
  ClientPartner,
  NewsPost,
  JobOpening
} from '../types';

export const COMPANY_INFO = {
  name: '(주)넥스트이노베이션',
  nameEng: 'NEXT INNOVATION Co., Ltd.',
  slogan: 'AI & Cloud Infrastructure for Future Enterprise',
  ceo: '홍길동',
  established: '2021년 04월 15일',
  address: '서울특별시 강남구 테헤란로 427 넥스트타워 12층 (삼성동)',
  tel: '02-555-8900',
  email: 'contact@next-innovation.io',
  businessNo: '128-88-09124',
  mapCoordinates: { lat: 37.5065, lng: 127.0560 }, // 테헤란로 / 선릉-삼성역 부근
};

export const CEO_DATA: CeoInfo = {
  name: '홍길동',
  title: '대표이사 / Chief Executive Officer',
  quote: '기술의 혁신은 기업의 비즈니스를 재정의하고, 더 나은 내일을 여는 열쇠입니다.',
  greeting: [
    '안녕하십니까, (주)넥스트이노베이션 대표이사 홍길동입니다.',
    '넥스트이노베이션은 빠르게 변화하는 글로벌 디지털 환경 속에서 고객사의 디지털 전환(Digital Transformation)을 선도하기 위해 2021년 설립된 B2B AI & Cloud 전문 엔터프라이즈 스타트업입니다.',
    '우리는 단순한 시스템 구축을 넘어, 자체 개발한 LLM 파이프라인과 초고속 클라우드 아키텍처, 실시간 데이터 인텔리전스를 바탕으로 고객의 숨겨진 가치를 발견하고 비즈니스 효율을 극대화합니다.',
    '신뢰, 기술력, 그리고 끊임없는 도전정신으로 글로벌 시장에서 인정받는 대표 인공지능 기술 기업으로 도약하겠습니다. 고객 여러분의 든든한 파트너가 될 것을 약속드립니다.',
    '감사합니다.'
  ],
  signature: '홍 길 동',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
};

export const OVERVIEW_DATA: CompanyOverviewInfo = {
  mission: '인공지능과 클라우드 기술로 기업의 생산성 한계를 뛰어넘고, 최첨단 IT 생태계를 대중화합니다.',
  visionText: '2030년까지 아시아-태평양 지역 1위 엔터프라이즈 AI 파이프라인 & 멀티클라우드 솔루션 프로바이더 도약',
  slogan: 'Next-Generation Enterprise AI & Cloud Synergy',
  stats: [
    { label: '누적 고객사', value: '150+', unit: '개 기업', change: '전년 대비 180% 상승' },
    { label: '완료 프로젝트', value: '280+', unit: '건', change: '성공률 99.8%' },
    { label: '특허 및 지식재산권', value: '35', unit: '건', change: 'AI/클라우드 관련' },
    { label: '시스템 가동률 (SLA)', value: '99.99', unit: '%', change: '24/7/365 관제' }
  ],
  coreValues: [
    {
      title: 'Customer-Centric Innovation',
      desc: '모든 기술 개발의 중심에는 고객 비즈니스의 실질적 성과 창출이 있습니다.',
      icon: 'Target'
    },
    {
      title: 'Uncompromising Quality',
      desc: '엔터프라이즈급 보안성, 안정성, 99.99% 가동률을 타협 없이 보장합니다.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Agile & Scalable Architecture',
      desc: '변화에 즉각 대응 가능한 유연하고 확장성 높은 오케스트레이션을 제공합니다.',
      icon: 'Zap'
    },
    {
      title: 'Data-Driven Precision',
      desc: '직관이 아닌 정확한 실시간 데이터 분석을 기반으로 의사결정을 지원합니다.',
      icon: 'BarChart3'
    }
  ]
};

export const HISTORY_DATA: HistoryItem[] = [
  { year: '2026', quarter: 'Q2', title: '시리즈 B 투자 유치 (180억 원)', desc: 'AI agent 자동화 플랫폼 NEXT-Agent v2.0 공식 출시', tag: 'Investment' },
  { year: '2025', quarter: 'Q4', title: '과학기술정보통신부 AI 우수기업 선정', desc: '금융권 초거대 AI 게이트웨이 시스템 독점 공급 계약', tag: 'Award' },
  { year: '2025', quarter: 'Q1', title: '싱가포르 아시아 지사 설립', desc: '글로벌 멀티클라우드 파트너십 체결 (AWS/GCP/Azure)', tag: 'Global' },
  { year: '2024', quarter: 'Q3', title: '누적 매출 100억 원 달성', desc: '스마트팩토리 비전 검사 AI 솔루션 "Next-Vision" 특허 등록', tag: 'Milestone' },
  { year: '2023', quarter: 'Q2', title: '시리즈 A 투자 유치 (50억 원)', desc: 'R&D 연구소 확장 및 벤처기업 인증 획득', tag: 'Growth' },
  { year: '2022', quarter: 'Q1', title: '클라우드 네이티브 MSP 사업 정식 출범', desc: '고객사 30개 돌파 및 ISO 27001 정보보호 인증 완료', tag: 'Cert' },
  { year: '2021', quarter: 'Q2', title: '(주)넥스트이노베이션 법인 설립', desc: '테헤란로 본사 설립 및 시드 투자 10억 원 유치', tag: 'Founding' }
];

export const ORG_TREE: OrgNode = {
  title: '대표이사 (CEO)',
  head: '홍길동 대표',
  description: '전략 이사회 및 경영총괄',
  children: [
    {
      title: 'AI 연구소 (R&D Center)',
      head: '김이수 최고기술책임자(CTO)',
      description: 'LLM, Computer Vision, Agentic AI 핵심 알고리즘 개발',
      children: [
        { title: 'AI 파이프라인 팀', description: 'LLM Fine-tuning & RAG Engine' },
        { title: '비전 인텔리전스 팀', description: 'Real-time Object Inspection AI' }
      ]
    },
    {
      title: '클라우드 & 데이터 본부',
      head: '박민우 이사',
      description: '멀티클라우드 구축, Kubernetes, BigData Architecture',
      children: [
        { title: 'DevOps & SRE 팀', description: '24/7 Cloud Operations & FinOps' },
        { title: '데이터 파이프라인 팀', description: 'ETL, Data Lake, Real-time Stream' }
      ]
    },
    {
      title: '엔터프라이즈 사업본부',
      head: '최성훈 이사',
      description: 'B2B 맞춤 개발, SI, 솔루션 수주 및 컨설팅',
      children: [
        { title: '금융/공공 사업팀', description: '고보안 규제 준수 시스템' },
        { title: '제조/커머스 사업팀', description: '스마트팩토리 및 DX 컨설팅' }
      ]
    },
    {
      title: '경영지원 & CX 본부',
      head: '정소영 이사',
      description: 'HR, 재무, 마케팅, 고객 성공 및 서비스 지원',
      children: [
        { title: 'Customer Success 팀', description: '사후 관리 및 기술지원 SLA' },
        { title: '피플 & 마케팅 팀', description: '채용, 브랜딩, 브랜딩 PR' }
      ]
    }
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-integration',
    title: '엔터프라이즈 AI 통합 서비스',
    summary: '기업 맞춤형 LLM 구축 및 업무 자동화 Agent 인프라 제공',
    description: '사내 보안 가이드라인을 완벽히 준수하는 온프레미스/프라이빗 Cloud 기반 LLM 모델과 RAG(검색증강생성) 시스템을 구축합니다.',
    icon: 'BrainCircuit',
    features: ['기업 전용 Private LLM 구축', '사내 문서를 활용한 RAG 엔진', 'AI 에이전트 업무 자동화 Workflow', '환각(Hallucination) 방지 필터링'],
    benefits: ['업무 생산성 평균 320% 향상', '기밀 데이터 유출 위험 0%', '고객 응대 자동화율 85% 달성'],
    target: '금융, 의료, 법률, 공공기관 등 보안이 중요한 대기업 및 중견기업',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cloud-architecture',
    title: '클라우드 아키텍처 & MSP',
    summary: 'AWS, GCP, Azure 멀티 클라우드 설계 및 24/7 운영 관제',
    description: '클라우드 마이그레이션부터 Kubernetes 기반 컨테이너 오케스트레이션, FinOps 비용 최적화까지 완벽 지원합니다.',
    icon: 'CloudServer',
    features: ['Multi-Cloud & Hybrid 설계', 'Kubernetes / Microservices 전환', 'FinOps 클라우드 비용 40% 절감', '24/7 SRE 실시간 통합 관제'],
    benefits: ['인프라 가용성 99.99% 보장', '서버 관리 비용 최대 45% 절감', '트래픽 폭주 시 자동 오토스케일링'],
    target: '대용량 트래픽 커머스, SaaS 서비스, 급성장하는 스타트업',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'data-engineering',
    title: '빅데이터 플랫폼 & 실시간 분석',
    summary: '방대한 기업 데이터를 통합하고 실시간 예측 대시보드 구축',
    description: '파편화된 사내 데이터를 Data Lake로 통합하고, 초저지연 Stream Processing으로 실시간 인사이트를 시각화합니다.',
    icon: 'Database',
    features: ['실시간 ETL 및 Data Pipeline', 'Snowflake / BigQuery Data Warehouse', 'BI 대시보드 & 시각화', '머신러닝 기반 미래 수요 예측'],
    benefits: ['데이터 처리 속도 10배 향상', '수작업 리포팅 시간 90% 감축', '데이터 기반 의사결정 정확도 향상'],
    target: '제조, 물류, 마케팅, E-commerce, 리테일 기업',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'custom-dev',
    title: '맞춤형 엔터프라이즈 시스템 개발',
    summary: '웹/앱, ERP, CRM 및 고성능 플랫폼 풀스택 설계 및 개발',
    description: '최신 React, Node.js, Python, Golang 인프라로 확장성 높은 차세대 웹/모바일 응용 소프트웨어를 설계부터 유지보수까지 일체형으로 제공합니다.',
    icon: 'Code2',
    features: ['풀스택 Web & App 개발', 'Microservices Architecture', 'Legacy 시스템 Modernization', '안전한 REST / GraphQL API 설계'],
    benefits: ['빠른 시장 출시 (Time to Market)', '유지보수 용이한 Clean Code', '직관적 UX/UI 체계 적용'],
    target: '신규 DX 사업 추진 기업, 차세대 ERP/CRM 도입 기업',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter DX',
    priceMonthly: 1500000,
    priceYearly: 1200000,
    description: '중소기업 및 스타트업을 위한 핵심 AI & 클라우드 도입 패키지',
    features: [
      '표준 클라우드 인프라 진단 및 설계',
      '기본 LLM API 연동 (월 5만건 제한)',
      '실시간 모니터링 대시보드',
      '주간 기술지원 & 이메일 상담',
      'Standard SLA (99.5% 가용성)'
    ],
    ctaText: '스타터 플랜 시작'
  },
  {
    id: 'business',
    name: 'Business Pro',
    priceMonthly: 3800000,
    priceYearly: 3100000,
    description: '본격적인 AI 에이전트 도입과 확장형 클라우드가 필요한 차세대 기업',
    isPopular: true,
    features: [
      'Private RAG 사내 문서 검색 엔진 구축',
      '멀티클라우드 Kubernetes 오케스트레이션',
      '실시간 BigData 분석 및 custom BI',
      'FinOps 비용 절감 컨설팅 (월 1회)',
      '24/7 전담 SRE 매니저 배정',
      'Pro SLA (99.9% 가용성)'
    ],
    ctaText: '비즈니스 프로 상담'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Custom',
    priceMonthly: 8500000,
    priceYearly: 7000000,
    description: '대기업, 금융, 공공기관을 위한 보안 커스텀 온프레미스/Hybrid 인프라',
    features: [
      '완전 독자 온프레미스 / Private AI 구축',
      '금융/공공 보안 규제 완벽 준수 (망분리 연동)',
      '무제한 트래픽 오토스케일링',
      '소체 코드 소유권 및 전담 R&D 엔지니어링',
      '1:1 VIP 긴급 장애 대응 (10분 이내)',
      'Enterprise SLA (99.99% 가용성)'
    ],
    ctaText: '엔터프라이즈 견적 요청'
  }
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'sol-ai',
    category: 'ai',
    title: 'NEXT AI Gateway & Agent Suite',
    subtitle: '초거대 언어모델 및 에이전트 통합 제어 솔루션',
    description: '기업 내 생성형 AI 사용을 안전하게 관리하고, 사내 데이터 보안 및 토큰 비용을 최대 60% 절감하는 엔터프라이즈 AI 통합 플랫폼입니다.',
    icon: 'Bot',
    highlights: ['사내 보안 필터링 (PII 자동 마스킹)', '멀티 LLM (Gemini, GPT-4, Claude) 자동 스위칭', 'RAG 기반 지식 파이프라인'],
    techStack: ['Python', 'FastAPI', 'VectorDB (Chroma/Milvus)', 'LangChain', 'Google GenAI SDK'],
    architectureSummary: 'Client Req -> Security Gateway (PII Filter) -> Smart Prompt Router -> Hybrid Vector Store / LLM -> Sanitized Response',
    demoType: 'ai-chat',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sol-cloud',
    category: 'cloud',
    title: 'NEXT Cloud Orchestrator',
    subtitle: '멀티 클라우드 자동화 및 비용 최적화(FinOps) 플랫폼',
    description: 'AWS, GCP, Azure를 하나의 통합 UI에서 오케스트레이션하고, 유휴 자원을 자동으로 감지하여 클라우드 비용을 획기적으로 줄여줍니다.',
    icon: 'Layers',
    highlights: ['One-click Kubernetes Cluster Provisioning', 'AI 기반 클라우드 이상 비용 자동 감지', 'Zero-Downtime CI/CD 파이프라인'],
    techStack: ['Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Go', 'Docker'],
    architectureSummary: 'Multi-Cloud Provider API -> Unified Mesh Agent -> Real-time Metric Collector -> FinOps Analytics Engine',
    demoType: 'cloud-metrics',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sol-data',
    category: 'data',
    title: 'NEXT Insight Data Lakehouse',
    subtitle: '초고속 대용량 스트리밍 데이터 분석 인프라',
    description: '초당 수십만 건의 로그 및 트랜잭션 데이터를 실시간으로 수집하고, 인공지능 기반 이상 징후 분석 및 매출 예측을 제공합니다.',
    icon: 'LineChart',
    highlights: ['초저지연 Real-time Stream Analytics', '자동 데이터 스키마 변환 및 정화', '대화형 Natural Language SQL 질의'],
    techStack: ['Apache Kafka', 'Spark', 'Snowflake', 'ClickHouse', 'React', 'D3.js'],
    architectureSummary: 'Raw Logs -> Kafka Broker -> Spark Stream Processing -> ClickHouse Warehouse -> Real-time Visual Dashboard',
    demoType: 'data-chart',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sol-custom',
    category: 'custom',
    title: 'NEXT Core Framework',
    subtitle: '엔터프라이즈 맞춤형 차세대 웹/앱 프레임워크',
    description: '보안성, 속도, 확장성을 모두 고려하여 설계된 마이크로서비스 기반 풀스택 엔터프라이즈 맞춤형 개발 프레임워크입니다.',
    icon: 'Cpu',
    highlights: ['Headless Architecture & GraphQL', 'OAuth2 / SAML / SSO 연동 지원', '모듈형 UI 컴포넌트 라이브러리'],
    techStack: ['TypeScript', 'React 19', 'Next.js / Express', 'PostgreSQL', 'Redis'],
    architectureSummary: 'Web/Mobile Client -> API Gateway (Auth & Rate Limit) -> Microservices Containers -> Distributed Cache & DB',
    demoType: 'custom-workflow',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'A 금융그룹 생성형 AI 고객상담 에이전트 구축',
    client: 'A 금융지주',
    category: 'AI 솔루션',
    industry: 'finance',
    duration: '2025.03 - 2025.09 (6개월)',
    summary: '금융 규제를 준수하는 프라이빗 RAG 기반 LLM 상담 시스템을 구축하여 상담 대기 시간을 80% 감소시켰습니다.',
    challenge: '엄격한 금융 망분리 환경에서 사내 데이터 유출 없이 높은 정확도의 금융 상품 안내 AI가 필요함.',
    solution: '온프레미스 온디바이스 VectorDB 연동과 한국어 금융 용어 Fine-tuned Llama/Gemini 모델 하이브리드 적용.',
    results: [
      { metric: '82%', label: '상담 자동 처리율' },
      { metric: '0.8초', label: '평균 응답 지연 시간' },
      { metric: '100%', label: '금융 보안 실사 통과' }
    ],
    tags: ['Private LLM', 'RAG', '금융 보안', 'VectorDB'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-2',
    title: 'B 글로벌 반도체 제조사 비전 AI 결함 검사 자동화',
    client: 'B 세미콘',
    category: '스마트 팩토리',
    industry: 'manufacturing',
    duration: '2024.08 - 2025.02 (7개월)',
    summary: '초당 60프레임의 반도체 웨이퍼 라인에서 미세 균열 및 결함을 99.9% 정확도로 자동 감지하는 Edge AI 시스템.',
    challenge: '수작업 육안 검사의 한계와 불량률 측정 오차 개선, 초고속 생산 라인과의 실시간 동기화 필요.',
    solution: 'NVIDIA TensorRT 기반 Edge AI 카메라 연동 및 자공 학습 (Auto-labeling) 알고리즘 구축.',
    results: [
      { metric: '99.92%', label: '불량 검출 정확도' },
      { metric: '400%', label: '검사 속도 증가' },
      { metric: '12억/년', label: '손실 비용 절감' }
    ],
    tags: ['Computer Vision', 'Edge AI', '스마트팩토리', 'TensorRT'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-3',
    title: 'C 대학병원 환자 데이터 분석 & 병상 오퍼레이션',
    client: 'C 의료원',
    category: '데이터 분석',
    industry: 'healthcare',
    duration: '2024.01 - 2024.07 (6개월)',
    summary: '응급실 환자 중증도 예측 및 병상 순환 최적화 알고리즘으로 응급 환자 체류 시간을 대폭 단축했습니다.',
    challenge: '환자 입퇴원 데이터와 중환자실 가용성 데이터의 실시간 통합 미비로 병상 정체 현상 발생.',
    solution: 'Kafka + Clickhouse 기반 실시간 의료 데이터 인프라 및 머신러닝 예측 대시보드 구축.',
    results: [
      { metric: '35분', label: '응급실 대기시간 감축' },
      { metric: '94%', label: '병상 가동률 최적화' },
      { metric: 'HIPAA', label: '의료 데이터 가이드라인 준수' }
    ],
    tags: ['Real-time Stream', 'BigData', '의료 AI', 'Predictive BI'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-4',
    title: 'D 대형 이커머스 멀티클라우드 전환 & FinOps 구축',
    client: 'D 커머스',
    category: '클라우드',
    industry: 'commerce',
    duration: '2024.05 - 2024.11 (6개월)',
    summary: '블랙프라이데이 등 초대형 이벤트 시 트래픽 폭주에 완벽 대응하는 Kubernetes 자동 오토스케일링 및 비용 절감.',
    challenge: '단일 클라우드 장애 위험과 블랙프라이데이 시 서버다운 현상, 급증하는 클라우드 비용 부담.',
    solution: 'AWS-GCP 멀티클라우드 Active-Active 설계 및 FinOps 자동 스팟 인스턴스 전환 알고리즘.',
    results: [
      { metric: '48%', label: '월 클라우드 비용 절감' },
      { metric: '100만 TPS', label: '최대 트래픽 무장애 처리' },
      { metric: '0초', label: '다운타임 (Zero Downtime)' }
    ],
    tags: ['Multi-Cloud', 'Kubernetes', 'FinOps', 'Auto-scaling'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67dd35f528?auto=format&fit=crop&w=800&q=80'
  }
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: 'A 금융지주', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&h=100&q=80', industry: '금융/증권', description: '생성형 AI 상담 및 데이터 분석 파트너' },
  { name: 'B 세미콘', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&h=100&q=80', industry: '반도체/제조', description: '스마트팩토리 비전 검사 AI 도입' },
  { name: 'C 의료원', logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&h=100&q=80', industry: '의료/바이오', description: '의료 데이터 플랫폼 및 AI 인프라' },
  { name: 'D 커머스', logo: 'https://images.unsplash.com/photo-1556742049-0a67dd35f528?auto=format&fit=crop&w=200&h=100&q=80', industry: '유통/커머스', description: '멀티클라우드 마이그레이션 및 FinOps' },
  { name: 'E 에너지인프라', logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=200&h=100&q=80', industry: '에너지/공공', description: '스마트 그리드 시뮬레이션 빅데이터' },
  { name: 'F 물류로지스', logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&h=100&q=80', industry: '물류/모빌리티', description: '실시간 경로 최적화 및 ERP 모던화' }
];

export const NEWS_POSTS: NewsPost[] = [
  {
    id: 'news-1',
    category: 'press',
    title: '(주)넥스트이노베이션, 180억 원 규모 시리즈 B 투자 유치 완료',
    date: '2026.06.12',
    mediaName: '한국경제 IT신문',
    summary: 'B2B AI 솔루션 및 멀티클라우드 스타트업 넥스트이노베이션이 글로벌 VC로부터 180억 원 규모의 시리즈 B 투자를 유치했습니다.',
    content: `엔터프라이즈 AI 파이프라인 스타트업 (주)넥스트이노베이션(대표 홍길동)이 총 180억 원 규모의 시리즈 B 투자 유치를 성공적으로 마쳤다고 12일 밝혔다.

이번 투자는 주요 국내외 대형 테크 전문 투자사가 주도했으며, 넥스트이노베이션의 사내 프라이빗 RAG 기술과 멀티클라우드 자동화 플랫폼의 압도적인 기술력이 높은 평가를 받았다.

홍길동 대표는 "이번 투자금을 바탕으로 글로벌 R&D 인재 채용을 대폭 확대하고, 아시아-태평양 지역 엔터프라이즈 DX 시장 진출을 본격화할 것"이라고 강조했다.`,
    tags: ['투자유치', '시리즈B', '스타트업', '기업소식'],
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-2',
    category: 'blog',
    title: '[기술블로그] 생성형 AI 도입 시 PII 데이터 유출을 방지하는 Security Gateway 설계',
    date: '2026.05.28',
    author: '김이수 CTO / AI 연구소',
    readTime: '6분 읽기',
    summary: '금융 및 공공기관에서 LLM을 연동할 때 필수적으로 적용해야 하는 개인정보 마스킹 및 실시간 프롬프트 검증 가이드.',
    content: `기업에서 ChatGPT나 Gemini 같은 외부 LLM 서비스를 업무에 활용하고자 할 때 가장 큰 걸림돌은 단연 '사내 기밀 및 개인식별정보(PII) 유출' 위험입니다.

본 아티클에서는 넥스트이노베이션 AI 연구소에서 개발한 'NEXT AI Gateway'의 PII 자동 탐지 및 정규식-Context 하이브리드 필터링 아키텍처를 상세히 소개합니다.

1. PII 마스킹 처리 알고리즘의 동작 원리
2. VectorDB 저장 시 암호화 토큰화 기술
3. 실시간 프롬프트 인젝션(Prompt Injection) 방어 레이어 구현 사례...`,
    tags: ['AI보안', 'LLM', 'PII마스킹', 'TechBlog'],
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-3',
    category: 'notice',
    title: '[공지] 2026년 상반기 클라우드 보안 표준 (ISO 27001 / ISO 27017) 재인증 완료',
    date: '2026.04.10',
    author: '보안품질관리팀',
    summary: '고객사의 안전한 정보 자산 보호를 위해 최고 수준의 국제 표준 정보보호 인증 체계를 갱신하였습니다.',
    content: `안녕하십니까, 넥스트이노베이션 보안품질관리팀입니다.

당사는 고객 여러분의 소중한 정보와 데이터 자산을 최고 수준으로 보호하기 위해, 국제 표준 정보보호 인증인 ISO/IEC 27001(정보보호경영시스템) 및 ISO/IEC 27017(클라우드 서비스 정보보호) 재심사를 성공적으로 통과하였습니다.

앞으로도 최고 수준의 가용성과 보안성을 갖춘 인프라 서비스를 제공하기 위해 최선을 다하겠습니다.`,
    tags: ['공지사항', 'ISO27001', '클라우드보안', '인증'],
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-4',
    category: 'press',
    title: '과학기술정보통신부 "2025 AI 혁신기업" 장관상 수상',
    date: '2025.12.20',
    mediaName: '디지털타임스',
    summary: '독자 개발한 비전 검사 AI 및 초저지연 데이터 파이프라인의 산업 기여도를 인정받아 과기정통부 장관상을 수상했습니다.',
    content: `(주)넥스트이노베이션이 서울 코엑스에서 열린 '2025 AI/SW 산업의 날' 행사에서 과학기술정보통신부 장관 표창을 수상했다고 20일 밝혔다.

넥스트이노베이션은 제조업 불량률 감소와 금융권 AI 응대 자동화 등 산업 전반의 DX 가속화에 기여한 공로를 높게 인정받았다.`,
    tags: ['과기정통부', '장관상', '수상소식'],
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior LLM / RAG AI Research Engineer',
    department: 'AI 연구소',
    type: '정규직',
    experience: '경력 3년 이상 (또는 관련 석/박사)',
    location: '서울 강남구 (재택 혼합 근무)',
    deadline: '채용 시 마감',
    responsibilities: [
      '기업용 Private LLM 파이프라인 및 RAG 엔진 고도화',
      '한국어/영문 도메인 맞춤형 Fine-tuning 및 Quantization 적용',
      'VectorDB 인덱싱 및 프롬프트 가드레일 레이어 설계'
    ],
    qualifications: [
      'Python, PyTorch, LangChain, LlamaIndex 실무 경험 2년 이상',
      '최신 LLM 논문 구현 및 파인튜닝 경험 보유자',
      'REST API/FastAPI 기반 AI 서비스 배포 경험'
    ],
    preferences: [
      'AI 관련 학회(ACL, EMNLP, NeurIPS 등) 논문 게재자 우대',
      'Google GenAI, OpenAI, Anthropic API 대용량 시스템 연동 경험자'
    ]
  },
  {
    id: 'job-2',
    title: 'Cloud DevOps / Kubernetes SRE Specialist',
    department: '클라우드 본부',
    type: '정규직',
    experience: '경력 4년 이상',
    location: '서울 강남구 (재택 혼합 근무)',
    deadline: '2026.08.31',
    responsibilities: [
      'AWS / GCP / Azure 기반 멀티클라우드 아키텍처 구성 및 관리',
      'Kubernetes 클러스터 구축, GitOps CI/CD 파이프라인 운영',
      '24/7 인프라 가용성 99.99% 유지 및 FinOps 비용 최적화'
    ],
    qualifications: [
      'Docker, Kubernetes(EKS/GKE), Terraform 실무 구축 경험 필수',
      'Linux 시스템 엔지니어링 및 네트워크/보안 프로토콜 이해',
      'Prometheus, Grafana 기반 관제 모니터링 경험'
    ],
    preferences: [
      'AWS CKA/CKAD 자격증 보유자 우대',
      '금융/공공 망분리 클라우드 구축 경험자'
    ]
  },
  {
    id: 'job-3',
    title: 'Senior Full-Stack Web Developer (React & Node.js)',
    department: '엔터프라이즈 사업본부',
    type: '정규직',
    experience: '경력 3년 이상',
    location: '서울 강남구',
    deadline: '채용 시 마감',
    responsibilities: [
      '대규모 B2B 엔터프라이즈 AI/클라우드 관리 대시보드 개발',
      'React 19, TypeScript, Express/Next.js 기반 고성능 UI/UX 설계',
      '실시간 웹소켓/Rest API 연동 및 반응형 컴포넌트 라이브러리 구축'
    ],
    qualifications: [
      'React, TypeScript, Tailwind CSS 기반 모던 웹 개발 실무 3년 이상',
      '상태 관리 및 비동기 데이터 처리 능숙자',
      'Clean Code 및 모듈화 컴포넌트 설계 철학'
    ],
    preferences: [
      'Recharts, D3.js 기반 실시간 대시보드 시각화 경험자',
      'UI/UX Design System 구축 경험자'
    ]
  }
];
