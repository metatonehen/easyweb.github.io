import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import CourseCard from "@/components/ui/CourseCard";
import { Course } from "@shared/schema";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";

const Courses = () => {
  const [category, setCategory] = useState<string>("all");
  
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses', category],
  });

  const filteredCourses = category === "all" 
    ? courses 
    : courses?.filter(course => course.category.toLowerCase() === category.toLowerCase());

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
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                Cosmic Knowledge Journey
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              Explore our transformative courses designed to elevate your consciousness and connect you with universal wisdom.
            </p>
          </div>
        </section>

        {/* Courses Category Filter */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <CategoryButton 
                name="all" 
                label="All Courses" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-indigo-600"
              />
              <CategoryButton 
                name="amor" 
                label="Amor" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-pink-500"
              />
              <CategoryButton 
                name="dinero" 
                label="Dinero" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-emerald-500"
              />
              <CategoryButton 
                name="salud" 
                label="Salud" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-sky-500"
              />
              <CategoryButton 
                name="mente" 
                label="Mente" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-indigo-500"
              />
              <CategoryButton 
                name="alma" 
                label="Alma" 
                activeCategory={category} 
                setCategory={setCategory}
                color="bg-violet-500"
              />
              <CategoryButton 
                name="cuerpo" 
                label="Cuerpo" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-gray-400"
              />
            </div>

            {/* Courses Grid */}
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
              ) : filteredCourses?.length ? (
                filteredCourses.map(course => (
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

type CategoryButtonProps = {
  name: string;
  label: string;
  activeCategory: string;
  setCategory: (category: string) => void;
  color: string;
};

const CategoryButton = ({ name, label, activeCategory, setCategory, color }: CategoryButtonProps) => {
  const isActive = activeCategory === name;

  return (
    <button
      onClick={() => setCategory(name)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive 
          ? `${color} text-white` 
          : 'bg-indigo-900/50 text-white hover:bg-indigo-800/70'
      }`}
    >
      {label}
    </button>
  );
};

export default Courses;
