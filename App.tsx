
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import QuickServices from './components/QuickServices';
import FeaturedProducts from './components/FeaturedProducts';
import SolarCTA from './components/SolarCTA';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import RecentProjects from './components/RecentProjects';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import ComparisonTray from './components/ComparisonTray';
import ComparisonModal from './components/ComparisonModal';
import SolarSolutionsPage from './pages/SolarSolutionsPage';
import VehicleTrackingPage from './pages/VehicleTrackingPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = (page: string, slug: string | null = null) => {
    setCurrentPage(page);
    setActiveSlug(slug);
    window.scrollTo(0, 0);
  };
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigateTo('dashboard');
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('home');
  }

  const renderPage = () => {
    const pageParts = currentPage.split('/');
    const basePage = pageParts[0];
    
    // Protected routes check
    if (basePage === 'dashboard' && !isAuthenticated) {
        return <LoginPage navigateTo={navigateTo} onLoginSuccess={handleLoginSuccess} />;
    }

    switch (basePage) {
      case 'home':
        return (
          <main>
            <HeroSection navigateTo={navigateTo} />
            <QuickServices navigateTo={navigateTo} />
            <FeaturedProducts navigateTo={navigateTo} />
            <SolarCTA navigateTo={navigateTo} />
            <TestimonialsCarousel />
            <RecentProjects navigateTo={navigateTo} />
            <BookingSection navigateTo={navigateTo} />
          </main>
        );
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'services':
        return <ServicesPage navigateTo={navigateTo} />;
      case 'solar':
        return <SolarSolutionsPage navigateTo={navigateTo} />;
      case 'vehicle-tracking':
        return <VehicleTrackingPage />;
      case 'shop':
        return <ShopPage navigateTo={navigateTo} />;
      case 'productDetail':
        return activeSlug ? <ProductDetailPage slug={activeSlug} navigateTo={navigateTo} /> : <ShopPage navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage navigateTo={navigateTo} />;
      case 'checkout':
        return <CheckoutPage navigateTo={navigateTo} isAuthenticated={isAuthenticated} onLogin={handleLoginSuccess} />;
      case 'orderSuccess':
        return activeSlug ? <OrderSuccessPage orderId={activeSlug} navigateTo={navigateTo} /> : <ShopPage navigateTo={navigateTo} />;
      case 'orderTracking':
        return activeSlug ? <OrderTrackingPage orderId={activeSlug} navigateTo={navigateTo} /> : <DashboardPage navigateTo={navigateTo} activePage="orders" onLogout={handleLogout} />;
      case 'dashboard':
        const subPage = pageParts[1] || 'overview';
        return <DashboardPage navigateTo={navigateTo} activePage={subPage} onLogout={handleLogout} />;
      case 'login':
          return <LoginPage navigateTo={navigateTo} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
          return <RegisterPage navigateTo={navigateTo} />;
      case 'forgot-password':
          return <ForgotPasswordPage navigateTo={navigateTo} />;
      case 'reset-password':
          return <ResetPasswordPage navigateTo={navigateTo} />;
      case 'contact':
          return <ContactPage navigateTo={navigateTo} />;
      default:
         return (
          <main>
            <HeroSection navigateTo={navigateTo} />
            <QuickServices navigateTo={navigateTo} />
            <FeaturedProducts navigateTo={navigateTo} />
            <SolarCTA navigateTo={navigateTo} />
            <TestimonialsCarousel />
            <RecentProjects navigateTo={navigateTo} />
            <BookingSection navigateTo={navigateTo} />
          </main>
        );
    }
  };

  return (
    <div className="overflow-x-hidden w-full min-h-screen relative">
      <Header 
        navigateTo={navigateTo} 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        activePage={currentPage}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage.split('?')[0]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer navigateTo={navigateTo} />
      <ComparisonTray onCompare={() => setIsComparisonModalOpen(true)} />
      <ComparisonModal isOpen={isComparisonModalOpen} onClose={() => setIsComparisonModalOpen(false)} />
    </div>
  );
};

export default App;
