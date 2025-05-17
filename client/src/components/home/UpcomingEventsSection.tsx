import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import EventCard from "../ui/EventCard";
import FlowerOfLife from "../sacred-geometry/FlowerOfLife";
import { Event } from "@shared/schema";

const UpcomingEventsSection: React.FC = () => {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/upcoming'],
  });

  return (
    <section id="events" className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <FlowerOfLife size={800} opacity={0.2} className="mx-auto" />
      </div>
      
      <div className="container mx-auto z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">Cosmic Calendar</h2>
        <p className="text-lg max-w-2xl mx-auto text-violet-300">
          Upcoming courses, workshops, and spiritual retreats to elevate your consciousness.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-indigo-500/20">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 flex flex-col items-center justify-center">
                  <div className="bg-indigo-800 rounded-t-lg w-20 h-8 flex items-center justify-center animate-pulse"></div>
                  <div className="bg-indigo-700 rounded-b-lg w-20 h-14 flex items-center justify-center animate-pulse"></div>
                </div>
                <div className="flex-grow">
                  <div className="h-6 bg-indigo-800/50 animate-pulse rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-full mb-2"></div>
                  <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-11/12 mb-2"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm mt-2">
                    <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-32 mb-2 sm:mb-0 sm:mr-4"></div>
                    <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-28"></div>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
                  <div className="w-24 h-8 bg-indigo-800/50 animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          events?.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/events" className="inline-flex items-center px-6 py-3 bg-indigo-800/50 border border-indigo-400/30 rounded-full text-white font-montserrat font-medium hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
          View Full Calendar
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
