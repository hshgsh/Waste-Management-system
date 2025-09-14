import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const Careers = () => {
  const jobs = [
    {
      title: 'Waste Collection Specialist',
      location: 'Mumbai, India',
      type: 'Full-time',
      department: 'Operations',
      description: 'Join our field team to manage waste collection routes and customer relationships.'
    },
    {
      title: 'Sustainability Analyst',
      location: 'Delhi, India',
      type: 'Full-time',
      department: 'Environmental',
      description: 'Analyze environmental impact and develop sustainability strategies.'
    },
    {
      title: 'Mobile App Developer',
      location: 'Bangalore, India',
      type: 'Full-time',
      department: 'Technology',
      description: 'Build and maintain our mobile applications for waste management.'
    },
    {
      title: 'Customer Success Manager',
      location: 'Pune, India',
      type: 'Full-time',
      department: 'Customer Service',
      description: 'Ensure customer satisfaction and manage client relationships.'
    }
  ];

  return (
    <section id="careers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of the solution. Help us build a sustainable future while growing your career.
          </p>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-green-600 font-medium">{job.department}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.type}
                  </span>
                </div>
                <button className="flex items-center text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
                  Apply Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-green-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Don't see the right role?</h3>
          <p className="text-xl mb-6 text-green-100">
            We're always looking for talented individuals to join our mission.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Send Us Your Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Careers;