import * as React from 'react';

interface HeroImageProps {
  category?: string;
  fallbackSrc?: string;
  className?: string;
  alt?: string;
}

export function HeroImage({ 
  category = 'hero', 
  fallbackSrc = '/hero-placeholder.svg', 
  className = "w-full h-64 md:h-96 object-cover",
  alt = "ThirdParty Hero Image"
}: HeroImageProps) {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch(`/api/images?category=${category}&featured=true`);
        if (response.ok) {
          const images = await response.json();
          if (images.length > 0) {
            setImageSrc(images[0].file_path);
          }
        }
      } catch (error) {
        console.error('Error fetching hero image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, [category]);

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  if (loading) {
    return <div className={`bg-gray-200 animate-pulse ${className}`}></div>;
  }

  return (
    <img
      src={imageSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
}
