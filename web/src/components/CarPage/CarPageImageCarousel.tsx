import React, { useState, useRef, useEffect } from 'react';
import './CarPageCarousel.css'
import Prev from '../../assets/images/before.png';
import Next from '../../assets/images/next.png';


interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const thumbnailCount = 5;
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    } else {
      setCurrentIndex((currentIndex + 1) % images.length);
    }
  };

  const openLightbox = () => {
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  const getVisibleThumbnailIndices = () => {
    const visibleIndices: number[] = [];
    for (let i = currentIndex; i < currentIndex + thumbnailCount; i++) {
      visibleIndices.push(i % images.length);
    }
    return visibleIndices;
  };

  return (
    <div className="image-carousel-container">
      <div className="main-image-container">
        <div className="main-arrow left" onClick={() => handleArrowClick('prev')}>
          <img src={Prev} alt="Previous" />
        </div>
        <img
          src={images[currentIndex]}
          alt="Main Image"
          className="main-image"
          onClick={openLightbox}
        />
        <div className="main-arrow right" onClick={() => handleArrowClick('next')}>
          <img src={Next} alt="Next" />
        </div>
      </div>

      <div className="thumbnail-scroll-container" ref={thumbnailContainerRef}>
        <div className="thumbnail-container">
          {getVisibleThumbnailIndices().map((index) => (
            <img
              key={index}
              src={images[index]}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {lightboxIsOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <div
              className="lightbox-arrow left"
              onClick={(e) => {
                e.stopPropagation();
                handleArrowClick('prev');
              }}
            >
              <img src={Prev} alt="Previous" />
            </div>
            <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="lighbox-image" />
            <div
              className="lightbox-arrow right"
              onClick={(e) => {
                e.stopPropagation();
                handleArrowClick('next');
              }}
            >
              <img src={Next} alt="Next" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;