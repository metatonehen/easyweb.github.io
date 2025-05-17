import { format } from "date-fns";
import { Link } from "wouter";
import { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.startDate);
  
  return (
    <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-indigo-500/20 hover-glow">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 flex flex-col items-center justify-center">
          <div className="bg-indigo-800 rounded-t-lg w-20 h-8 flex items-center justify-center">
            <span className="text-xs font-semibold uppercase text-violet-300">
              {format(eventDate, "MMM")}
            </span>
          </div>
          <div className="bg-indigo-700 rounded-b-lg w-20 h-14 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {format(eventDate, "d")}
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-montserrat font-semibold mb-2">{event.title}</h3>
          <p className="text-sm text-violet-300 mb-2">{event.description}</p>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-violet-400">
            <span className="flex items-center mb-2 sm:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.time}
            </span>
            <span className="sm:mx-4 hidden sm:block">|</span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
          <Link 
            href={`/events/${event.id}`} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-medium inline-block text-white"
          >
            {event.type === 'course' ? 'Enroll' : 'Register'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
