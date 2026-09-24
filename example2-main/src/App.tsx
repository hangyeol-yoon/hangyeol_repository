import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { MenuItemModal } from './components/MenuItemModal';
import { TasteQuizModal } from './components/TasteQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { ReservationSection } from './components/ReservationSection';
import { BeansSection } from './components/BeansSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

import { MENU_ITEMS } from './data/menuData';
import {
  MenuItem,
  CustomizationSelections,
  CartItem,
  Order,
  Reservation,
  BeanOrigin,
  ToastMessage,
} from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTasteQuizOpen, setIsTasteQuizOpen] = useState(false);
  const [isOrderReceiptOpen, setIsOrderReceiptOpen] = useState(false);

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to Cart
  const handleAddToCart = (
    item: MenuItem,
    selections: CustomizationSelections,
    quantity: number
  ) => {
    // Extras cost
    let extraCost = 0;
    if (selections.milkType === 'oat' || selections.milkType === 'almond') extraCost += 500;
    if (selections.syrupType !== 'none') extraCost += 500;
    extraCost += selections.extraShots * 500;

    const unitPrice = item.price + extraCost;
    const cartItemId = `${item.id}-${selections.temperature}-${selections.milkType}-${selections.syrupType}-${selections.extraShots}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartItemId,
      item,
      selections,
      quantity,
      totalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    addToast(
      'success',
      '장바구니 담기 완료',
      `'${item.name}' ${quantity}개가 장바구니에 담겼습니다.`
    );
  };

  // Quick Add To Cart
  const handleQuickAddToCart = (item: MenuItem) => {
    handleAddToCart(
      item,
      {
        temperature: item.defaultTemp,
        milkType: 'standard',
        syrupType: 'none',
        extraShots: 0,
        iceLevel: 'normal',
        sweetnessLevel: '100',
      },
      1
    );
  };

  // Order Beans
  const handleOrderBeans = (bean: BeanOrigin, weight: '200g' | '500g') => {
    const price = weight === '200g' ? bean.price200g : bean.price500g;
    const dummyMenuItem: MenuItem = {
      id: bean.id,
      name: `${bean.name} (${weight})`,
      nameEng: bean.nameEng,
      category: 'beans',
      price: price,
      description: bean.description,
      image: bean.image,
      temperatureOptions: 'HOT',
      defaultTemp: 'HOT',
    };

    handleQuickAddToCart(dummyMenuItem);
    setIsCartOpen(true);
  };

  // Cart Management
  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const unitPrice = ci.totalPrice / ci.quantity;
          return { ...ci, quantity: newQty, totalPrice: unitPrice * newQty };
        }
        return ci;
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  // Checkout
  const handleCheckout = (orderData: {
    customerName: string;
    customerPhone: string;
    pickupTime: string;
    discountAmount: number;
  }) => {
    const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const finalAmount = Math.max(0, subtotal - orderData.discountAmount);
    const orderCode = `LUM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: Date.now().toString(),
      orderCode,
      items: [...cartItems],
      totalAmount: subtotal,
      discountAmount: orderData.discountAmount,
      finalAmount,
      pickupTime: orderData.pickupTime,
      customerPhone: orderData.customerPhone,
      customerName: orderData.customerName,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };

    setActiveOrder(newOrder);
    setCartItems([]);
    setIsCartOpen(false);
    setIsOrderReceiptOpen(true);

    addToast(
      'success',
      '픽업 주문 성공',
      `주문번호 ${orderCode}로 접수되었습니다. 바리스타가 음료를 준비합니다.`
    );
  };

  // Order status advance simulation
  const handleSimulateStatusAdvance = () => {
    if (!activeOrder) return;
    let nextStatus: Order['status'] = 'PREPARING';
    if (activeOrder.status === 'RECEIVED') nextStatus = 'PREPARING';
    else if (activeOrder.status === 'PREPARING') nextStatus = 'READY';
    else if (activeOrder.status === 'READY') nextStatus = 'COMPLETED';

    setActiveOrder({ ...activeOrder, status: nextStatus });

    if (nextStatus === 'PREPARING') {
      addToast('info', '바리스타 제조 진행 중', '전문 바리스타가 커피 추출을 시작했습니다.');
    } else if (nextStatus === 'READY') {
      addToast(
        'success',
        '🎉 픽업 준비 완료!',
        '음료 준비가 완료되었습니다! 카운터에서 주문번호를 말씀해주세요.'
      );
    }
  };

  // Smooth Scroll Navigation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -80; // header height offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2421] selection:bg-[#C86D51] selection:text-white">
      {/* Sticky Header Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTasteQuiz={() => setIsTasteQuizOpen(true)}
        activeOrder={activeOrder}
        onOpenOrderReceipt={() => setIsOrderReceiptOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onNavigateMenu={() => scrollToSection('menu')}
          onNavigateReservation={() => scrollToSection('reservation')}
          onOpenTasteQuiz={() => setIsTasteQuizOpen(true)}
        />

        <MenuSection
          menuItems={MENU_ITEMS}
          onSelectItem={(item) => setSelectedMenuItem(item)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        <BeansSection onOrderBeans={handleOrderBeans} />

        <ReservationSection
          onReservationComplete={(res) => {
            addToast(
              'success',
              '테이블 예약 완료',
              `${res.date} ${res.time} 예약이 성공적으로 신청되었습니다.`
            );
          }}
        />

        <GallerySection />

        <ReviewsSection />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Modals & Overlays */}
      <MenuItemModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      <TasteQuizModal
        isOpen={isTasteQuizOpen}
        onClose={() => setIsTasteQuizOpen(false)}
        onSelectRecommendedDrink={(drink) => {
          setSelectedMenuItem(drink);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onCheckout={handleCheckout}
      />

      <OrderReceiptModal
        order={activeOrder}
        onClose={() => setIsOrderReceiptOpen(false)}
        onSimulateStatusAdvance={handleSimulateStatusAdvance}
      />

      {/* Floating Toasts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
