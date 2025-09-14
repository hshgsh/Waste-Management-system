import React, { useState } from 'react';
import { X, User, Briefcase } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, onSwitchToSignup }) => {
  const [userType, setUserType] = useState<'user' | 'employee'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login success
    const userData = {
      name: userType === 'user' ? 'John Doe' : 'Sarah Johnson',
      email,
      userType,
      department: userType === 'employee' ? 'Operations' : undefined,
      employeeId: userType === 'employee' ? 'EMP001' : undefined,
      joinDate: '2024-01-15',
      avatar: `https://images.pexels.com/photos/${userType === 'employee' ? '3184418' : '3184465'}/pexels-photo-${userType === 'employee' ? '3184418' : '3184465'}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
    };
    
    onLoginSuccess(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

        {/* User Type Selection */}
        <div className="flex mb-6">
          <button
            onClick={() => setUserType('user')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-l-lg border transition-all duration-200 ${
              userType === 'user'
                ? 'bg-green-50 border-green-600 text-green-700'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="h-5 w-5" />
            <span>User</span>
          </button>
          <button
            onClick={() => setUserType('employee')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-r-lg border-t border-r border-b transition-all duration-200 ${
              userType === 'employee'
                ? 'bg-blue-50 border-blue-600 text-blue-700'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span>Employee</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
              userType === 'user'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Login as {userType === 'user' ? 'User' : 'Employee'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account? <span onClick={onSwitchToSignup} className="text-green-600 cursor-pointer hover:underline">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;