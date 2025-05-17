import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import MetatronCube from "../cube/MetatronCube";
import ServiceCard from "../ui/ServiceCard";
import FlowerOfLife from "../sacred-geometry/FlowerOfLife";
import { Service } from "@shared/schema";

const serviceVertices = [
  {
    id: "coaching",
    label: "Coaching",
    icon: "👥",
    color: "#3b82f6",
    position: [0, 3, 0] as [number, number, number],
    link: "/services/coaching"
  },
  {
    id: "astrologia",
    label: "Astrología",
    icon: "⭐",
    color: "#9333ea",
    position: [2.6, 1.5, 0] as [number, number, number],
    link: "/services/astrologia"
  },
  {
    id: "diseno-humano",
    label: "Diseño Humano",
    icon: "🧬",
    color: "#f59e0b",
    position: [2.6, -1.5, 0] as [number, number, number],
    link: "/services/diseno-humano"
  },
  {
    id: "constelaciones",
    label: "Constelaciones",
    icon: "🔄",
    color: "#6366f1",
    position: [0, -3, 0] as [number, number, number],
    link: "/services/constelaciones"
  },
  {
    id: "sanaciones",
    label: "Sanaciones",
    icon: "💫",
    color: "#14b8a6",
    position: [-2.6, -1.5, 0] as [number, number, number],
    link: "/services/sanaciones"
  },
  {
    id: "retiros",
    label: "Retiros",
    icon: "🏔️",
    color: "#f43f5e",
    position: [-2.6, 1.5, 0] as [number, number, number],
    link: "/services/retiros"
  }
];

const ServicesCubeSection: React.FC = () => {
  const { data: featuredServices, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services/featured'],
  });

  return (
    <section id="services" className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <FlowerOfLife size={800} opacity={0.2} className="mx-auto" />
      </div>
      
      <div className="container mx-auto z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">Divine Services</h2>
        <p className="text-lg max-w-2xl mx-auto text-violet-300">
          Book personalized sessions with our experts to receive guidance tailored to your unique cosmic blueprint.
        </p>
      </div>
      
      <div className="cube-container w-full max-w-3xl mx-auto mb-16 relative h-[500px] md:h-[600px]">
        {/* Interactive Metatron's Cube for Services with platonic solids */}
        <MetatronCube 
          vertices={serviceVertices} 
          size={500} 
          rotationSpeed={0.0005} 
          woodenStyle={true}
        />
      </div>
      
      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-indigo-500/30 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-800/50 animate-pulse mr-4"></div>
                <div className="h-6 bg-indigo-800/50 animate-pulse rounded w-32"></div>
              </div>
              <div className="h-4 bg-indigo-800/50 animate-pulse mb-2 rounded w-full"></div>
              <div className="h-4 bg-indigo-800/50 animate-pulse mb-6 rounded w-3/4"></div>
              <div className="flex justify-between items-center">
                <div className="h-5 bg-indigo-800/50 animate-pulse rounded w-16"></div>
                <div className="h-8 bg-indigo-800/50 animate-pulse rounded w-28"></div>
              </div>
            </div>
          ))
        ) : (
          featuredServices?.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))
        )}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/services" className="inline-flex items-center px-6 py-3 bg-indigo-800/50 border border-indigo-400/30 rounded-full text-white font-montserrat font-medium hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
          View All Services
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ServicesCubeSection;
