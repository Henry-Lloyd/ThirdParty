import * as React from 'react';
import { Shield, Handshake, Award, Zap } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'All service providers are verified and vetted for your peace of mind.',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    icon: Handshake,
    title: 'Community First',
    description: 'Supporting local talent and fostering economic growth in Malawi.',
    color: 'bg-green-50 border-green-200'
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'Committed to connecting you with the best service providers.',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    icon: Zap,
    title: 'Quick Response',
    description: 'Fast connections for urgent needs and emergency services.',
    color: 'bg-yellow-50 border-yellow-200'
  }
];

export function AboutValues() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600">
              Our core values guide everything we do, from platform development to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className={`${value.color} rounded-xl p-6 border-2 text-center hover:shadow-lg transition-shadow`}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
