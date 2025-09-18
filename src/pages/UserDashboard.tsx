import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ChevronDown, 
  LogOut, 
  Trophy, 
  Star,
  ShoppingCart,
  FileText,
  MapPin,
  Award,
  Phone,
  Mail
} from 'lucide-react';
import UserProfile from '../components/UserProfile';
import { User as UserType } from '../types.ts';

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!userData) return null;

  const leaderboardData = [
    { rank: 1, name: 'Priya Sharma', points: 2450, avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg' },
    { rank: 2, name: 'Rahul Kumar', points: 2380, avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg' },
    { rank: 3, name: 'Anita Singh', points: 2250, avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg' },
    { rank: 4, name: userData.name, points: userData.points || 1250, avatar: userData.avatar, isCurrentUser: true },
    { rank: 5, name: 'Vikram Patel', points: 1180, avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TK</span>
              </div>
              <span className="text-xl font-bold text-gray-900">thekabadiwala</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/user-dashboard/services" className="text-gray-700 hover:text-green-600 font-medium">
                Services
              </Link>
              <Link to="/user-dashboard/training" className="text-gray-700 hover:text-green-600 font-medium">
                Training
              </Link>
              <Link to="/user-dashboard/shopping" className="text-gray-700 hover:text-green-600 font-medium">
                Shopping
              </Link>
              <Link to="/user-dashboard/report-waste" className="text-gray-700 hover:text-green-600 font-medium">
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
                    <div className="flex items-center space-x-2 mt-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">{userData.points} Points</span>
                    </div>
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
                  
                  <Link
                    to="/user-dashboard/leaderboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Leaderboard
                  </Link>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <a
                      href="mailto:support@thekabadiwala.com"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Contact Us
                    </a>
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      About Us
                    </Link>
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
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}!</h1>
          <p className="text-green-100 mb-4">Continue your journey towards a sustainable future</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">{userData.points} Points</span>
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
            to="/user-dashboard/services"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Book Campaign</h3>
            <p className="text-gray-600 text-sm">Start a new waste management campaign</p>
          </Link>

          <Link
            to="/user-dashboard/shopping"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Eco Shopping</h3>
            <p className="text-gray-600 text-sm">Browse eco-friendly products</p>
          </Link>

          <Link
            to="/user-dashboard/report-waste"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Report Waste</h3>
            <p className="text-gray-600 text-sm">Report waste issues in your area</p>
          </Link>

          <Link
            to="/user-dashboard/training"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Training</h3>
            <p className="text-gray-600 text-sm">Continue your learning journey</p>
          </Link>
        </div>

        {/* Stats and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Impact</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-green-700 font-medium">Waste Reported</p>
                  <p className="text-2xl font-bold text-green-600">24</p>
                </div>
                <div className="text-green-600">
                  <FileText className="h-8 w-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-blue-700 font-medium">CO₂ Saved (kg)</p>
                  <p className="text-2xl font-bold text-blue-600">125</p>
                </div>
                <div className="text-blue-600">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-purple-700 font-medium">Vouchers Earned</p>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                </div>
                <div className="text-purple-600">
                  <Trophy className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
              <Link
                to="/user-dashboard/leaderboard"
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {leaderboardData.slice(0, 5).map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    user.isCurrentUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {user.rank}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${user.isCurrentUser ? 'text-green-900' : 'text-gray-900'}`}>
                      {user.name} {user.isCurrentUser && '(You)'}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{user.points} points</span>
                    </div>
                  </div>
                </div>
              ))}
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

export default UserDashboard;