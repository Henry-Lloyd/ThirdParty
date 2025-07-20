import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Mail, MapPin, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutTeam() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate individuals working to connect and empower communities across Malawi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">HL</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Henry Lloyd</h3>
                <p className="text-blue-600 font-medium">Founder & CEO</p>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Blantyre, Malawi</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">
                  Passionate about connecting communities and empowering local talent through technology.
                </p>
                <div className="flex justify-center space-x-3">
                  <a 
                    href="mailto:henry@thirdparty.mw"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a 
                    href="tel:+265991451188"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Team</h3>
                <p className="text-purple-600 font-medium">Growing Every Day</p>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Across Malawi</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">
                  We're building a team of dedicated professionals who share our vision of empowering communities.
                </p>
                <div className="flex justify-center">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Join Our Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Have questions about our platform or want to learn more about how we can help you? 
              We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="h-5 w-5 mr-2" />
                info@thirdparty.mw
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="h-5 w-5 mr-2" />
                +265 991 451 188
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
