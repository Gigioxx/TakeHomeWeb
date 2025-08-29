import { useState, useEffect } from 'react';
import { Bird, User } from 'lucide-react';
import { watermarkImage } from '@/lib/watermark';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  showText?: boolean;
  isAvatar?: boolean;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  style,
  onError,
  showText = true,
  isAvatar = false
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [watermarkedSrc, setWatermarkedSrc] = useState<string>('');
  const [isWatermarking, setIsWatermarking] = useState(false);

  // Watermark the image when src changes
  useEffect(() => {
    if (!src) return;
    
    setIsWatermarking(true);
    setIsLoading(true);
    setImageError(false);
    
    watermarkImage(src)
      .then(watermarkedUrl => {
        setWatermarkedSrc(watermarkedUrl);
        setIsWatermarking(false);
      })
      .catch(error => {
        console.error('Failed to watermark image:', error);
        setWatermarkedSrc(src); // Fallback to original
        setIsWatermarking(false);
      });
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    setIsLoading(false);
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    const iconSize = isAvatar ? 20 : 24;
    const Icon = isAvatar ? User : Bird;
    
    return (
      <div 
        className={`${className} bg-birds-search flex items-center justify-center`}
        style={style}
      >
        {showText ? (
          <div className="flex flex-col items-center justify-center gap-2 text-birds-secondary/50">
            <Icon size={iconSize} />
            <span className="text-xs font-medium">No Image</span>
          </div>
        ) : (
          <Icon size={iconSize} className="text-birds-secondary/50" />
        )}
      </div>
    );
  }

  // Show loading state if watermarking or image is loading, or if no watermarked src yet
  const showLoading = isWatermarking || isLoading || !watermarkedSrc;
  
  return (
    <div className={`${className} relative`} style={style}>
      {showLoading && (
        <div 
          className="absolute inset-0 bg-birds-search animate-pulse rounded-lg"
        />
      )}
      {watermarkedSrc && (
        <img
          src={watermarkedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-200 ${showLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}