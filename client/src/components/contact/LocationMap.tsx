import * as React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LocationMap() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-xl text-gray-600">
            Visit our office in Blantyre or connect with us digitally from anywhere in Malawi.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Map Placeholder */}
            <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">ThirdParty Office</h3>
                <p className="text-gray-600 mb-4">
                  Blantyre Synod, Off Phoenix Road<br />
                  Opposite Multipurpose Hall<br />
                  Blantyre, Malawi
                </p>
                <Button asChild>
                  <a 
                    href="https://maps.app.goo.gl/1RUAbw9w6S25sWCfA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
              </div>
              
              {/* Location pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full absolute top-1 left-1"></div>
              </div>
            </div>

            {/* Location Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Easy Access</h4>
                  <p className="text-gray-600 text-sm">
                    Located in central Blantyre with convenient public transport access
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Parking Available</h4>
                  <p className="text-gray-600 text-sm">
                    Free parking space available for visitors and meeting attendees
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Meeting Rooms</h4>
                  <p className="text-gray-600 text-sm">
                    Private spaces available for provider consultations and partnerships
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Service Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">Southern Region</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Blantyre (Headquarters)</li>
                  <li>• Zomba</li>
                  <li>• Nsanje</li>
                  <li>• Chiradzulu</li>
                  <li>• Thyolo</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-3">Central Region</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Lilongwe</li>
                  <li>• Dedza</li>
                  <li>• Salima</li>
                  <li>• Ntchisi</li>
                  <li>• Kasungu</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-3">Northern Region</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Mzuzu</li>
                  <li>• Karonga</li>
                  <li>• Chitipa</li>
                  <li>• Rumphi</li>
                  <li>• Nkhata Bay</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
