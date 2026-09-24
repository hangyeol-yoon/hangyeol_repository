import { BeanOrigin, GalleryItem, Review } from '../types';

export const BEAN_ORIGINS: BeanOrigin[] = [
  {
    id: 'lumiere-house-blend',
    name: '루미에르 하우스 시그니처 블렌드',
    nameEng: 'Lumière House Signature Blend',
    origin: 'Colombia & Ethiopia & Guatemala',
    process: 'Washed & Natural Mix',
    roastLevel: 'Medium',
    cupNotes: ['다크 초콜릿', '헤이즐넛', '감귤 단맛', '은은한 자스민'],
    description: '루미에르 수제 로스팅 랩에서 매일 아침 직화 로스팅하는 하우스 블렌드. 아메리카노와 라떼 모두에서 최고의 풍미 밸런스를 자아냅니다.',
    price200g: 16000,
    price500g: 35000,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    acidityScore: 3,
    bodyScore: 4,
    balanceScore: 5,
  },
  {
    id: 'ethiopia-yirgacheffe-g1',
    name: '에티오피아 예가체프 첼바 G1',
    nameEng: 'Ethiopia Yirgacheffe Chelba G1',
    origin: 'Ethiopia Yirgacheffe Zone',
    process: 'Washed Process',
    roastLevel: 'Light',
    cupNotes: ['화이트 피치', '베르가못', '자스민 꽃향', '꿀의 여운'],
    description: '해발 2,000m 고지대 화산토에서 재배된 유기농 싱글 오리진. 화사한 화이트 와인 같은 깔끔한 산미가 인상적인 마스터 클래스 라이트 로스트 원두입니다.',
    price200g: 18000,
    price500g: 40000,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    acidityScore: 5,
    bodyScore: 2,
    balanceScore: 4,
  },
  {
    id: 'colombia-supremo-decaf',
    name: '콜롬비아 수프리모 스위스워터 디카페인',
    nameEng: 'Colombia Supremo Swiss Water Decaf',
    origin: 'Colombia Huila',
    process: 'Swiss Water Process (Non-Chemical)',
    roastLevel: 'Medium-Dark',
    cupNotes: ['밀크 초콜릿', '구운 아몬드', '브라운 슈가', '카카오'],
    description: '화학 성분을 단 1%도 쓰지 않은 100% 천연 스위스워터 공법 디카페인. 저녁에도 부담 없이 깊고 고소한 커피 본연의 풍미를 즐길 수 있습니다.',
    price200g: 17500,
    price500g: 38000,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80',
    acidityScore: 2,
    bodyScore: 4,
    balanceScore: 5,
  },
  {
    id: 'guatemala-antigua-pastores',
    name: '과테말라 안티구아 파스토레스',
    nameEng: 'Guatemala Antigua Pastores SHB',
    origin: 'Guatemala Sacatepéquez',
    process: 'Washed',
    roastLevel: 'Medium-Dark',
    cupNotes: ['스모키 카카오', '구운 밤', '사과산미', '묵직한 바디'],
    description: '화산재 토양의 깊은 스모키함과 고소한 버터넛 풍미가 일품인 명품 원두. 따뜻한 드립과 디저트에 매칭하기 뛰어납니다.',
    price200g: 16500,
    price500g: 36000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    acidityScore: 2,
    bodyScore: 5,
    balanceScore: 4,
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: '1층 따스한 햇살 라운지',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    description: '통유리를 통해 부드럽게 들어오는 자연광과 원목 테이블이 조화를 이루는 아늑한 홀입니다.',
    zoneName: 'Main Lounge (1F)'
  },
  {
    id: 'g2',
    title: '에스프레소 바 & 바리스타 스테이션',
    category: 'barista',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    description: '전문 바리스타가 정성껏 핸드드립과 에스프레소를 추출하는 오픈 스테이션 공간입니다.',
    zoneName: 'Barista Bar'
  },
  {
    id: 'g3',
    title: '2층 야외 숲속 테라스',
    category: 'terrace',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: '연남동의 녹음을 바라보며 선선한 바람과 함께 커피를 즐길 수 있는 루프탑 테라스입니다.',
    zoneName: 'Garden Terrace (2F)'
  },
  {
    id: 'g4',
    title: '매일 아침 구워내는 수제 베이커리 룸',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: '프랑스산 최고급 발효버터를 사용하여 아침마다 갓 굽는 피낭시에, 크로플, 치즈케이크 베이킹 스테이션.',
    zoneName: 'Bakery Lab'
  },
  {
    id: 'g5',
    title: '콰이엇 스터디 & 미팅 서재존',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    description: '좌석별 콘센트와 은은한 조명이 구비된 작업 및 정독하기 좋은 2층 서재 공간.',
    zoneName: 'Quiet Lounge (2F)'
  },
  {
    id: 'g6',
    title: '직화 아티잔 로스팅 라운지',
    category: 'barista',
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80',
    description: '스페셜티 생두를 엄선하여 최적의 수분율과 배전도로 볶아내는 로스팅 쇼룸입니다.',
    zoneName: 'Roasting Room'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: '김지현 님',
    rating: 5,
    date: '2026.07.28',
    text: '루미에르 시그니처 크림 라떼는 정말 인생 라떼입니다! 밤 크림의 부드러움과 구운 아몬드가 어우러져서 너무 달지 않고 고급스러워요. 창가석 테라스 분위기도 최고라 매주 방문해요.',
    drinkTag: '루미에르 시그니처 크림 라떼',
    verifiedPickup: true,
  },
  {
    id: 'r2',
    author: '박현우 님',
    rating: 5,
    date: '2026.07.25',
    text: '핸드드립 예가체프 향이 미쳤습니다. 꽃향과 살구 느낌의 아로마가 가득해요. 모바일 픽업으로 예약하고 방문했더니 기다림 없이 바로 받아서 사무실 가져가기 편했습니다.',
    drinkTag: '싱글오리진 핸드드립 (예가체프)',
    verifiedPickup: true,
  },
  {
    id: 'r3',
    author: '이민서 님',
    rating: 5,
    date: '2026.07.21',
    text: '생딸기 수제 크로플 바삭하고 따뜻한데 바닐라 아이스크림 올려 먹으니 꿀맛입니다! 매장 음악도 조용하고 좌석 간격도 넓어서 친구랑 수다 떨기 최고예요.',
    drinkTag: '생딸기 수제 바닐라 크로플',
    verifiedPickup: true,
  },
  {
    id: 'r4',
    author: '최서준 님',
    rating: 5,
    date: '2026.07.15',
    text: '디카페인 커피는 늘 아쉬움이 있었는데, 여기 스위스워터 디카페인 라떼는 일반 고소한 라떼랑 구분이 안 될 정도로 맛있어요. 임산부 친구한테도 추천해줬습니다!',
    drinkTag: '스위스워터 디카페인 라떼',
    verifiedPickup: true,
  }
];

