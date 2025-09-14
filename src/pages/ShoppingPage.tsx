import React from 'react';
import EcoShop from '../components/EcoShop';
import Chatbot from '../components/Chatbot';

const ShoppingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <EcoShop />
      <Chatbot/>
    </div>
  );
};

export default ShoppingPage;