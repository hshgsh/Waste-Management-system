import React, { useState } from 'react';
import { BookOpen, Users, Award, Play, Clock, CheckCircle, User } from 'lucide-react';
import UserEnrollment from './UserEnrollment';

const TrainingPrograms = () => {
  const [activeProgram, setActiveProgram] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const programs = [
    {
      id: 0,
      title: 'Waste Sorting Fundamentals',
      duration: '2 hours',
      modules: 6,
      description: 'Learn the basics of waste categorization and proper sorting techniques',
      topics: ['Material identification', 'Contamination prevention', 'Safety protocols', 'Equipment usage'],
      image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg'
    },
    {
      id: 1,
      title: 'Advanced Recycling Processes',
      duration: '4 hours',
      modules: 8,
      description: 'Deep dive into recycling technologies and quality control measures',
      topics: ['Processing methods', 'Quality standards', 'Technology operation', 'Maintenance protocols'],
      image: 'https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg'
    },
    {
      id: 2,
      title: 'Environmental Impact Assessment',
      duration: '3 hours',
      modules: 5,
      description: 'Understanding environmental benefits and measuring impact',
      topics: ['Carbon footprint', 'Resource conservation', 'Impact metrics', 'Reporting systems'],
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg'
    }
  ];

  const handleModuleComplete = (moduleIndex: number) => {
    if (!completedModules.includes(moduleIndex)) {
      setCompletedModules([...completedModules, moduleIndex]);
    }
  };

  const progressPercentage = (completedModules.length / programs[activeProgram].modules) * 100;

  return (
    <section id="training" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive training modules designed to build expertise in waste management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Program List */}
          <div className="space-y-4">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeProgram === index
                    ? 'bg-green-50 border-2 border-green-500 shadow-lg scale-105'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:shadow-md'
                }`}
                onClick={() => setActiveProgram(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    activeProgram === index ? 'bg-green-500' : 'bg-gray-400'
                  } transition-colors duration-300`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {program.modules} modules
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Program Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
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
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {programs[activeProgram].title}
                  </h3>
                  <p className="text-gray-600">{programs[activeProgram].description}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Course Topics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {programs[activeProgram].topics.map((topic, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                          completedModules.includes(index)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleModuleComplete(index)}
                      >
                        {completedModules.includes(index) ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                        )}
                        <span className="text-sm font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1">
                  Start Training
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default TrainingPrograms;