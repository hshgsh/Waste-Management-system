
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './src/components/Header';
import HomePage from './src/pages/HomePage';
import ServicesPage from './src/pages/ServicesPage';
import CompanyPage from './src/pages/CompanyPage';
import TrainingPage from './src/pages/TrainingPage';
import ShoppingPage from './src/pages/ShoppingPage';
import UserEnrollment from './src/components/UserEnrollment';


import LoginModal from './src/components/LoginModal';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  // Show login modal if route is /login
  const showLogin = location.pathname === '/login';
  // Show enrollment page if route is /enrollment
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/enrollment" element={<UserEnrollment />} />
        <Route path="/login" element={<LoginModal isOpen={true} onClose={() => window.history.back()} onLoginSuccess={() => window.history.back()} onSwitchToSignup={() => {}} />} />
      </Routes>
    </div>
  );
}

export default App;