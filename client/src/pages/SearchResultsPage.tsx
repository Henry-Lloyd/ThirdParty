import * as React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Users, Clock, AlertCircle, Shield } from 'lucide-react';

interface SearchResult {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_category: string;
  location: string;
  description?: string;
  experience_years?: number;
  verified: boolean;
  created_at: string;
}

interface SearchResponse {
  query: string;
  providers: SearchResult[];
  count: number;
  totalProviders: number;
  timestamp: string;
}

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get('q') || '');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [searchData, setSearchData] = React.useState<SearchResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      console.log('Searching for:', query);
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (response.ok) {
        const data: SearchResponse = await response.json();
        console.log('Search results:', data);
        setResults(data.providers || []);
        setSearchData(data);
      } else {
        console.error('Search failed:', response.status);
        setResults([]);
        setSearchData(null);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setSearchData(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      // Update URL without navigation
      window.history.replaceState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNewSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    if (newQuery.trim()) {
      performSearch(newQuery);
      window.history.replaceState({}, '', `/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Search Service Providers
            </h1>
            
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for services, providers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="px-8"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Search Suggestions */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Popular searches:</h3>
          <div className="flex flex-wrap gap-2">
            {['plumber', 'electrician', 'cleaner', 'tutor', 'carpenter', 'catering', 'delivery'].map((term) => (
              <button
                key={term}
                onClick={() => handleNewSearch(term)}
                className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {hasSearched && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results
                {searchParams.get('q') && (
                  <span className="text-gray-600 font-normal">
                    {' '}for "{searchParams.get('q')}"
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-600">
                  {loading ? 'Searching...' : `Found ${results.length} provider${results.length !== 1 ? 's' : ''}`}
                </p>
                {searchData && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {searchData.totalProviders} total providers in system
                  </Badge>
                )}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for providers...</p>
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any providers matching your search. Try different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/services">Browse All Services</Link>
                </Button>
                <Button asChild>
                  <Link to="/request-service">Request Custom Service</Link>
                </Button>
              </div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-6">
              {results.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xl font-semibold text-gray-600">
                            {provider.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900 flex items-center">
                            {provider.name}
                            {provider.verified && (
                              <Badge className="ml-2 bg-green-100 text-green-800 flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-blue-600 font-medium">{provider.service_category}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {provider.location}
                            </div>
                            {provider.experience_years && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1" />
                                {provider.experience_years} years experience
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          <Clock className="h-3 w-3 mr-1" />
                          Available
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {provider.description && (
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {provider.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <p className="mb-1 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Service Area: {provider.location}
                        </p>
                        <p className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Specialization: {provider.service_category}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          asChild
                          size="sm"
                          className="w-full"
                        >
                          <Link to="/request-service" state={{ 
                            serviceType: provider.service_category,
                            location: provider.location 
                          }}>
                            Request Service
                          </Link>
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                          Contact details available after service request
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
              <p className="text-gray-600 mb-6">
                Enter keywords above to find service providers in your area.
              </p>
              <div className="text-sm text-gray-500">
                <p>Try searching for:</p>
                <p>"plumber in Blantyre", "tutoring", "catering services", or any service you need</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
