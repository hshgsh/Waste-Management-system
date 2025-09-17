import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, LogIn, User } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import UserProfile from './UserProfile';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // Modal handled by router
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



  const servicesDropdownItems = [
    { title: 'For Individuals', items: ['Scrap Collection', 'Zero Waste Society', 'Vehicle Scrapping'] },
    { title: 'For Businesses', items: ['Scrap Collection', 'EPR services', 'Dismantling', 'Circular Economy', 'Zero Waste', 'Paper Shredding'] },
    { title: 'For Governments', items: ['Material Recovery Facility', 'IEC', 'Deposit Refund System (DRS)'] }
  ];

  const companyDropdownItems = ['About Us', 'Franchise', 'Contact', 'Our Journey'];

  return (
    <>
  <header className={`fixed top-0 w-full z-50 transition-colors duration-700 backdrop-blur-sm opacity-85 ${scrolled ? 'bg-green-500 shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl"></span>
              </div>
              <span className="text-2xl font-bold text-emerald-950">Eco-saviors</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <Link
                  to="/services"
                  className="flex items-center space-x-1 text-emerald-950 hover:text-green-400 transition-colors duration-200 font-medium"
                  onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                >
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>
                
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
                <Link
                  to="/company"
                  className="flex items-center space-x-1  text-emerald-950 hover:text-green-400 transition-colors duration-200 font-medium"
                  onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                >
                  <span>Company</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>
                
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
              <Link
                to="/training"
                className=" text-emerald-950 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Training
              </Link>
                 {/* Shopping */}
            <Link
              to="/shopping"
              className=" text-emerald-950 hover:text-green-400 transition-colors duration-200 font-medium"
            >
              Shopping
            </Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              
              
              {/* Login/User Section */}
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center space-x-2 bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                </>
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
                <Link
                  to="/services"
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/company"
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Company
                </Link>
                <Link
                  to="/training"
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Training
                </Link>
                <Link
                  to="/shopping"
                  className="block px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shopping
                </Link>
                
                {!isLoggedIn ? null : (
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
      {/* LoginModal handled by router at /login */}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
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