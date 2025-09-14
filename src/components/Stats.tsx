import React from 'react';
import { TrendingUp, Users, Recycle, Award } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Recycle className="h-8 w-8" />,
      value: "95%",
      label: "Waste Recycled",
      description: "of total waste processed",
      color: "text-emerald-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "5,000+",
      label: "People Trained",
      description: "across various programs",
      color: "text-blue-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "50%",
      label: "Waste Reduction",
      description: "in partner communities",
      color: "text-purple-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "100+",
      label: "Certifications",
      description: "awarded this year",
      color: "text-orange-600"
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Impact
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Measurable results that demonstrate our commitment to sustainable waste management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className={`inline-flex p-4 rounded-full bg-white/20 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-xl font-semibold mb-1">{stat.label}</p>
              <p className="text-sm opacity-75">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-lg opacity-90 mb-6">
              Join our community of sustainability champions and help create a cleaner future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                Start Training
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-900 transition-all duration-200">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;