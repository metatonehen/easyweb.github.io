import { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  // Generate star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    
    // Full stars
    for (let i = 1; i <= Math.floor(rating); i++) {
      stars.push(
        <svg key={`star-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ffc83d]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Half star
    if (rating % 1 !== 0) {
      stars.push(
        <svg key="star-half" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ffc83d]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath="inset(0 50% 0 0)" />
        </svg>
      );
    }
    
    // Empty stars
    for (let i = Math.ceil(rating); i < 5; i++) {
      stars.push(
        <svg key={`star-empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-indigo-500/20 hover-glow">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatarUrl} 
          className="w-12 h-12 rounded-full object-cover" 
          alt={testimonial.name} 
        />
        <div className="ml-4">
          <h4 className="font-montserrat font-semibold">{testimonial.name}</h4>
          <p className="text-xs text-violet-300">{testimonial.serviceType}</p>
        </div>
      </div>
      <p className="text-sm text-violet-200 italic">"{testimonial.content}"</p>
      <div className="mt-4 flex">
        {renderStars(testimonial.rating)}
      </div>
    </div>
  );
};

export default TestimonialCard;
