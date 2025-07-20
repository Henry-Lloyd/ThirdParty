import * as React from "react";
import { Link } from "react-router-dom";
import { Home, Wrench, Users, Phone, UserPlus, AlertTriangle, Truck, Briefcase, Shield, Lock, FileText, MapPin, Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">3P</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">ThirdParty</h3>
                <p className="text-sm text-sky-300">
                  Your Daily Hustle Partner
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connecting Needs & Services across Malawi. Empowering individuals,
              farmers, and businesses by linking them with trusted service
              providers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Wrench className="h-4 w-4 mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/register-provider"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Domestic Services
              </li>
              <li className="text-gray-300 flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Professional Services
              </li>
              <li className="text-gray-300 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Skilled Labor Recruitment
              </li>
              <li className="text-gray-300 flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Agricultural Produce Supply
              </li>
              <li className="text-gray-300 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Event Support Services
              </li>
              <li className="text-gray-300 flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Procurement Services
              </li>
              <li className="text-gray-300 flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Logistics & Delivery
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-sky-400" />
                <span className="text-gray-300 text-sm">+265 991 451 188</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-sky-400" />
                <span className="text-gray-300 text-sm">
                  info@thirdparty.mw
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-sky-400 mt-1" />
                <span className="text-gray-300 text-sm">
                  Blantyre Synod, Off Phoenix Road
                  <br />
                  Opposite Multipurpose Hall
                  <br />
                  Blantyre, Malawi
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a
                  href="https://web.facebook.com/henry.lloyd.3720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-sky-400 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/HenryLloyd190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-sky-400 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/henrylloyd190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/henry-lloyd-8b067a317/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-sky-400 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@HenryLloyd-g6x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm flex items-center">
              © 2025 ThirdParty. All rights reserved. Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> in Malawi.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <Shield className="h-4 w-4 mr-1" />
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <FileText className="h-4 w-4 mr-1" />
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


// [Editable Area] Insert logo upload or code embed here
// [Editable Area] Profile picture upload component can be placed here
// [Editable Area] Embed or upload design graphics here
// [Fix Area] Message status feedback should reflect actual submission result