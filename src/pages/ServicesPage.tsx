import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Recycle, Leaf, ArrowRight, Users, Building, Globe } from 'lucide-react';
import Chatbot from '../components/Chatbot';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const serviceCategories = [
    {
      title: 'For Individuals',
      icon: Users,
      color: 'bg-green-500',
      services: [
        {
          name: 'Scrap Collection',
          description: 'Digitised solution for the door-to-door free pickup of 40+ recyclables',
          icon: Truck
        },
        {
          name: 'Zero Waste Society',
          description: 'Serving the Residential Societies in achieving their zero waste goals.',
          icon: Recycle
        },
        {
          name: 'Vehicle Scrapping',
          description: 'Assisting people in getting rid of their old vehicles sustainably',
          icon: Package
        }
      ]
    },
    {
      title: 'For Businesses',
      icon: Building,
      color: 'bg-blue-500',
      services: [
        {
          name: 'Scrap Collection',
          description: 'Professional waste collection services for businesses',
          icon: Truck
        },
        {
          name: 'EPR Services',
          description: 'The Kabadiwala as a registered PRO, official collection & recycling partner helps in the compliance process of EPR.',
          icon: Leaf
        },
        {
          name: 'Dismantling',
          description: 'Providing holistic approach to implement circular solutions to the scrap disposal.',
          icon: Package
        },
        {
          name: 'Circular Economy',
          description: 'Planning, designing, and successfully executing brand\'s CSR campaigns as per their objectives.',
          icon: Recycle
        },
        {
          name: 'Zero Waste',
          description: 'Serving the Institutes/Offices/Events in achieving their zero waste goals.',
          icon: Leaf
        },
        {
          name: 'Paper Shredding',
          description: 'Aiding Businesses in the safe & secure disposal of their confidential documents.',
          icon: Package
        }
      ]
    },
    {
      title: 'For Governments',
      icon: Globe,
      color: 'bg-purple-500',
      services: [
        {
          name: 'Material Recovery Facility',
          description: 'Complete waste processing and material recovery solutions',
          icon: Recycle
        },
        {
          name: 'IEC',
          description: 'Information, Education and Communication programs for waste management',
          icon: Leaf
        },
        {
          name: 'Deposit Refund System (DRS)',
          description: 'Implementing deposit refund systems for better waste collection',
          icon: Package
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Attaining sustainable solutions with ease.
          </p>
          
          {/* Service Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeCategory === 'all' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              All services
            </button>
            <button 
              onClick={() => setActiveCategory('individuals')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeCategory === 'individuals' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              For Individuals
            </button>
            <button 
              onClick={() => setActiveCategory('organizations')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeCategory === 'organizations' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              For Organisations
            </button>
            <Link
              to="/waste-reporting"
              className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-orange-600 text-white hover:bg-orange-700"
            >
              Report Waste
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories
            .filter(category => 
              activeCategory === 'all' || 
              (activeCategory === 'individuals' && category.title === 'For Individuals') ||
              (activeCategory === 'organizations' && (category.title === 'For Businesses' || category.title === 'For Governments'))
            )
            .map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 group border border-gray-800"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-300">
                      <service.icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    
                    <button className="flex items-center text-green-400 font-medium hover:text-green-300 transition-colors duration-200">
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8">
            Contact us today to learn more about our services and how we can help you achieve your sustainability goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                window.open('mailto:contact@ecowaste.com', '_blank');
                window.open('tel:+919876543210', '_blank');
              }}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg"
            >
              Contact Us
            </button>
            <button 
              onClick={() => window.open('tel:+919876543210', '_blank')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200 text-lg"
            >
              Call Us
            </button>
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
};

export default ServicesPage;