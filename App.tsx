import React, { useState } from 'react';
import Header from './src/components/Header';
import HomePage from './src/pages/HomePage'
import ServicesPage from './src/pages/ServicesPage';
import CompanyPage from './src/pages/CompanyPage';
import TrainingPage from './src/pages/TrainingPage';
import ShoppingPage from './src/pages/ShoppingPage';
import UserEnrollment from './src/components/UserEnrollment';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage />;
      case 'company':
        return <CompanyPage />;
      case 'training':
        return <TrainingPage />;
      case 'shopping':
        return <ShoppingPage />;
      case 'enrollment':
        return <UserEnrollment />;
      default:
        return <HomePage/>
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'enrollment' && (
        <Header currentPage={currentPage} onNavigate={handleNavigation} />
      )}
      {renderPage()}
    </div>
  );
}

export default App;