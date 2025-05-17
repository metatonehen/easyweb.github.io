import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import MetatronCube from "../cube/MetatronCube";
import CourseCard from "../ui/CourseCard";
import FlowerOfLife from "../sacred-geometry/FlowerOfLife";
import { Course } from "@shared/schema";

const courseVertices = [
  {
    id: "amor",
    label: "Amor",
    icon: "❤️",
    color: "#ec4899",
    position: [0, 3, 0] as [number, number, number],
    link: "/courses/amor"
  },
  {
    id: "dinero",
    label: "Dinero",
    icon: "💰",
    color: "#10b981",
    position: [2.6, 1.5, 0] as [number, number, number],
    link: "/courses/dinero"
  },
  {
    id: "salud",
    label: "Salud",
    icon: "💗",
    color: "#0ea5e9",
    position: [2.6, -1.5, 0] as [number, number, number],
    link: "/courses/salud"
  },
  {
    id: "mente",
    label: "Mente",
    icon: "🧠",
    color: "#6366f1",
    position: [0, -3, 0] as [number, number, number],
    link: "/courses/mente"
  },
  {
    id: "alma",
    label: "Alma",
    icon: "✨",
    color: "#8b5cf6",
    position: [-2.6, -1.5, 0] as [number, number, number],
    link: "/courses/alma"
  },
  {
    id: "cuerpo",
    label: "Cuerpo",
    icon: "🧘‍♀️",
    color: "#d1d5db",
    position: [-2.6, 1.5, 0] as [number, number, number],
    link: "/courses/cuerpo"
  }
];

const CourseCubeSection: React.FC = () => {
  const { data: featuredCourses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses/featured'],
  });

  return (
    <section id="courses" className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <FlowerOfLife size={800} opacity={0.2} className="mx-auto" />
      </div>
      
      <div className="container mx-auto z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">Knowledge Portals</h2>
        <p className="text-lg max-w-2xl mx-auto text-violet-300">
          Explore our cosmic courses organized by the six vertices of the Metatron's Cube, each representing a fundamental aspect of existence.
        </p>
      </div>
      
      <div className="cube-container w-full max-w-3xl mx-auto mb-16 relative h-[500px] md:h-[600px]">
        {/* Interactive Metatron's Cube with platonic solids */}
        <MetatronCube 
          vertices={courseVertices} 
          size={500} 
          woodenStyle={true}
          rotationSpeed={0.0005}
        />
      </div>
      
      {/* Featured Courses Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-indigo-500/30">
              <div className="h-48 bg-indigo-800/50 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-indigo-800/50 animate-pulse mb-2 rounded"></div>
                <div className="h-4 bg-indigo-800/50 animate-pulse mb-4 rounded w-3/4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-indigo-800/50 animate-pulse rounded w-16"></div>
                  <div className="h-8 bg-indigo-800/50 animate-pulse rounded w-28"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          featuredCourses?.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/courses" className="inline-flex items-center px-6 py-3 bg-indigo-800/50 border border-indigo-400/30 rounded-full text-white font-montserrat font-medium hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
          View All Courses
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CourseCubeSection;
