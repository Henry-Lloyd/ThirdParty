import * as React from 'react';
import { Heart, Users, Target } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About ThirdParty
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Your trusted partner in connecting needs with solutions across Malawi. 
            We bridge the gap between service seekers and reliable providers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Born in Malawi</h3>
              <p className="text-blue-100 text-sm">
                Created by Malawians for Malawians, understanding local needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">500+ Providers</h3>
              <p className="text-blue-100 text-sm">
                Verified service providers across multiple categories
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trusted Platform</h3>
              <p className="text-blue-100 text-sm">
                Reliable connections for your daily service needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
