import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Zap, Leaf } from 'lucide-react';

const EconomicImpact = () => {
  const [animatedValues, setAnimatedValues] = useState({
    revenue: 0,
    savings: 0,
    energy: 0,
    carbon: 0
  });

  const targetValues = {
    revenue: 0.0,
    savings: 0.0,
    energy: 0.0,
    carbon: 0.0,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        revenue: targetValues.revenue * easeOutQuart,
        savings: targetValues.savings * easeOutQuart,
        energy: targetValues.energy * easeOutQuart,
        carbon: targetValues.carbon * easeOutQuart
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: DollarSign,
      title: 'Revenue Generated',
      value: animatedValues.revenue.toFixed(1),
      unit: 'M USD',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Annual revenue from recycled materials'
    },
    {
      icon: TrendingUp,
      title: 'Cost Savings',
      value: animatedValues.savings.toFixed(1),
      unit: 'M USD',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Operational cost reduction'
    },
    {
      icon: Zap,
      title: 'Energy Generated',
      value: Math.round(animatedValues.energy).toLocaleString(),
      unit: 'MWh',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Clean energy from waste-to-energy'
    },
    {
      icon: Leaf,
      title: 'CO₂ Reduced',
      value: Math.round(animatedValues.carbon).toLocaleString(),
      unit: 'Tons',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      description: 'Carbon emissions prevented'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Economic Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measuring the financial and environmental benefits of our waste management solutions
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.title}</h3>
              <div className="flex items-baseline space-x-1 mb-2">
                <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                <span className="text-gray-500 text-sm">{metric.unit}</span>
              </div>
              <p className="text-gray-600 text-sm">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EconomicImpact;