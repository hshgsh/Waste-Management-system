import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './src/components/Header';
import HomePage from './src/pages/HomePage';
import ServicesPage from './src/pages/ServicesPage';
import CompanyPage from './src/pages/CompanyPage';
import TrainingPage from './src/pages/TrainingPage';
import ShoppingPage from './src/pages/ShoppingPage';
import UserEnrollment from './src/components/UserEnrollment';
import WasteReporting from './src/components/WasteReporting';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
          {/* Routes with Header */}
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
            </>
          } />
          <Route path="/services" element={
            <>
              <Header />
              <ServicesPage />
            </>
          } />
          <Route path="/company" element={
            <>
              <Header />
              <CompanyPage />
            </>
          } />
          <Route path="/training" element={
            <>
              <Header />
              <TrainingPage />
            </>
          } />
          <Route path="/shopping" element={
            <>
              <Header />
              <ShoppingPage />
            </>
          } />
          <Route path="/waste-reporting" element={
            <>
              <Header />
              <WasteReporting />
            </>
          } />
          
          {/* Routes without Header */}
          <Route path="/enrollment" element={<UserEnrollment />} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;