import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <video 
          src="src/assets/3192259-uhd_3840_2160_25fps (1).mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="bg-yellow-50 opacity-60 rounded-2xl text-5xl md:text-5xl lg:text-6xl font-bold text-green-800  leading-tight font-sans">
              Your trash{''}
              <span className="relative inline-block font-sans">
                <span className="px-4 py-0.2 rounded-lg">CALLED,TIME </span>
              </span>
            </h1>
            <h2 className="text-3xl md:text-7xl lg:text-7xl font-bold text-green-800 mt-4 font-sans">
              <span className="bg-yellow-50 opacity-60 md:text-5xl lg:text-6xl rounded-md">for a makeover!</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Sell us your recyclable wastes and help contribute to the circular economy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 min-w-[200px]">
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