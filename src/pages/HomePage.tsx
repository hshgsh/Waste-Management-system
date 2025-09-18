import React from 'react';
import Hero from '../components/Hero';
import WasteManagement from '../components/WasteManagement';
import EconomicImpact from '../components/EconomicImpact';
import Credits from '../components/Credits';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import EcoShop from '../components/Ecoshop';
import { User } from 'lucide-react';


const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero/>
      <WasteManagement />
      <EconomicImpact />
      <Credits />
      <Contact />
      <Footer />
      <Chatbot />
    </div>  
  );
};

export default HomePage;