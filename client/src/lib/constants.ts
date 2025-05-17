/**
 * Application constants
 */

// Cosmic theme colors
export const COSMIC_COLORS = {
  primary: '#6d40d8', // indigo-500
  secondary: '#8b5cf6', // violet-500
  accent: '#ffc83d', // cosmos-accent
  background: {
    dark: '#1a1a2e', // indigo-950
    medium: '#2a2a4a', // indigo-900
    light: '#3c1f7b', // indigo-800
  }
};

// Course categories with their properties
export const COURSE_CATEGORIES = [
  {
    id: 'amor',
    name: 'Amor',
    label: 'Love & Relationships',
    description: 'Discover the cosmic patterns that guide our heart connections and soul partnerships.',
    icon: '❤️',
    color: '#ec4899',
  },
  {
    id: 'dinero',
    name: 'Dinero',
    label: 'Abundance & Prosperity',
    description: 'Align with universal principles of prosperity and manifest your financial potential.',
    icon: '💰',
    color: '#10b981',
  },
  {
    id: 'salud',
    name: 'Salud',
    label: 'Health & Wellness',
    description: 'Embrace holistic healing practices that balance your body\'s energy systems.',
    icon: '💗',
    color: '#0ea5e9',
  },
  {
    id: 'mente',
    name: 'Mente',
    label: 'Mind & Consciousness',
    description: 'Expand your mental faculties and develop higher states of awareness.',
    icon: '🧠',
    color: '#6366f1',
  },
  {
    id: 'alma',
    name: 'Alma',
    label: 'Soul & Purpose',
    description: 'Connect with your higher self and uncover your unique cosmic mission.',
    icon: '✨',
    color: '#8b5cf6',
  },
  {
    id: 'cuerpo',
    name: 'Cuerpo',
    label: 'Body & Movement',
    description: 'Honor your physical vessel through sacred movement and embodiment practices.',
    icon: '🧘‍♀️',
    color: '#d1d5db',
  }
];

// Service types with their properties
export const SERVICE_TYPES = [
  {
    id: 'coaching',
    name: 'Coaching',
    label: 'Life Coaching',
    description: 'Transformative sessions to clarify your vision, overcome obstacles, and create an action plan aligned with your higher purpose.',
    icon: '👥',
    color: '#3b82f6',
  },
  {
    id: 'astrologia',
    name: 'Astrología',
    label: 'Astrological Readings',
    description: 'Discover the cosmic patterns in your natal chart that reveal your strengths, challenges, and life purpose.',
    icon: '⭐',
    color: '#9333ea',
  },
  {
    id: 'diseno-humano',
    name: 'Diseño Humano',
    label: 'Human Design Analysis',
    description: 'Unlock your energetic type, authority, and strategy for decision-making aligned with your unique design.',
    icon: '🧬',
    color: '#f59e0b',
  },
  {
    id: 'constelaciones',
    name: 'Constelaciones',
    label: 'Family Constellations',
    description: 'Reveal and heal hidden systemic patterns in your family or organizational system that affect your life.',
    icon: '🔄',
    color: '#6366f1',
  },
  {
    id: 'sanaciones',
    name: 'Sanaciones',
    label: 'Energy Healing',
    description: 'Experience deep energetic healing that addresses the root causes of physical, emotional, and spiritual imbalances.',
    icon: '💫',
    color: '#14b8a6',
  },
  {
    id: 'retiros',
    name: 'Retiros',
    label: 'Spiritual Retreats',
    description: 'Immersive retreats in sacred locations designed to facilitate profound transformation and awakening.',
    icon: '🏔️',
    color: '#f43f5e',
  }
];

// Blog post categories
export const BLOG_CATEGORIES = [
  'Astrology',
  'Human Design',
  'Sacred Geometry',
  'Meditation',
  'Spirituality',
  'Healing',
  'Consciousness',
];

// Event types
export const EVENT_TYPES = [
  'course',
  'workshop',
  'retreat',
  'webinar',
];

// Vertex positions for Metatron's Cube (course cube) with platonic solids
export const COURSE_CUBE_VERTICES = [
  {
    id: "amor",
    label: "Amor",
    icon: "❤️",
    color: "#ec4899",
    position: [0, 3, 0] as [number, number, number],
    link: "/courses/amor",
    shape: "tetrahedron" // Tetrahedron at the top
  },
  {
    id: "dinero",
    label: "Dinero",
    icon: "💰",
    color: "#10b981",
    position: [2.6, 1.5, 0] as [number, number, number],
    link: "/courses/dinero",
    shape: "cube" // Cube on top right
  },
  {
    id: "salud",
    label: "Salud",
    icon: "💗",
    color: "#0ea5e9",
    position: [2.6, -1.5, 0] as [number, number, number],
    link: "/courses/salud",
    shape: "octahedron" // Octahedron on bottom right
  },
  {
    id: "mente",
    label: "Mente",
    icon: "🧠",
    color: "#6366f1",
    position: [0, -3, 0] as [number, number, number],
    link: "/courses/mente",
    shape: "dodecahedron" // Dodecahedron at the bottom
  },
  {
    id: "alma",
    label: "Alma",
    icon: "✨",
    color: "#8b5cf6",
    position: [-2.6, -1.5, 0] as [number, number, number],
    link: "/courses/alma",
    shape: "icosahedron" // Icosahedron on bottom left
  },
  {
    id: "cuerpo",
    label: "Cuerpo",
    icon: "🧘‍♀️",
    color: "#d1d5db",
    position: [-2.6, 1.5, 0] as [number, number, number],
    link: "/courses/cuerpo",
    shape: "tetrahedron" // Another tetrahedron on top left
  }
];

// Vertex positions for Metatron's Cube (services cube) with platonic solids
export const SERVICES_CUBE_VERTICES = [
  {
    id: "coaching",
    label: "Coaching",
    icon: "👥",
    color: "#3b82f6",
    position: [0, 3, 0] as [number, number, number],
    link: "/services/coaching",
    shape: "dodecahedron" // Dodecahedron at the top
  },
  {
    id: "astrologia",
    label: "Astrología",
    icon: "⭐",
    color: "#9333ea",
    position: [2.6, 1.5, 0] as [number, number, number],
    link: "/services/astrologia",
    shape: "icosahedron" // Icosahedron on top right
  },
  {
    id: "diseno-humano",
    label: "Diseño Humano",
    icon: "🧬",
    color: "#f59e0b",
    position: [2.6, -1.5, 0] as [number, number, number],
    link: "/services/diseno-humano",
    shape: "octahedron" // Octahedron on bottom right
  },
  {
    id: "constelaciones",
    label: "Constelaciones",
    icon: "🔄",
    color: "#6366f1",
    position: [0, -3, 0] as [number, number, number],
    link: "/services/constelaciones",
    shape: "tetrahedron" // Tetrahedron at the bottom
  },
  {
    id: "sanaciones",
    label: "Sanaciones",
    icon: "💫",
    color: "#14b8a6",
    position: [-2.6, -1.5, 0] as [number, number, number],
    link: "/services/sanaciones",
    shape: "cube" // Cube on bottom left
  },
  {
    id: "retiros",
    label: "Retiros",
    icon: "🏔️",
    color: "#f43f5e",
    position: [-2.6, 1.5, 0] as [number, number, number],
    link: "/services/retiros",
    shape: "sphere" // Sphere on top left
  }
];
