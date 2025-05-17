import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import CourseCard from "@/components/ui/CourseCard";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { Course } from "@shared/schema";

const CategoryData: Record<string, { title: string, description: string, color: string, icon: string }> = {
  amor: {
    title: "Love & Relationships",
    description: "Discover the cosmic patterns that guide our heart connections and soul partnerships.",
    color: "#ec4899",
    icon: "❤️",
  },
  dinero: {
    title: "Abundance & Prosperity",
    description: "Align with universal principles of prosperity and manifest your financial potential.",
    color: "#10b981",
    icon: "💰",
  },
  salud: {
    title: "Health & Wellness",
    description: "Embrace holistic healing practices that balance your body's energy systems.",
    color: "#0ea5e9",
    icon: "💗",
  },
  mente: {
    title: "Mind & Consciousness",
    description: "Expand your mental faculties and develop higher states of awareness.",
    color: "#6366f1",
    icon: "🧠",
  },
  alma: {
    title: "Soul & Purpose",
    description: "Connect with your higher self and uncover your unique cosmic mission.",
    color: "#8b5cf6",
    icon: "✨",
  },
  cuerpo: {
    title: "Body & Movement",
    description: "Honor your physical vessel through sacred movement and embodiment practices.",
    color: "#d1d5db",
    icon: "🧘‍♀️",
  }
};

const CourseCategory = () => {
  const { category } = useParams();
  const categoryInfo = CategoryData[category as string] || {
    title: "Unknown Category",
    description: "Please select a valid category",
    color: "#6366f1",
    icon: "❓"
  };

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: [`/api/courses/category/${category}`],
  });

  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        {/* Page Header */}
        <section className="relative py-20 px-4 overflow-hidden">
          <StarField count={100} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FlowerOfLife size={300} opacity={0.15} />
          </div>
          
          <div className="container mx-auto z-10 text-center max-w-4xl relative">
            <div 
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ 
                background: `linear-gradient(to bottom, ${categoryInfo.color}aa, ${categoryInfo.color})`,
                boxShadow: `0 0 20px ${categoryInfo.color}80`
              }}
            >
              <span className="text-4xl" role="img" aria-label={categoryInfo.title}>
                {categoryInfo.icon}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                {categoryInfo.title}
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              {categoryInfo.description}
            </p>
            <Link 
              href="/courses" 
              className="inline-flex items-center text-violet-300 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Courses
            </Link>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {isLoading ? (
                // Loading skeleton
                Array(6).fill(0).map((_, i) => (
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
              ) : courses?.length ? (
                courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-violet-300 text-lg">No courses found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseCategory;
