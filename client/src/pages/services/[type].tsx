import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import ServiceCard from "@/components/ui/ServiceCard";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { Service } from "@shared/schema";

const ServiceTypeData: Record<string, { title: string, description: string, color: string, icon: string }> = {
  coaching: {
    title: "Life Coaching",
    description: "Transformative sessions to clarify your vision, overcome obstacles, and create an action plan aligned with your higher purpose.",
    color: "#3b82f6",
    icon: "👥",
  },
  astrologia: {
    title: "Astrología",
    description: "Discover the cosmic patterns in your natal chart that reveal your strengths, challenges, and life purpose.",
    color: "#9333ea",
    icon: "⭐",
  },
  "diseno-humano": {
    title: "Diseño Humano",
    description: "Unlock your energetic type, authority, and strategy for decision-making aligned with your unique design.",
    color: "#f59e0b",
    icon: "🧬",
  },
  constelaciones: {
    title: "Constelaciones",
    description: "Reveal and heal hidden systemic patterns in your family or organizational system that affect your life.",
    color: "#6366f1",
    icon: "🔄",
  },
  sanaciones: {
    title: "Sanaciones",
    description: "Experience deep energetic healing that addresses the root causes of physical, emotional, and spiritual imbalances.",
    color: "#14b8a6",
    icon: "💫",
  },
  retiros: {
    title: "Retiros Espirituales",
    description: "Immersive retreats in sacred locations designed to facilitate profound transformation and awakening.",
    color: "#f43f5e",
    icon: "🏔️",
  }
};

const ServiceType = () => {
  const { type } = useParams();
  const serviceInfo = ServiceTypeData[type as string] || {
    title: "Unknown Service",
    description: "Please select a valid service type",
    color: "#6366f1",
    icon: "❓"
  };

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: [`/api/services/type/${type}`],
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
                background: `linear-gradient(to bottom, ${serviceInfo.color}aa, ${serviceInfo.color})`,
                boxShadow: `0 0 20px ${serviceInfo.color}80`
              }}
            >
              <span className="text-4xl" role="img" aria-label={serviceInfo.title}>
                {serviceInfo.icon}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                {serviceInfo.title}
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              {serviceInfo.description}
            </p>
            <Link 
              href="/services" 
              className="inline-flex items-center text-violet-300 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Services
            </Link>
          </div>
        </section>

        {/* Service List */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {isLoading ? (
                // Loading skeleton
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-indigo-500/30 p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-800/50 animate-pulse mr-4"></div>
                      <div className="h-6 bg-indigo-800/50 animate-pulse rounded w-32"></div>
                    </div>
                    <div className="h-4 bg-indigo-800/50 animate-pulse mb-2 rounded w-full"></div>
                    <div className="h-4 bg-indigo-800/50 animate-pulse mb-6 rounded w-3/4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-indigo-800/50 animate-pulse rounded w-16"></div>
                      <div className="h-8 bg-indigo-800/50 animate-pulse rounded w-28"></div>
                    </div>
                  </div>
                ))
              ) : services?.length ? (
                services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-violet-300 text-lg">No services found of this type.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-12 text-center">
              Benefits of {serviceInfo.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: serviceInfo.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Clarity & Direction</h3>
                <p className="text-violet-300">Gain profound insights into your life path and purpose, clearing confusion and indecision.</p>
              </div>

              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: serviceInfo.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Emotional Healing</h3>
                <p className="text-violet-300">Release emotional blockages and transform negative patterns into sources of strength.</p>
              </div>

              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: serviceInfo.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Empowerment</h3>
                <p className="text-violet-300">Discover your innate strengths and learn to make decisions aligned with your authentic self.</p>
              </div>

              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: serviceInfo.color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Deeper Connections</h3>
                <p className="text-violet-300">Enhance your relationships with others by first understanding and honoring your own nature.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-12 text-center">
              What Our Clients Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-indigo-500/20">
                <p className="text-violet-200 italic mb-6">"My session completely transformed how I see myself and my path forward. I gained clarity on issues I've been struggling with for years and now have practical tools to implement daily."</p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold">Maria Lopez</h4>
                    <p className="text-xs text-violet-300">{serviceInfo.title} Client</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-indigo-500/20">
                <p className="text-violet-200 italic mb-6">"The insights I received were incredibly accurate and helpful. It's like having a cosmic map that helps me navigate life's challenges with more awareness and confidence."</p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold">David Williams</h4>
                    <p className="text-xs text-violet-300">{serviceInfo.title} Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <StarField count={50} />
          <div className="container mx-auto max-w-3xl relative z-10">
            <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 md:p-12 border border-indigo-500/30">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4 text-center">Ready to Transform Your Life?</h2>
              <p className="text-center text-violet-300 mb-8">
                Book your {serviceInfo.title} session today and begin your journey to cosmic alignment.
              </p>
              <div className="flex justify-center">
                <Link href="/services/booking" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full text-white font-montserrat font-semibold hover:from-indigo-500 hover:to-violet-400 transition shadow-lg hover:shadow-xl hover-glow">
                  Book Your Session
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceType;
