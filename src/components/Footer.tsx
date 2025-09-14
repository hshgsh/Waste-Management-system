import React from 'react';
import { Recycle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">EcoWaste</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Leading the future of sustainable waste management through innovation, technology, and comprehensive training.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Waste Collection</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Sorting & Processing</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Recycling Solutions</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Training Programs</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Consulting</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Documentation</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Best Practices</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Case Studies</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Environmental Reports</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Support Center</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors duration-200">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">News & Press</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 EcoWaste Management Systems. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Building a sustainable future, one waste stream at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;