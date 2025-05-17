/**
 * Utility functions related to the cosmic theme of the application
 */

/**
 * Maps category names to their corresponding colors
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    amor: '#ec4899', // pink-500
    dinero: '#10b981', // emerald-500
    salud: '#0ea5e9', // sky-500
    mente: '#6366f1', // indigo-500
    alma: '#8b5cf6', // violet-500
    cuerpo: '#d1d5db', // gray-300
  };
  
  return colors[category.toLowerCase()] || '#6366f1'; // Default to indigo if category not found
}

/**
 * Maps service types to their corresponding colors
 */
export function getServiceColor(type: string): string {
  const colors: Record<string, string> = {
    coaching: '#3b82f6', // blue-500
    astrologia: '#9333ea', // purple-600
    'diseno-humano': '#f59e0b', // amber-500
    constelaciones: '#6366f1', // indigo-500
    sanaciones: '#14b8a6', // teal-500
    retiros: '#f43f5e', // rose-500
  };
  
  return colors[type.toLowerCase()] || '#6366f1'; // Default to indigo if type not found
}

/**
 * Maps service types to their corresponding icons (for use with Lucide React)
 */
export function getServiceIcon(type: string): string {
  const icons: Record<string, string> = {
    coaching: 'users',
    astrologia: 'star',
    'diseno-humano': 'dna',
    constelaciones: 'network',
    sanaciones: 'heart-handshake',
    retiros: 'mountain',
  };
  
  return icons[type.toLowerCase()] || 'sparkles'; // Default icon
}

/**
 * Calculates positions for vertices in a 2D Metatron's Cube
 * Returns an array of [x, y, z] coordinates for each vertex
 */
export function calculateMetatronCubeVertices(centerRadius: number = 3): [number, number, number][] {
  // Positions for a 2D representation of Metatron's Cube
  // with 6 vertices arranged in a hexagon
  const positions: [number, number, number][] = [];
  
  // Calculate 6 vertices in a hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerRadius * Math.sin(angle);
    const y = centerRadius * Math.cos(angle);
    positions.push([x, y, 0]);
  }
  
  return positions;
}

/**
 * Creates a 3D star field in a three.js scene
 * (This is a placeholder - the actual implementation is in the useStars hook)
 */
export function createStarField(count: number, size: number, color: string): void {
  console.log('Creating star field with', count, 'stars of size', size, 'and color', color);
  // Implementation is in useStars hook
}

/**
 * Format date to display month and day
 */
export function formatEventDate(date: Date | string): { month: string, day: string } {
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString('en-US', { month: 'short' });
  const day = eventDate.getDate().toString();
  
  return { month, day };
}
