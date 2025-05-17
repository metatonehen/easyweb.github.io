import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import EventCard from "@/components/ui/EventCard";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { Event } from "@shared/schema";
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Events = () => {
  const [eventType, setEventType] = useState<string>("all");
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"list" | "calendar">("list");
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  // Filter events based on type and date
  const filteredEvents = events?.filter(event => {
    const eventDate = new Date(event.startDate);
    const matchesType = eventType === "all" || event.type.toLowerCase() === eventType.toLowerCase();
    
    // If calendar view, only show events in the selected month
    if (view === "calendar") {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const isInSelectedMonth = eventDate >= start && eventDate <= end;
      return matchesType && isInSelectedMonth;
    }
    
    return matchesType;
  });

  const navigateMonth = (direction: "prev" | "next") => {
    setDate(prevDate => {
      if (direction === "prev") {
        return addMonths(prevDate, -1);
      } else {
        return addMonths(prevDate, 1);
      }
    });
  };

  // Group events by date for calendar view
  const eventsByDate: Record<string, Event[]> = {};
  if (filteredEvents) {
    filteredEvents.forEach(event => {
      const dateStr = format(new Date(event.startDate), "yyyy-MM-dd");
      if (!eventsByDate[dateStr]) {
        eventsByDate[dateStr] = [];
      }
      eventsByDate[dateStr].push(event);
    });
  }

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
                Cosmic Calendar
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              Discover upcoming courses, workshops, and spiritual retreats to elevate your consciousness and connect with like-minded souls.
            </p>
          </div>
        </section>

        {/* View Toggle and Filters */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex space-x-2 mb-4 md:mb-0">
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  onClick={() => setView("list")}
                  className={view === "list" ? "bg-indigo-600" : "bg-indigo-900/50 border-indigo-500/30"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  List View
                </Button>
                <Button
                  variant={view === "calendar" ? "default" : "outline"}
                  onClick={() => setView("calendar")}
                  className={view === "calendar" ? "bg-indigo-600" : "bg-indigo-900/50 border-indigo-500/30"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Calendar View
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <EventTypeButton 
                  type="all" 
                  label="All Events" 
                  activeType={eventType} 
                  setEventType={setEventType} 
                  color="bg-indigo-600"
                />
                <EventTypeButton 
                  type="course" 
                  label="Courses" 
                  activeType={eventType} 
                  setEventType={setEventType} 
                  color="bg-blue-500"
                />
                <EventTypeButton 
                  type="workshop" 
                  label="Workshops" 
                  activeType={eventType} 
                  setEventType={setEventType} 
                  color="bg-purple-500"
                />
                <EventTypeButton 
                  type="retreat" 
                  label="Retreats" 
                  activeType={eventType} 
                  setEventType={setEventType} 
                  color="bg-rose-500"
                />
                <EventTypeButton 
                  type="webinar" 
                  label="Webinars" 
                  activeType={eventType} 
                  setEventType={setEventType} 
                  color="bg-amber-500"
                />
              </div>
            </div>

            {/* Calendar View */}
            {view === "calendar" && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigateMonth("prev")}
                    className="bg-indigo-900/50 border-indigo-500/30"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <h2 className="text-xl font-montserrat font-semibold">
                    {format(date, "MMMM yyyy")}
                  </h2>
                  <Button 
                    variant="outline" 
                    onClick={() => navigateMonth("next")}
                    className="bg-indigo-900/50 border-indigo-500/30"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="mx-auto"
                    modifiers={{
                      event: Object.keys(eventsByDate).map(dateStr => new Date(dateStr))
                    }}
                    modifiersClassNames={{
                      event: "bg-indigo-600/50 font-bold border border-indigo-500"
                    }}
                  />
                </div>

                {/* Events for selected day */}
                <div className="mt-8">
                  <h3 className="text-xl font-montserrat font-semibold mb-4">
                    Events for {format(date, "MMMM d, yyyy")}
                  </h3>
                  <div className="space-y-6">
                    {eventsByDate[format(date, "yyyy-MM-dd")]?.map(event => (
                      <EventCard key={event.id} event={event} />
                    )) || (
                      <p className="text-violet-300 text-center py-6">No events scheduled for this day.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="space-y-6 max-w-4xl mx-auto">
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
                ) : filteredEvents?.length ? (
                  filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-violet-300 text-lg">No events found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Featured Event */}
        <section className="py-20 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-12 text-center">Featured Event</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1518715303843-586e350765b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cosmic Retreat" 
                  className="rounded-lg shadow-lg object-cover w-full h-[400px]"
                />
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-800 rounded-t-lg w-16 h-6 flex items-center justify-center">
                    <span className="text-xs font-semibold uppercase text-violet-300">Sept</span>
                  </div>
                  <div className="bg-indigo-700 rounded-b-lg w-16 h-10 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">10</span>
                  </div>
                  <span className="ml-4 px-3 py-1 bg-rose-500 text-white text-xs rounded-full">Retreat</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Cosmic Retreat: Sedona Energy Vortex</h3>
                <p className="text-violet-300 mb-6">
                  A 5-day immersive spiritual retreat in Sedona's powerful energy vortexes, combining meditation, astrology, and sacred geometry. Connect with like-minded souls in this transformative journey.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-violet-400 mb-8">
                  <span className="flex items-center mb-2 sm:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Sedona, Arizona
                  </span>
                  <span className="sm:mx-4 hidden sm:block">|</span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Sept 10-15, 2023
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl text-[#ffc83d] font-semibold">$1,299</span>
                  <a 
                    href="#register" 
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-montserrat font-medium transition"
                  >
                    Register Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Community */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 md:p-12 border border-indigo-500/30">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Join Our Cosmic Community</h2>
              <p className="text-violet-300 mb-8">
                Sign up to be the first to know about upcoming events, limited-time discounts, and exclusive gatherings.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow rounded-full px-4 py-2 bg-indigo-900/50 border border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 rounded-full px-6 py-2 text-white font-montserrat font-medium whitespace-nowrap"
                >
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

type EventTypeButtonProps = {
  type: string;
  label: string;
  activeType: string;
  setEventType: (type: string) => void;
  color: string;
};

const EventTypeButton = ({ type, label, activeType, setEventType, color }: EventTypeButtonProps) => {
  const isActive = activeType === type;

  return (
    <button
      onClick={() => setEventType(type)}
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

export default Events;
