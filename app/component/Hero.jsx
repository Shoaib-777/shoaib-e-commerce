
'use client'
import { useEffect, useState } from 'react';

const images = [
  'images/banner1.jpg',
  'images/banner2.jpg',
  'images/banner3.jpg',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [manualDirection, setManualDirection] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    setAnimationDirection('next');
    setExitingIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setManualDirection(false);
  };

  const prevImage = () => {
    setAnimationDirection('prev');
    setExitingIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setManualDirection(true);
  };

  return (
    <div className="hero-container overflow-hidden mb-4">
      <div className="relative border-b border-gray-200 h-auto min-h-[360px] ">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`banner ${index + 1}`}
            className={`hero-image ${index === currentIndex ? 'active' : ''} ${index === exitingIndex ? 'exiting' : ''} ${index === currentIndex && !manualDirection ? 'next' : ''} ${index === currentIndex && manualDirection ? 'prev' : ''}`}
          />
        ))}
        <button className="hero-button left justify-center" onClick={prevImage}>
          &#10094;
        </button>
        <button className="hero-button right justify-center" onClick={nextImage}>
          &#10095;
        </button>
        {/* 300-575 */}
      </div>
    </div>
  );
};

export default Hero;





