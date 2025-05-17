import { Link } from "wouter";
import { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getServiceIconColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'coaching': return 'bg-blue-500';
      case 'astrologia': return 'bg-purple-500';
      case 'diseno-humano': return 'bg-amber-500';
      case 'constelaciones': return 'bg-indigo-500';
      case 'sanaciones': return 'bg-teal-500';
      case 'retiros': return 'bg-rose-500';
      default: return 'bg-indigo-500';
    }
  };

  const getServiceIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'coaching': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'astrologia': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'diseno-humano': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        );
      case 'constelaciones': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'sanaciones': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'retiros': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      default: 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition border border-indigo-500/30 hover-glow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full ${getServiceIconColor(service.type)} flex items-center justify-center mr-4 text-white`}>
            {getServiceIcon(service.type)}
          </div>
          <h3 className="text-xl font-montserrat font-semibold">{service.title}</h3>
        </div>
        <p className="text-violet-300 text-sm mb-6">{service.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-violet-300">From</span>
            <span className="text-[#ffc83d] font-semibold ml-1">
              ${typeof service.price === 'number' 
                ? service.price.toFixed(2) 
                : parseFloat(service.price as string).toFixed(2)}
            </span>
          </div>
          <Link 
            href={`/services/booking/${service.id}`} 
            className={`px-4 py-2 ${getServiceIconColor(service.type)} hover:opacity-90 rounded-full text-sm font-medium text-white`}
          >
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
