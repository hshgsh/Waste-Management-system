import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ChevronDown, 
  LogOut, 
  Award,
  ShoppingCart,
  FileText,
  MapPin,
  AlertTriangle,
  Phone,
  Mail,
  Shield
} from 'lucide-react';
import UserProfile from '../components/UserProfile';
import { User as UserType } from '../types.ts';

const EmployeeDashboard = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.userType === 'employee') {
        setUserData(parsedUser);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TK</span>
              </div>
              <span className="text-xl font-bold text-gray-900">thekabadiwala</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Employee</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/employee-dashboard/services" className="text-gray-700 hover:text-blue-600 font-medium">
                Services
              </Link>
              <Link to="/employee-dashboard/training" className="text-gray-700 hover:text-blue-600 font-medium">
                Training
              </Link>
              <Link to="/employee-dashboard/shopping" className="text-gray-700 hover:text-blue-600 font-medium">
                Shopping
              </Link>
              <Link to="/employee-dashboard/exploitation" className="text-gray-700 hover:text-red-600 font-medium">
                Report Issue
              </Link>
              <Link to="/employee-dashboard/report-waste" className="text-gray-700 hover:text-blue-600 font-medium">
                Report Waste
              </Link>
            </nav>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900">{userData.name.split(' ')[0]}</span>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                    <p className="text-sm text-blue-600 font-medium">ID: {userData.employeeId}</p>
                    <p className="text-sm text-gray-500">{userData.department} Department</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowProfile(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <a
                      href="mailto:support@thekabadiwala.com"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Contact Support
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name.split(' ')[0]}!</h1>
          <p className="text-blue-100 mb-4">Employee Dashboard - {userData.department} Department</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">ID: {userData.employeeId}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span className="font-medium">{userData.trainingProgress}% Training Complete</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/employee-dashboard/services"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
            <p className="text-gray-600 text-sm">Access eco-shops and campaigns</p>
          </Link>

          <Link
            to="/employee-dashboard/shopping"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Safety Gear</h3>
            <p className="text-gray-600 text-sm">Order safety equipment and uniforms</p>
          </Link>

          <Link
            to="/employee-dashboard/exploitation"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Report Issue</h3>
            <p className="text-gray-600 text-sm">File workplace complaints</p>
          </Link>

          <Link
            to="/employee-dashboard/training"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Training</h3>
            <p className="text-gray-600 text-sm">Worker training modules</p>
          </Link>
        </div>

        {/* Stats and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Work Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-blue-700 font-medium">Waste Processed</p>
                  <p className="text-2xl font-bold text-blue-600">2,400 kg</p>
                </div>
                <div className="text-blue-600">
                  <FileText className="h-8 w-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-green-700 font-medium">Efficiency Rate</p>
                  <p className="text-2xl font-bold text-green-600">94%</p>
                </div>
                <div className="text-green-600">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-purple-700 font-medium">Training Modules</p>
                  <p className="text-2xl font-bold text-purple-600">8/10</p>
                </div>
                <div className="text-purple-600">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Important Information</h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Safety Reminder</h3>
                <p className="text-yellow-700 text-sm">Always wear protective gear when handling waste materials.</p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Training Update</h3>
                <p className="text-blue-700 text-sm">New safety protocols training available. Complete by end of month.</p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Performance Bonus</h3>
                <p className="text-green-700 text-sm">Great work! You're eligible for this month's efficiency bonus.</p>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Emergency: +91-9876543210</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">HR: hr@thekabadiwala.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* User Profile Modal */}
      <UserProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        userData={userData}
      />
    </div>
  );
};

export default EmployeeDashboard;