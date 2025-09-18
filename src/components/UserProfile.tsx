import React from 'react';
import { User, Mail, Calendar, Award, TrendingUp, X, Trophy, Star } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'user' | 'employee';
  department?: string;
  employeeId?: string;
  joinDate: string;
  avatar: string;
  points?: number;
  trainingProgress?: number;
}

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  const userStats = {
    user: {
      totalPoints: userData.points || 1250,
      tasksCompleted: 24,
      vouchersRedeemed: 5,
      carbonSaved: 125,
      rank: 15
    },
    employee: {
      wasteProcessed: 2400,
      efficiency: 94,
      trainingCompleted: 8,
      teamRating: 4.8
    }
  };

  const stats = userStats[userData.userType];

  // Type guards for stats
  const isUserStats = (s: typeof stats): s is typeof userStats.user => userData.userType === 'user';
  const isEmployeeStats = (s: typeof stats): s is typeof userStats.employee => userData.userType === 'employee';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative animate-[fadeIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${
              userData.userType === 'user' ? 'bg-green-500' : 'bg-blue-500'
            } rounded-full flex items-center justify-center border-2 border-white`}>
              {userData.userType === 'user' ? (
                <User className="h-4 w-4 text-white" />
              ) : (
                <Award className="h-4 w-4 text-white" />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">{userData.name}</h2>
          <p className="text-gray-600 capitalize">{userData.userType}</p>
          {userData.department && (
            <p className="text-gray-500 text-sm">{userData.department} Department</p>
          )}
          {isUserStats(stats) && (
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Rank #{stats.rank}</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">{userData.joinDate}</p>
              </div>
            </div>
            {userData.employeeId && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Award className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium text-gray-900">{userData.employeeId}</p>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {isUserStats(stats) ? (
              <>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">Total Points</span>
                    <span className="text-2xl font-bold text-green-600">{stats.totalPoints}</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">Tasks Completed</span>
                    <span className="text-2xl font-bold text-blue-600">{stats.tasksCompleted}</span>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700 font-medium">CO₂ Saved (kg)</span>
                    <span className="text-2xl font-bold text-purple-600">{stats.carbonSaved}</span>
                  </div>
                </div>
              </>
            ) : isEmployeeStats(stats) ? (
              <>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">Waste Processed</span>
                    <span className="text-2xl font-bold text-green-600">{stats.wasteProcessed}kg</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">Efficiency</span>
                    <span className="text-2xl font-bold text-blue-600">{stats.efficiency}%</span>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-700 font-medium">Team Rating</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-orange-600">{stats.teamRating}</span>
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Training Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Training Progress</span>
            <span className="text-sm text-gray-500">{userData.trainingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                userData.userType === 'user' ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${userData.trainingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
            Edit Profile
          </button>
          <button className={`flex-1 py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200 ${
            userData.userType === 'user' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}>
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;