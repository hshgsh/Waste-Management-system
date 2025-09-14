import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sun, LogIn, User } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import UserProfile from './UserProfile';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const handleLoginSuccess = (user: any) => {
    setUserData(user);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleSignupSuccess = (user: any) => {
    setUserData(user);
    setIsLoggedIn(true);
    setIsSignupOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setShowUserMenu(false);
  };

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMenuOpen(false);
    setShowServicesDropdown(false);
    setShowCompanyDropdown(false);
  };

  const servicesDropdownItems = [
    { title: 'For Individuals', items: ['Scrap Collection', 'Zero Waste Society', 'Vehicle Scrapping'] },
    { title: 'For Businesses', items: ['Scrap Collection', 'EPR services', 'Dismantling', 'Circular Economy', 'Zero Waste', 'Paper Shredding'] },
    { title: 'For Governments', items: ['Material Recovery Facility', 'IEC', 'Deposit Refund System (DRS)'] }
  ];

  const companyDropdownItems = ['About Us', 'Franchise', 'Contact', 'Our Journey'];

  return (
    <>
      <header className="fixed top-0 w-full bg-green-950 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigation('home')}
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-white">Eco-saviors</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <button
                  onClick={() => handleNavigation('services')}
                  className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors duration-200 font-medium"
                >
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showServicesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {servicesDropdownItems.map((category, index) => (
                        <div key={index}>
                          <h3 className="text-green-400 font-semibold mb-3 text-sm">{category.title}</h3>
                          <ul className="space-y-2">
                            {category.items.map((item, idx) => (
                              <li key={idx}>
                                <button className="text-white text-sm hover:text-green-400 transition-colors duration-200 text-left">
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowCompanyDropdown(true)}
                onMouseLeave={() => setShowCompanyDropdown(false)}
              >
                <button
                  onClick={() => handleNavigation('company')}
                  className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors duration-200 font-medium"
                >
                  <span>Company</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showCompanyDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4">
                    <ul className="space-y-2">
                      {companyDropdownItems.map((item, index) => (
                        <li key={index}>
                          <button className="text-white text-sm hover:text-green-400 transition-colors duration-200 text-left w-full">
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Training */}
              <button
                onClick={() => handleNavigation('training')}
                className="text-white hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Training
              </button>
                 {/* Shopping */}
            <button
              onClick={() => handleNavigation('shopping')}
              className="text-white hover:text-green-400 transition-colors duration-200 font-medium"
            >
              Shopping
            </button>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              
              
              {/* Login/User Section */}
              {!isLoggedIn ? (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-white font-medium">{userData.name.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 py-2 z-10">
                      <button
                        onClick={() => {
                          setIsProfileOpen(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-green-400 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

         
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm border-t border-gray-700 rounded-b-lg">
                <button
                  onClick={() => handleNavigation('services')}
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavigation('company')}
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                >
                  Company
                </button>
                <button
                  onClick={() => handleNavigation('training')}
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                >
                  Training
                </button>
                <button
                  onClick={() => handleNavigation('shopping')}
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                >
                  Shopping
                </button>
                
                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 w-full mt-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                ) : (
                  <div className="space-y-2 mt-2">
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 bg-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 w-full"
                    >
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{userData.name.split(' ')[0]}</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 w-full"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={userData}
      />
    </>
  );
};

export default Header;