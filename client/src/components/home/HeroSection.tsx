import * as React from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Star, Users, CheckCircle } from "lucide-react";

interface HeroImage {
  id: number;
  title: string;
  file_path: string;
  alt_text?: string;
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [scrollingImages, setScrollingImages] = React.useState<HeroImage[]>([]);
  const [imageLoading, setImageLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchScrollingImages = async () => {
      try {
        const response = await fetch("/api/images?category=hero");
        if (response.ok) {
          const images = await response.json();
          // Duplicate images for seamless scrolling effect
          const duplicatedImages = [...images, ...images];
          setScrollingImages(duplicatedImages);
        }
      } catch (error) {
        console.error("Error fetching scrolling images:", error);
      } finally {
        setImageLoading(false);
      }
    };

    fetchScrollingImages();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sky-200">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">
                  Your Daily Hustle Partner
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Connecting
                <span className="block text-yellow-400">Needs & Services</span>
                <span className="block">Across Malawi</span>
              </h1>

              <p className="text-xl text-sky-100 max-w-lg">
                Find trusted service providers or join as a provider. From
                plumbing to electrical work, we connect you with skilled
                professionals ready to help.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services... (e.g., plumber, electrician)"
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <Button
                type="submit"
                className="absolute right-2 top-2 bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-semibold"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => (window.location.href = "/request-service")}
                className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-semibold"
              >
                Request Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => (window.location.href = "/register-provider")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-sky-900"
              >
                Join as Provider
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 text-sky-200">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">500+ Providers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Verified Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm">Trusted Platform</span>
              </div>
            </div>
          </div>

          {/* Scrolling Images Section */}
          <div className="relative lg:block">
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              {imageLoading ? (
                <div className="w-full h-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">⏳</div>
                    <h3 className="text-2xl font-bold mb-2">Loading...</h3>
                    <p className="text-sky-100">Preparing your experience</p>
                  </div>
                </div>
              ) : scrollingImages.length > 0 ? (
                <div
                  className="flex animate-scroll-left"
                  style={{ width: `${scrollingImages.length * 300}px` }}
                >
                  {scrollingImages.map((image, index) => (
                    <div
                      key={`${image.id}-${index}`}
                      className="flex-shrink-0 w-80 h-full relative mr-4"
                    >
                      <img
                        src={image.file_path}
                        alt={image.alt_text || image.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-image.svg";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-white font-semibold text-sm">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4"></div>
                    <h3 className="text-2xl font-bold mb-2"></h3>
                    <p className="text-sky-100"></p>
                  </div>
                </div>
              )}

              {/* Bottom Right Floating Card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg z-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-600">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
