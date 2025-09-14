import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/1200x/55/64/d9/5564d9d1318308804fea747064f2bd39.jpg"
          alt="Waste Management Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your trash {' '}
              <span className="relative inline-block">
                <span className="bg-green-500 px-4 py-0.2 rounded-lg">called-time </span>
              </span>
            </h1>
            <h2 className="text-3xl md:text-7xl lg:text-7xl font-bold text-white mt-4">
              for a makeover!
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Sell us your recyclable wastes and help contribute to the circular economy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 min-w-[200px]">
              Download the app
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 min-w-[200px]">
              For Business
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;