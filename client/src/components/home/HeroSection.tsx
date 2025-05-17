import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import StarField from '../stars/StarField';
import FlowerOfLife from '../sacred-geometry/FlowerOfLife';

const HeroSection: React.FC = () => {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Animate scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        if (window.scrollY > 100) {
          scrollIndicatorRef.current.style.opacity = '0';
        } else {
          scrollIndicatorRef.current.style.opacity = '0.7';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Animated Stars Background */}
      <StarField count={150} />
      
      {/* Flower of Life Background Element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FlowerOfLife size={300} opacity={0.15} />
      </div>
      
      {/* Lyra Constellation Element */}
      <div className="absolute top-1/4 right-10 animate-twinkle opacity-70">
        <svg width="100" height="100" viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 opacity-60">
          <circle cx="20" cy="20" r="2" fill="white" />
          <circle cx="30" cy="50" r="1.5" fill="white" />
          <circle cx="50" cy="30" r="2.5" fill="white" />
          <circle cx="70" cy="60" r="1.8" fill="white" />
          <circle cx="75" cy="25" r="2" fill="white" />
          <line x1="20" y1="20" x2="50" y2="30" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="50" y1="30" x2="75" y2="25" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="50" y1="30" x2="30" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="30" y1="50" x2="70" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        </svg>
      </div>
      
      {/* Vega Star Element */}
      <div className="absolute top-1/3 left-16 animate-pulse-slow">
        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_10px_rgba(255,255,255,0.7)]"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
            Cosmic Wisdom & Transformation
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-violet-300 mb-10">
          Explore the depths of your soul and the heights of your potential through sacred geometry, astrology, and human design.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          <Link href="/courses" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full text-white font-montserrat font-semibold hover:from-indigo-500 hover:to-violet-400 transition shadow-lg hover:shadow-xl hover-glow">
            Explore Courses
          </Link>
          <Link href="/services" className="px-8 py-4 bg-gradient-to-r from-indigo-800/50 to-violet-700/50 backdrop-blur-sm border border-violet-400/30 rounded-full text-white font-montserrat font-semibold hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
            Book a Session
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator z-10 transition-opacity duration-300"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-violet-300 opacity-70" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
