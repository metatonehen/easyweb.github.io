import React from 'react';

interface FlowerOfLifeProps {
  className?: string;
  size?: number;
  opacity?: number;
  animationDuration?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const FlowerOfLife: React.FC<FlowerOfLifeProps> = ({ 
  className = '',
  size = 300,
  opacity = 0.35,
  animationDuration = 20,
  primaryColor = '#8a4fff',
  secondaryColor = '#e5c07b' 
}) => {
  // For a traditional Flower of Life pattern, we need to calculate the 
  // positions for nested circles arranged in a specific sacred geometry pattern
  const centerX = 150;
  const centerY = 150;
  const radius = 25; // Base radius for circles
  
  // Define type for circle positions
  type CirclePosition = {
    x: number;
    y: number;
  };

  // Create the circles that make up the Flower of Life
  const createFlowerOfLife = (): CirclePosition[] => {
    // Positions for the first ring of 6 circles around the center
    const firstRing: CirclePosition[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3); // 60 degrees in radians
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      firstRing.push({ x, y });
    }
    
    // Create the outer rings based on intersections
    // The complete Flower of Life has 19 complete circles
    const allCircles: CirclePosition[] = [{ x: centerX, y: centerY }]; // Start with center
    allCircles.push(...firstRing); // Add first ring
    
    // Add the second ring of 12 circles
    const secondRing: CirclePosition[] = [];
    firstRing.forEach((circle, i) => {
      const nextCircle = firstRing[(i + 1) % 6];
      
      // Create a circle at each intersection point
      const midX = (circle.x + nextCircle.x) / 2;
      const midY = (circle.y + nextCircle.y) / 2;
      
      // Calculate distance from center
      const distToCenter = Math.sqrt(
        Math.pow(midX - centerX, 2) + Math.pow(midY - centerY, 2)
      );
      
      // Normalize to get the correct outer ring position
      const outerX = centerX + (midX - centerX) / distToCenter * radius * 2;
      const outerY = centerY + (midY - centerY) / distToCenter * radius * 2;
      
      secondRing.push({ x: outerX, y: outerY });
    });
    
    allCircles.push(...secondRing);
    
    return allCircles;
  };
  
  const circlePositions = createFlowerOfLife();
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, opacity }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <radialGradient id="flowerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={`${secondaryColor}33`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        
        {/* Glowing background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 4}
          fill="url(#flowerGlow)"
          className="animate-pulse-slow"
        />
        
        {/* Outer containing circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 3.5}
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        
        {/* The Flower of Life pattern */}
        {circlePositions.map((circle, i) => (
          <circle
            key={`flower-circle-${i}`}
            cx={circle.x}
            cy={circle.y}
            r={radius}
            fill="none"
            stroke={i === 0 ? secondaryColor : primaryColor}
            strokeWidth={i === 0 ? "1.2" : "0.8"}
            strokeOpacity={i === 0 ? "0.9" : "0.6"}
            style={{
              animation: i === 0 ? `pulse 6s infinite` : 
                         i < 7 ? `twinkle ${animationDuration}s ease-in-out ${i * 0.5}s infinite alternate` : 
                         undefined
            }}
          />
        ))}
        
        {/* Seed of Life pattern - inner petals */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.4}
          fill={secondaryColor}
          fillOpacity="0.5"
          className="animate-twinkle"
        />
      </svg>
    </div>
  );
};

export default FlowerOfLife;