export const CAFE_FAQS = [
  {
    q: '매장 주차 및 발렛 파킹이 가능한가요?',
    a: '카페 건물 후면에 전용 주차 공간(5대 가능)이 있으며, 만차 시 도보 2분 거리인 연남동 공영주차장을 무료 할인 쿠폰(1시간 제공)과 함께 이용하실 수 있습니다.'
  },
  {
    q: '반려동물 동반이 가능한가요?',
    a: '네, 1F 야외 테라스 및 2F 가든 구역은 반려동물(리드줄 착용 필수) 동반이 가능합니다. 1F 내부 홀 진입 시에는 케이지 또는 이동 가방 이용을 부탁드립니다.'
  },
  {
    q: '텀블러 지참 시 할인이 제공되나요?',
    a: '지구를 위한 친환경 캠페인으로 개인 텀블러/다회용 컵을 가져오시면 전 음료 메뉴 500원 즉시 할인을 적용해 드립니다.'
  },
  {
    q: '모바일 스마트 픽업 주문은 어떻게 이용하나요?',
    a: '홈페이지 상단 [스마트 픽업] 또는 메뉴에서 원하는 원두/음료 옵션을 선택 후 픽업 예정 시간을 지정하시면, 제조 완료 시 알림톡/화면 알림으로 즉시 안내해 드립니다.'
  },
  {
    q: '단체 대관이나 단체 좌석 예약이 가능한가요?',
    a: '2F 콰이엇 미팅존 및 테라스 전체 공간(최대 16인) 대관 및 사전 예약이 가능합니다. [테이블 예약] 메뉴에서 지정 구역을 선택해 접수해 주세요.'
  }
];
