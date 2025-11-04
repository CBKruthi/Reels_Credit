
import React, { useRef, useEffect, useState } from 'react';
import ReelItem from '../components/ReelItem';
import { dummyReels } from '../data/dummyData';

const ReelsFeed = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = container.querySelectorAll('video');
    
    // Intersection Observer for autoplay
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
       { threshold: 0.7 }
    );

    videos.forEach((video) => observer.observe(video));

    // Track scroll position for current reel index
    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const itemHeight = window.innerHeight;
      const index = Math.round(scrollPosition / itemHeight);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm bg-white shadow-xl">
        <div 
          ref={containerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        >
          {dummyReels.map((reel, index) => (
            <div 
              key={reel.id} 
                            className="snap-start h-screen w-full"
            > 
              <ReelItem reel={reel} isActive={index === currentIndex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelsFeed;