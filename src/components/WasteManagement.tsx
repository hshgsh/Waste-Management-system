import React, { useState, useEffect } from 'react';
import { Truck, Package, Recycle, Leaf } from 'lucide-react';

const WasteManagement = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: 'Collection',
      description: 'Smart collection vehicles with GPS tracking and route optimization',
      icon: Truck,
      color: 'bg-green-500',
      details: ['Scheduled pickups', 'Real-time tracking', 'Efficient routing']
    },
    {
      id: 1,
      title: 'Sorting',
      description: 'Multi-level segregation at households, community centers, and recycling facilities for maximum recovery.',
      icon: Package,
      color: 'bg-blue-500',
      details: ['Maunally sorting', 'Material identification', 'Quality control']
    },
    {
      id: 2,
      title: 'Processing',
      description: 'State-of-the-art recycling and waste-to-energy conversion',
      icon: Recycle,
      color: 'bg-purple-500',
      details: ['Material recovery', 'Energy generation', 'Byproduct creation']
    },
    {
      id: 3,
      title: 'Impact',
      description: 'Environmental benefits and sustainable outcomes',
      icon: Leaf,
      color: 'bg-green-600',
      details: ['Carbon reduction', 'Resource conservation', 'Clean energy']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Waste Management Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From collection to impact, our comprehensive system ensures efficient and sustainable waste management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Process Animation */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-8 overflow-hidden">
              <div className="relative h-96">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      activeStep === index
                        ? 'translate-x-0 opacity-100 scale-100'
                        : index < activeStep
                        ? '-translate-x-full opacity-0 scale-95'
                        : 'translate-x-full opacity-0 scale-95'
                    }`}
                  >
                    <div className="text-center space-y-6">
                      <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg animate-[pulse_2s_infinite]`}>
                        <step.icon className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-lg">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="text-gray-500 flex items-center justify-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-white/60 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center transition-transform duration-300 ${
                  activeStep === index ? 'scale-110' : ''
                }`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeStep === index ? 'bg-green-500 scale-110' : 'bg-gray-300'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteManagement;