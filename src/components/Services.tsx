import React from 'react';
import { Truck, Package, Recycle, Leaf, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: 'Doorstep Collection',
      description: 'We collect your recyclable waste directly from your doorstep at scheduled times.',
      features: ['Free pickup service', 'Flexible scheduling', 'Real-time tracking']
    },
    {
      icon: Package,
      title: 'Waste Sorting',
      description: 'Professional sorting and categorization of different types of recyclable materials.',
      features: ['Expert sorting', 'Quality assessment', 'Material grading']
    },
    {
      icon: Recycle,
      title: 'Recycling Process',
      description: 'Advanced recycling processes to convert waste into valuable raw materials.',
      features: ['Eco-friendly methods', 'High recovery rates', 'Quality output']
    },
    {
      icon: Leaf,
      title: 'Environmental Impact',
      description: 'Contributing to a cleaner environment and sustainable circular economy.',
      features: ['Carbon footprint reduction', 'Resource conservation', 'Green initiatives']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive waste management solutions for individuals and businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-300">
                <service.icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="flex items-center text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
                Learn more
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;