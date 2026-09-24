export type MenuCategory = 'all' | 'signature' | 'espresso' | 'beverage' | 'dessert' | 'beans';

export type TemperatureOption = 'HOT' | 'ICE' | 'BOTH';

export interface TasteProfile {
  acidity: number;  // 1-5
  body: number;     // 1-5
  sweetness: number; // 1-5
  balance: number;   // 1-5
}

export interface NutritionInfo {
  calories: number; // kcal
  sugarGrams?: number;
  caffeineMg?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEng: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  isSignature?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  isDecaf?: boolean;
  isSeasonal?: boolean;
  temperatureOptions: TemperatureOption;
  defaultTemp: 'HOT' | 'ICE';
  tasteProfile?: TasteProfile;
  nutrition?: NutritionInfo;
  allergens?: string[];
  customizableMilk?: boolean;
  customizableSyrup?: boolean;
  customizableShots?: boolean;
}

export interface CustomizationSelections {
  temperature: 'HOT' | 'ICE';
  milkType: 'standard' | 'oat' | 'almond' | 'lowfat';
  syrupType: 'none' | 'vanilla' | 'hazelnut' | 'caramel';
  extraShots: number;
  iceLevel: 'less' | 'normal' | 'extra';
  sweetnessLevel: '30' | '50' | '70' | '100';
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selections: CustomizationSelections;
  quantity: number;
  totalPrice: number;
}

export type SeatingZone = 'window' | 'terrace' | 'quiet' | 'sofa' | 'main';

export interface Reservation {
  id: string;
  reservationCode: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  zone: SeatingZone;
  specialRequest?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface BeanOrigin {
  id: string;
  name: string;
  nameEng: string;
  origin: string;
  process: string; // e.g. "Washed", "Natural"
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  cupNotes: string[];
  description: string;
  price200g: number;
  price500g: number;
  image: string;
  acidityScore: number;
  bodyScore: number;
  balanceScore: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'terrace' | 'barista' | 'bakery';
  image: string;
  description: string;
  zoneName: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  drinkTag: string;
  photoUrl?: string;
  verifiedPickup: boolean;
}

export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'COMPLETED';

export interface Order {
  id: string;
  orderCode: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  pickupTime: string;
  customerPhone: string;
  customerName: string;
  status: OrderStatus;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface TasteQuizAnswers {
  flavorPreference: 'acidic' | 'nutty' | 'sweet' | 'balanced';
  drinkType: 'coffee' | 'non-coffee' | 'dessert-combo';
  temperature: 'hot' | 'ice';
  caffeine: 'full' | 'decaf' | 'any';
}
