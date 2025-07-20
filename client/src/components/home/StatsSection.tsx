import * as React from 'react';
import { Users, CheckCircle, Clock, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: '500+',
    label: 'Trusted Service Providers',
    description: 'Verified professionals ready to help'
  },
  {
    icon: CheckCircle,
    number: '2,500+',
    label: 'Services Completed',
    description: 'Successful connections made'
  },
  {
    icon: Clock,
    number: '24/7',
    label: 'Support Available',
    description: 'Round-the-clock assistance'
  },
  {
    icon: MapPin,
    number: '10+',
    label: 'Cities Covered',
    description: 'Across Malawi from Nsanje to Chitipa'
  }
];

export function StatsSection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Every number represents real connections, solved problems, and empowered communities 
            across the beautiful nation of Malawi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-blue-100 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Additional Context */}
        <div className="mt-16 text-center">
          <div className="bg-white bg-opacity-10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Growing Stronger Every Day
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              From the bustling markets of Blantyre to the agricultural heartlands of Lilongwe, 
              and extending north to Mzuzu, ThirdParty is strengthening communities through trusted connections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-semibold text-yellow-400">🌅 Southern Region</div>
                <div className="text-blue-100">Blantyre • Zomba • Nsanje • Chiradzulu</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-400">🏛️ Central Region</div>
                <div className="text-blue-100">Lilongwe • Dedza • Salima • Ntchisi</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-400">🏔️ Northern Region</div>
                <div className="text-blue-100">Mzuzu • Karonga • Chitipa • Rumphi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
