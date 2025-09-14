import React from 'react';
import { Users, Award, Globe, TrendingUp, Target, Heart, Lightbulb, Shield } from 'lucide-react';
import Chatbot from '../components/Chatbot';

const CompanyPage = () => {
  const stats = [
    { icon: Users, value: '0', label: 'Happy Customers' },
    { icon: Award, value: '0', label: 'Years Experience' },
    { icon: Globe, value: '0', label: 'Cities Covered' },
    { icon: TrendingUp, value: '0M', label: 'Tons Recycled' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission Driven',
      description: 'We are committed to creating a sustainable future by transforming waste into valuable resources.'
    },
    {
      icon: Heart,
      title: 'Community Focused',
      description: 'Building strong relationships with communities to create lasting environmental impact.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Leveraging cutting-edge technology to revolutionize waste management practices.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Operating with complete transparency and building trust through reliable service delivery.'
    }
  ];

  const companyOptions = [
    {
      title: 'About Us',
      description: 'Learn about our journey, mission, and the team behind thekabadiwala',
      image: 'https://c8.alamy.com/comp/KYT19A/a-sign-encouraging-care-of-the-environment-northern-india-KYT19A.jpg'
    },
    {
      title: 'Franchise',
      description: 'Join our network and become a franchise partner in the waste management revolution',
      image: 'https://prod.cdn.business.wfu.edu/uploads/2020/09/Image-Pulls-For-Web-Launch_Masters-in-Accounting-Versus-an-MBA-in-Finance.webp'
    },
    {
      title: 'Contact',
      description: 'Get in touch with us for any queries, partnerships, or support',
      image: 'https://knowmax-ai-website.s3.amazonaws.com/wp-content/uploads/2023/12/26004145/Customer-Service-Call-Center.webp'
    },
    {
      title: 'Our Mission',
      description: 'Discover our milestones, achievements, and the path that led us here',
      image: 'https://images.firstpost.com/wp-content/uploads/2014/12/Modi-Swachh-Bharat-PIB.jpg?im=FitAndFill=(596,336)'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Company</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading the way in sustainable waste management and circular economy solutions
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Options Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer border border-gray-800"
              >
                <div className="relative h-48">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                  <p className="text-gray-400">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 text-center hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                We are committed to creating a sustainable future by transforming waste into valuable resources. 
                Our innovative approach to waste management helps businesses and individuals contribute to the 
                circular economy while earning from their recyclable materials.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Through technology-driven solutions and community partnerships, we're building a cleaner, 
                greener world for future generations.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <img
                src="https://ddindia.co.in/wp-content/uploads/2023/08/s2014100257537-e1412236990689-1.jpg"
                alt="Company Mission"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-green-100 mb-8">
            Be part of the solution. Help us build a sustainable future while growing your impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
};

export default CompanyPage;