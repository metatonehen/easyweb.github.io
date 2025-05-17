import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "../ui/TestimonialCard";
import FlowerOfLife from "../sacred-geometry/FlowerOfLife";
import { Testimonial } from "@shared/schema";

const TestimonialsSection: React.FC = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  return (
    <section id="testimonials" className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <FlowerOfLife size={800} opacity={0.2} className="mx-auto" />
      </div>
      
      <div className="container mx-auto z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">Cosmic Transformations</h2>
        <p className="text-lg max-w-2xl mx-auto text-violet-300">
          Stories from souls who have journeyed with us through the stars.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-indigo-500/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-800/50 animate-pulse"></div>
                <div className="ml-4">
                  <div className="h-5 bg-indigo-800/50 animate-pulse rounded w-32 mb-1"></div>
                  <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-24"></div>
                </div>
              </div>
              <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-full mb-2"></div>
              <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-11/12 mb-2"></div>
              <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-full mb-2"></div>
              <div className="mt-4 flex">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="w-5 h-5 mr-1 bg-indigo-800/50 animate-pulse rounded-full"></div>
                ))}
              </div>
            </div>
          ))
        ) : (
          testimonials?.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
