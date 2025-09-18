import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { BookOpen, Users, Award, Play, Clock, CheckCircle, Star, Download, Calendar } from 'lucide-react';

const TrainingPage = () => {
  const [activeProgram, setActiveProgram] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const programs = [
    {
      id: 0,
      title: 'Waste Sorting Fundamentals',
      duration: '2 hours',
      modules: 6,
      level: 'Beginner',
      rating: 4.8,
      students: 1250,
      description: 'Learn the basics of waste categorization and proper sorting techniques',
      topics: ['Material identification', 'Contamination prevention', 'Safety protocols', 'Equipment usage'],
      image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg'
    },
    {
      id: 1,
      title: 'Advanced Recycling Processes',
      duration: '4 hours',
      modules: 8,
      level: 'Advanced',
      rating: 4.9,
      students: 850,
      description: 'Deep dive into recycling technologies and quality control measures',
      topics: ['Processing methods', 'Quality standards', 'Technology operation', 'Maintenance protocols'],
      image: 'https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg'
    },
    {
      id: 2,
      title: 'Environmental Impact Assessment',
      duration: '3 hours',
      modules: 5,
      level: 'Intermediate',
      rating: 4.7,
      students: 950,
      description: 'Understanding environmental benefits and measuring impact',
      topics: ['Carbon footprint', 'Resource conservation', 'Impact metrics', 'Reporting systems'],
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg'
    },
    {
      id: 3,
      title: 'Community Engagement Strategies',
      duration: '3.5 hours',
      modules: 7,
      level: 'Intermediate',
      rating: 4.6,
      students: 720,
      description: 'Learn how to engage communities in waste management initiatives',
      topics: ['Community outreach', 'Behavior change', 'Program design', 'Success measurement'],
      image: 'https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg'
    }
  ];

  const handleModuleComplete = (moduleIndex: number) => {
    if (!completedModules.includes(moduleIndex)) {
      setCompletedModules([...completedModules, moduleIndex]);
    }
  };

  const progressPercentage = (completedModules.length / programs[activeProgram].modules) * 100;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Training Programs</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Comprehensive training modules designed to build expertise in waste management and sustainability
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Users className="h-5 w-5 text-green-400" />
              <span>3,000+ Students</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Award className="h-5 w-5 text-yellow-400" />
              <span>Certified Programs</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <span>Expert Instructors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Program List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Available Programs</h2>
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                    activeProgram === index
                      ? 'bg-green-900/30 border-green-500 shadow-lg scale-105'
                      : 'bg-gray-900 border-gray-800 hover:bg-gray-800 hover:shadow-md'
                  }`}
                  onClick={() => setActiveProgram(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      activeProgram === index ? 'bg-green-500' : 'bg-gray-700'
                    } transition-colors duration-300`}>
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{program.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                          {program.level}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {program.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {program.modules} modules
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {program.rating}
                        </span>
                        <span>{program.students} students</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Program Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-800">
                <div className="relative">
                  <img
                    src={programs[activeProgram].image}
                    alt={programs[activeProgram].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 transition-all duration-200 hover:scale-110">
                    <Play className="h-8 w-8 text-green-600 ml-1" />
                  </button>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(programs[activeProgram].level)}`}>
                      {programs[activeProgram].level}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2">
                      {programs[activeProgram].title}
                    </h3>
                    <p className="text-gray-400 mb-4">{programs[activeProgram].description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {programs[activeProgram].duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {programs[activeProgram].students} students
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {programs[activeProgram].rating} rating
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-400">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Course Topics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {programs[activeProgram].topics.map((topic, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                            completedModules.includes(index)
                              ? 'bg-green-900/30 text-green-300 border border-green-500'
                              : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                          }`}
                          onClick={() => handleModuleComplete(index)}
                        >
                          {completedModules.includes(index) ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
                          )}
                          <span className="text-sm font-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1">
                      Start Training
                    </button>
                    <button className="flex items-center justify-center bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200">
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Training?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive, practical, and industry-recognized training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Certified Programs',
                description: 'Industry-recognized certifications upon completion'
              },
              {
                icon: Users,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of experience'
              },
              {
                icon: Calendar,
                title: 'Flexible Schedule',
                description: 'Self-paced learning that fits your schedule'
              },
              {
                icon: BookOpen,
                title: 'Practical Learning',
                description: 'Hands-on exercises and real-world case studies'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 text-center hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of professionals who have enhanced their skills with our training programs.
          </p>
          <Link
            to="/enrollment"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            Enroll Now
          </Link>
        </div>
      </section>
      <Chatbot />
    </div>
  );
};

export default TrainingPage;