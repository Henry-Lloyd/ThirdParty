import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Get in Touch</CardTitle>
          <p className="text-gray-600">
            Multiple ways to reach our team. We're here to help with any questions or support you need.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">+265 991 451 188</p>
              <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM, Sat 8AM-2PM</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">WhatsApp</h3>
              <a 
                href="https://wa.me/+265991451188" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                +265 991 451 188
              </a>
              <p className="text-sm text-gray-500">Quick responses, 24/7 available</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <a 
                href="mailto:info@thirdparty.mw"
                className="text-purple-600 hover:underline"
              >
                info@thirdparty.mw
              </a>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Office Location</h3>
              <p className="text-gray-600">
                Blantyre Synod, Off Phoenix Road<br />
                Opposite Multipurpose Hall<br />
                Blantyre, Malawi
              </p>
              <a 
                href="https://maps.app.goo.gl/1RUAbw9w6S25sWCfA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:underline text-sm"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Office Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Office Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="font-medium">8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saturday</span>
              <span className="font-medium">8:00 AM - 2:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday</span>
              <span className="font-medium text-red-600">Closed</span>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-xs">
                <strong>Emergency Services:</strong> Available 24/7 through WhatsApp for urgent requests
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow Us</CardTitle>
          <p className="text-gray-600 text-sm">
            Stay connected with ThirdParty on social media for updates and community stories.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <a 
              href="https://web.facebook.com/henry.lloyd.3720" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://x.com/HenryLloyd190" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://www.instagram.com/henrylloyd190/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/henry-lloyd-8b067a317/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://www.youtube.com/@HenryLloyd-g6x" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
