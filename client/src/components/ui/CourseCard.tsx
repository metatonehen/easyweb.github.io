import { Link } from "wouter";
import { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'amor': return 'bg-pink-500';
      case 'dinero': return 'bg-emerald-500';
      case 'salud': return 'bg-sky-500';
      case 'mente': return 'bg-indigo-500';
      case 'alma': return 'bg-violet-500';
      case 'cuerpo': return 'bg-gray-400';
      default: return 'bg-indigo-500';
    }
  };

  return (
    <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition border border-indigo-500/30 hover-glow">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-indigo-900 to-transparent w-full h-1/2"></div>
        <div className={`absolute top-2 right-2 ${getCategoryColor(course.category)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
          {course.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-montserrat font-semibold mb-2">{course.title}</h3>
        <p className="text-violet-300 text-sm mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-[#ffc83d] font-semibold">${course.price.toFixed(2)}</span>
          <Link 
            href={`/courses/details/${course.id}`} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-medium text-white"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
