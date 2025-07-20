import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Wrench, Users, Phone, UserPlus, HandHeart, Briefcase, Building, BookOpen } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-800 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">3P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">ThirdParty</h1>
              <p className="text-xs text-sky-600 font-medium">Your Daily Hustle Partner</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/") ? "text-sky-600 font-medium" : "text-gray-700"
              }`}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link
              to="/services"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/services")
                  ? "text-sky-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Wrench className="h-4 w-4 mr-1" />
              Services
            </Link>
            <Link
              to="/job-links"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/job-links")
                  ? "text-sky-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Briefcase className="h-4 w-4 mr-1" />
              Job Links
            </Link>
            <Link
              to="/careers"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/careers")
                  ? "text-sky-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Building className="h-4 w-4 mr-1" />
              Careers
            </Link>
            <Link
              to="/blogs"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/blogs")
                  ? "text-sky-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Blogs
            </Link>
            <Link
              to="/about"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/about")
                  ? "text-sky-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Users className="h-4 w-4 mr-1" />
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-sky-600 transition-colors flex items-center text-sm ${
                isActive("/contact")
                  ? "text-sky-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/register-provider">
                <UserPlus className="h-4 w-4 mr-1" />
                Join as Provider
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/request-service">
                <HandHeart className="h-4 w-4 mr-1" />
                Request Service
              </Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/") ? "text-sky-600 font-medium" : "text-gray-700"
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link
                to="/services"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/services")
                    ? "text-sky-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <Wrench className="h-4 w-4 mr-2" />
                Services
              </Link>
              <Link
                to="/job-links"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/job-links")
                    ? "text-sky-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Job Links
              </Link>
              <Link
                to="/careers"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/careers")
                    ? "text-sky-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <Building className="h-4 w-4 mr-2" />
                Careers
              </Link>
              <Link
                to="/blogs"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/blogs")
                    ? "text-sky-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Blogs
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/about")
                    ? "text-sky-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                About
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className={`hover:text-sky-600 transition-colors flex items-center ${
                  isActive("/contact")
                    ? "text-sky-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  onClick={toggleMenu}
                >
                  <Link to="/register-provider">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join as Provider
                  </Link>
                </Button>
                <Button asChild size="sm" onClick={toggleMenu}>
                  <Link to="/request-service">
                    <HandHeart className="h-4 w-4 mr-2" />
                    Request Service
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
