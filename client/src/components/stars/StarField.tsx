import { useEffect, useRef } from 'react';

interface StarFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  className?: string;
}

const StarField: React.FC<StarFieldProps> = ({
  count = 150,
  color = '#FFFFFF',
  size = 2,
  speed = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      oscillationSpeed: number;
      phase: number;
    }> = [];

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars.length = 0; // Clear stars
      initStars(); // Reinitialize stars
    };

    // Initialize stars
    const initStars = () => {
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * size,
          opacity: Math.random(),
          speed: 0.1 + Math.random() * speed * 0.5,
          oscillationSpeed: 0.001 + Math.random() * 0.008,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Animation
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach((star) => {
        // Update opacity based on oscillation
        star.phase += star.oscillationSpeed;
        star.opacity = 0.3 + Math.sin(star.phase) * 0.7;
        
        // Draw star
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        context.fill();
      });
      
      requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [count, color, size, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
    />
  );
};

export default StarField;
