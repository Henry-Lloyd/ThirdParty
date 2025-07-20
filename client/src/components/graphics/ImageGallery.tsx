import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Image {
  id: number;
  title: string;
  description?: string;
  filename: string;
  file_path: string;
  category: string;
  alt_text?: string;
  is_featured: number;
  sort_order: number;
  status: string;
  created_at: string;
}

interface ImageGalleryProps {
  category?: string;
  featured?: boolean;
  limit?: number;
  className?: string;
}

export function ImageGallery({ category, featured = false, limit, className = "" }: ImageGalleryProps) {
  const [images, setImages] = React.useState<Image[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (featured) params.append('featured', 'true');

      const response = await fetch(`/api/images?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        const limitedData = limit ? data.slice(0, limit) : data;
        setImages(limitedData);
      } else {
        throw new Error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchImages();
  }, [category, featured, limit]);

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: limit || 8 }).map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-600">Error loading images: {error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-600">No images found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <img
                src={image.file_path}
                alt={image.alt_text || image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-image.svg';
                }}
              />
              {image.is_featured === 1 && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
            {image.title && (
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{image.title}</h3>
                {image.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{image.description}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
