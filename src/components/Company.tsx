import React from 'react';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';

const Company = () => {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Customers' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Globe, value: '25+', label: 'Cities Covered' },
    { icon: TrendingUp, value: '2M+', label: 'Tons Recycled' }
  ];

  return (
    <section id="company" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Our Company</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the way in sustainable waste management and circular economy solutions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are committed to creating a sustainable future by transforming waste into valuable resources. 
              Our innovative approach to waste management helps businesses and individuals contribute to the 
              circular economy while earning from their recyclable materials.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Through technology-driven solutions and community partnerships, we're building a cleaner, 
              greener world for future generations.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
              Learn More About Us
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
              alt="Company Mission"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;