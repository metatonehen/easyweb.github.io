import { Link } from 'wouter';
import { useState } from 'react';

interface CubeVertexProps {
  label: string;
  icon: string;
  color: string;
  link: string;
  position: {
    top: string;
    left: string;
  };
  shape?: string;
}

const CubeVertex: React.FC<CubeVertexProps> = ({
  label,
  icon,
  color,
  link,
  position,
  shape = 'default'
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Create lighter and darker versions of the color for the wooden effect
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 168, g: 141, b: 94 }; // Default to wooden color
  };
  
  const rgb = hexToRgb(color);
  
  // Get the SVG path for the platonic solid shape with more detailed 3D-like rendering
  const getPlatonicSolidPath = (shape: string): string => {
    switch (shape) {
      case 'tetrahedron':
        // Tetrahedron - 4 triangular faces
        return `
          <!-- Front face -->
          <polygon points="50,20 30,70 70,70" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Left side face -->
          <polygon points="50,20 30,70 50,50" fill="#8d7040" fill-opacity="0.75" stroke="#f5f1e6" stroke-width="1" />
          <!-- Right side face -->
          <polygon points="50,20 70,70 50,50" fill="#9e8352" fill-opacity="0.85" stroke="#f5f1e6" stroke-width="1" />
          <!-- Bottom face (partially visible) -->
          <polygon points="30,70 70,70 50,50" fill="#6d5730" fill-opacity="0.7" stroke="#f5f1e6" stroke-width="1" />
          <!-- Edge highlights -->
          <line x1="50" y1="20" x2="30" y2="70" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.8" />
          <line x1="50" y1="20" x2="70" y2="70" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.8" />
          <line x1="30" y1="70" x2="70" y2="70" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.8" />
        `;
        
      case 'cube':
        // Cube - 6 square faces
        return `
          <!-- Front face -->
          <rect x="30" y="30" width="40" height="40" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Top face -->
          <polygon points="30,30 70,30 80,20 40,20" fill="#9e8352" fill-opacity="0.8" stroke="#f5f1e6" stroke-width="1" />
          <!-- Right side face -->
          <polygon points="70,30 70,70 80,60 80,20" fill="#8d7040" fill-opacity="0.7" stroke="#f5f1e6" stroke-width="1" />
          <!-- Edge highlights -->
          <line x1="30" y1="30" x2="40" y2="20" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="70" y1="30" x2="80" y2="20" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="40" y1="20" x2="80" y2="20" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="80" y1="20" x2="80" y2="60" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="70" y1="70" x2="80" y2="60" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
        `;
        
      case 'octahedron':
        // Octahedron - 8 triangular faces (diamond-like)
        return `
          <!-- Top front face -->
          <polygon points="50,20 30,50 70,50" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Bottom front face -->
          <polygon points="50,80 30,50 70,50" fill="#9e8352" fill-opacity="0.8" stroke="#f5f1e6" stroke-width="1" />
          <!-- Left top face -->
          <polygon points="50,20 30,50 40,40" fill="#8d7040" fill-opacity="0.7" stroke="#f5f1e6" stroke-width="1" />
          <!-- Right top face -->
          <polygon points="50,20 70,50 60,40" fill="#a08759" fill-opacity="0.85" stroke="#f5f1e6" stroke-width="1" />
          <!-- Edge highlights -->
          <line x1="50" y1="20" x2="50" y2="80" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="50" y1="20" x2="30" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="50" y1="20" x2="70" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="50" y1="80" x2="30" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="50" y1="80" x2="70" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
        `;
        
      case 'dodecahedron':
        // Dodecahedron - 12 pentagonal faces
        return `
          <!-- Front pentagonal face -->
          <polygon points="35,30 65,30 75,50 55,70 35,70 25,50" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Upper visible faces (simplified) -->
          <polygon points="35,30 25,50 20,40 40,25 50,20 65,30" fill="#9e8352" fill-opacity="0.8" stroke="#f5f1e6" stroke-width="1" />
          <!-- Right visible face (simplified) -->
          <polygon points="65,30 75,50 80,45 70,35 60,25 50,20" fill="#8d7040" fill-opacity="0.7" stroke="#f5f1e6" stroke-width="1" />
          <!-- Edge highlights -->
          <line x1="35" y1="30" x2="65" y2="30" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="65" y1="30" x2="75" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="75" y1="50" x2="55" y2="70" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="55" y1="70" x2="35" y2="70" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="35" y1="70" x2="25" y2="50" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="25" y1="50" x2="35" y2="30" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
        `;
        
      case 'icosahedron':
        // Icosahedron - 20 triangular faces
        return `
          <!-- Front upper triangular face -->
          <polygon points="50,20 30,45 70,45" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Front lower triangular face -->
          <polygon points="30,45 70,45 50,75" fill="#9e8352" fill-opacity="0.85" stroke="#f5f1e6" stroke-width="1" />
          <!-- Left upper triangular face -->
          <polygon points="50,20 30,45 25,30" fill="#8d7040" fill-opacity="0.7" stroke="#f5f1e6" stroke-width="1" />
          <!-- Right upper triangular face -->
          <polygon points="50,20 70,45 75,30" fill="#a08759" fill-opacity="0.8" stroke="#f5f1e6" stroke-width="1" />
          <!-- Left lower triangular face -->
          <polygon points="30,45 50,75 25,60" fill="#8d7040" fill-opacity="0.75" stroke="#f5f1e6" stroke-width="1" />
          <!-- Right lower triangular face -->
          <polygon points="70,45 50,75 75,60" fill="#a08759" fill-opacity="0.8" stroke="#f5f1e6" stroke-width="1" />
          <!-- Edge highlights -->
          <line x1="50" y1="20" x2="30" y2="45" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="50" y1="20" x2="70" y2="45" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="30" y1="45" x2="70" y2="45" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="30" y1="45" x2="50" y2="75" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
          <line x1="70" y1="45" x2="50" y2="75" stroke="#f5f1e6" stroke-width="1.2" stroke-opacity="0.9" />
        `;
        
      case 'sphere':
        // Sphere with wooden globe-like appearance
        return `
          <!-- Main sphere -->
          <circle cx="50" cy="50" r="30" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Horizontal wooden grain lines like a globe -->
          <path d="M20,50 C30,35 70,35 80,50" fill="none" stroke="#f5f1e6" stroke-width="0.7" stroke-opacity="0.6" />
          <path d="M20,50 C30,65 70,65 80,50" fill="none" stroke="#f5f1e6" stroke-width="0.7" stroke-opacity="0.6" />
          <!-- Vertical wooden grain lines -->
          <path d="M50,20 C35,30 35,70 50,80" fill="none" stroke="#f5f1e6" stroke-width="0.7" stroke-opacity="0.6" />
          <path d="M50,20 C65,30 65,70 50,80" fill="none" stroke="#f5f1e6" stroke-width="0.7" stroke-opacity="0.6" />
          <!-- Highlight to give 3D effect -->
          <circle cx="40" cy="40" r="10" fill="#d6c6a5" fill-opacity="0.4" stroke="none" />
        `;
        
      case 'flower':
        // Flower of Life symbol
        return `
          <!-- Center circle -->
          <circle cx="50" cy="50" r="15" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <!-- Petals -->
          <path d="M50,35 C40,25 30,30 35,40 C25,35 20,45 30,50 C20,55 25,65 35,60 C30,70 40,75 50,65 C60,75 70,70 65,60 C75,65 80,55 70,50 C80,45 75,35 65,40 C70,30 60,25 50,35" fill="#a08759" fill-opacity="0.8" stroke="#f5f1e6" stroke-width="1" />
          <!-- Inner detail -->
          <circle cx="50" cy="50" r="8" fill="#d6c6a5" fill-opacity="0.6" stroke="#f5f1e6" stroke-width="0.5" />
          <circle cx="50" cy="50" r="4" fill="#e8ddc3" fill-opacity="0.7" stroke="none" />
        `;
        
      default:
        // Default shape if none specified
        return `
          <circle cx="50" cy="50" r="30" fill="#b69b70" fill-opacity="0.9" stroke="#f5f1e6" stroke-width="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#f5f1e6" stroke-width="0.8" stroke-opacity="0.7" />
          <circle cx="50" cy="50" r="10" fill="#d6c6a5" fill-opacity="0.7" stroke="none" />
        `;
    }
  };
  
  // Create SVG for wooden-style platonic solid
  const createPlatonicSolidSvg = () => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <filter id="woodGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" seed="5" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
          <filter id="woodShadow">
            <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#604e2e" flood-opacity="0.5" />
          </filter>
        </defs>
        
        <!-- Circle background -->
        <circle cx="50" cy="50" r="45" fill="#f5f1e6" fill-opacity="0.3" stroke="#a88d5e" stroke-width="2" />
        
        <!-- Inner circle -->
        <circle cx="50" cy="50" r="40" fill="#f5f1e6" fill-opacity="0.2" stroke="#a88d5e" stroke-width="1" />
        
        <!-- Platonic solid shape -->
        <g filter="url(#woodShadow)">
          ${getPlatonicSolidPath(shape)}
        </g>
        
        <!-- Hover effect -->
        ${isHovering ? `
          <circle cx="50" cy="50" r="48" fill="none" stroke="#a88d5e" stroke-width="2" stroke-opacity="0.8">
            <animate attributeName="r" values="45;48;45" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
          </circle>
        ` : ''}
      </svg>
    `;
  };
  
  return (
    <div 
      className="cube-vertex absolute z-10"
      style={{
        top: position.top,
        left: position.left,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={link} className="flex flex-col items-center">
        <div 
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow relative"
          style={{
            filter: isHovering ? `drop-shadow(0 0 8px #a88d5e)` : 'none',
            transform: isHovering ? 'scale(1.1)' : 'scale(1)'
          }}
          dangerouslySetInnerHTML={{ __html: createPlatonicSolidSvg() }}
        />
        
        <span 
          className="mt-2 font-montserrat text-white text-sm md:text-base"
          style={{
            textShadow: isHovering ? '0 0 8px white' : 'none',
            transition: 'text-shadow 0.3s ease'
          }}
        >
          {label}
        </span>
      </Link>
    </div>
  );
};

export default CubeVertex;
