import * as React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, MessageCircle } from 'lucide-react';

export function EmergencyServices() {
  return (
    <section className="py-12 bg-red-50 border-t-4 border-red-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-red-900">Emergency Services</h2>
          </div>
          
          <p className="text-red-800 mb-6">
            For immediate emergencies (burst pipes, electrical hazards, security issues), 
            contact us directly for faster response.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="bg-red-600 hover:bg-red-700 text-white"
              size="lg"
            >
              <a href="tel:+265991451188">
                <Phone className="h-5 w-5 mr-2" />
                Call Emergency Line
              </a>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              size="lg"
            >
              <a 
                href="https://wa.me/+265991451188?text=EMERGENCY:%20I%20need%20immediate%20assistance%20with..."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Emergency
              </a>
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-red-900 mb-2">🚰 Plumbing Emergencies</h4>
              <p className="text-red-700">Burst pipes, major leaks, sewage backups</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-red-900 mb-2">⚡ Electrical Hazards</h4>
              <p className="text-red-700">Power outages, exposed wires, electrical fires</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-red-900 mb-2">🔒 Security Issues</h4>
              <p className="text-red-700">Lockouts, broken locks, security breaches</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
