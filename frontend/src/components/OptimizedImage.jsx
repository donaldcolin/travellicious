import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  placeholderSrc,
  ...props
}) => {
  // Convert image to WebP format if supported
  const getWebPSrc = (imageSrc) => {
    if (!imageSrc) return '';
    // If the image is already WebP, return as is
    if (imageSrc.endsWith('.webp')) return imageSrc;
    // Otherwise, try to convert to WebP
    return imageSrc.replace(/\.(jpg|jpeg|png)$/, '.webp');
  };

  return (
    <LazyLoadImage
      src={getWebPSrc(src)}
      alt={alt}
      effect="blur"
      placeholderSrc={placeholderSrc || src}
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default OptimizedImage; 