import React, { useState } from 'react';
import { User, CreditCard, Phone, Mail, Eye, EyeOff, CheckCircle, AlertCircle, Camera, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { Trainee } from '../types.ts/index';

const UserEnrollment = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'employee'>('user');
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    phone: '',
    email: '',
    photo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrolledTrainees, setEnrolledTrainees] = useState<Trainee[]>([]);
  const [currentTrainee, setCurrentTrainee] = useState<Trainee | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Aadhaar validation
    if (!formData.aadhar) {
      newErrors.aadhar = 'Aadhaar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhaar must be exactly 12 digits';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Photo validation
    if (!formData.photo) {
      newErrors.photo = 'Profile photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'aadhar' || name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (name === 'aadhar' && numericValue.length <= 12) {
        setFormData({ ...formData, [name]: numericValue });
      } else if (name === 'phone' && numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData({ ...formData, photo: result });
        if (errors.photo) {
          setErrors({ ...errors, photo: '' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendOTP = () => {
    if (formData.phone && /^\d{10}$/.test(formData.phone)) {
      setShowOTP(true);
      alert(`OTP sent to ${formData.phone}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate enrollment process
      setTimeout(() => {
        const newTrainee: Trainee = {
          id: Date.now(),
          name: formData.name,
          aadhar: formData.aadhar,
          mobile: formData.phone,
          email: formData.email,
          photo: formData.photo,
          role: activeTab === 'user' ? 'User' : 'Employee',
          completed: false,
          enrollmentDate: new Date()
        };

        const updatedTrainees = [...enrolledTrainees, newTrainee];
        setEnrolledTrainees(updatedTrainees);
        setCurrentTrainee(newTrainee);
        localStorage.setItem('enrolledTrainees', JSON.stringify(updatedTrainees));
        
        setIsSubmitting(false);
        alert('Enrollment successful! Training will begin shortly.');
        
        // Reset form
        setFormData({ name: '', aadhar: '', phone: '', email: '', photo: '' });
        setShowOTP(false);
        setOTP('');
      }, 2000);
    }
  };

  const simulateTrainingCompletion = () => {
    if (currentTrainee) {
      const updatedTrainee = {
        ...currentTrainee,
        completed: true,
        completionDate: new Date()
      };
      
      const updatedTrainees = enrolledTrainees.map(t => 
        t.id === currentTrainee.id ? updatedTrainee : t
      );
      
      setEnrolledTrainees(updatedTrainees);
      setCurrentTrainee(updatedTrainee);
      localStorage.setItem('enrolledTrainees', JSON.stringify(updatedTrainees));
      
      alert('Training completed successfully! You can now download your certificate.');
    }
  };

  const generateCertificate = () => {
    if (!currentTrainee || !currentTrainee.completed) return;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Certificate background
    pdf.setFillColor(240, 248, 255);
    pdf.rect(0, 0, 297, 210, 'F');

    // Border
    pdf.setDrawColor(0, 100, 0);
    pdf.setLineWidth(3);
    pdf.rect(10, 10, 277, 190);

    // Inner border
    pdf.setLineWidth(1);
    pdf.rect(15, 15, 267, 180);

    // Title
    pdf.setFontSize(28);
    pdf.setTextColor(0, 100, 0);
    pdf.text('CERTIFICATE OF COMPLETION', 148.5, 40, { align: 'center' });

    // Subtitle
    pdf.setFontSize(16);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Waste Management Training Program', 148.5, 55, { align: 'center' });

    // Main text
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('This is to certify that', 148.5, 80, { align: 'center' });

    // Name
    pdf.setFontSize(24);
    pdf.setTextColor(0, 100, 0);
    pdf.text(currentTrainee.name.toUpperCase(), 148.5, 100, { align: 'center' });

    // Role and completion text
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`has successfully completed the ${currentTrainee.role} Training Program`, 148.5, 120, { align: 'center' });
    pdf.text('in Waste Management and Environmental Sustainability', 148.5, 135, { align: 'center' });

    // Date
    pdf.setFontSize(12);
    pdf.text(`Completion Date: ${currentTrainee.completionDate?.toLocaleDateString()}`, 148.5, 155, { align: 'center' });

    // Signature line
    pdf.setDrawColor(0, 0, 0);
    pdf.line(200, 175, 270, 175);
    pdf.text('Authorized Signature', 235, 185, { align: 'center' });

    // Logo placeholder
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('EcoWaste Management', 30, 180);
    pdf.text('Training Institute', 30, 190);

    // Save the PDF
    pdf.save(`${currentTrainee.name}_Training_Certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Training Enrollment</h1>
          <p className="text-xl text-gray-600">Join our comprehensive waste management training program</p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('user')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'user'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              User Training
            </button>
            <button
              onClick={() => setActiveTab('employee')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'employee'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Employee Training
            </button>
          </div>
        </div>

        {/* Training Status */}
        {currentTrainee && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Status</h2>
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={currentTrainee.photo}
                alt={currentTrainee.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{currentTrainee.name}</h3>
                <p className="text-gray-600">{currentTrainee.role} Training</p>
                <p className="text-sm text-gray-500">
                  Enrolled: {currentTrainee.enrollmentDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              {!currentTrainee.completed ? (
                <button
                  onClick={simulateTrainingCompletion}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Complete Training (Demo)
                </button>
              ) : (
                <button
                  onClick={generateCertificate}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Certificate</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Enrollment Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeTab === 'user' ? 'User' : 'Employee'} Training Enrollment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo *
              </label>
              <div className="flex items-center space-x-4">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
              {errors.photo && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.photo}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Aadhaar Number */}
            <div>
              <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.aadhar ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.aadhar && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.aadhar}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={!formData.phone || formData.phone.length !== 10}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Send OTP
                </button>
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* OTP Verification */}
            {showOTP && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-center text-lg font-mono"
                />
                <p className="mt-1 text-sm text-gray-500">OTP sent to {formData.phone}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 ${
                activeTab === 'user'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Enrolling...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Enroll for {activeTab === 'user' ? 'User' : 'Employee'} Training</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already enrolled?{' '}
              <button className="text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
                Check your training status
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEnrollment;