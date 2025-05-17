import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import ServiceCard from "@/components/ui/ServiceCard";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { Service } from "@shared/schema";

const Services = () => {
  const [serviceType, setServiceType] = useState<string>("all");
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services', serviceType],
  });

  const filteredServices = serviceType === "all" 
    ? services 
    : services?.filter(service => service.type.toLowerCase() === serviceType.toLowerCase());

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
                Divine Services
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              Book personalized sessions with our experts to receive guidance tailored to your unique cosmic blueprint.
            </p>
          </div>
        </section>

        {/* Services Type Filter */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <ServiceButton 
                type="all" 
                label="All Services" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-indigo-600"
              />
              <ServiceButton 
                type="coaching" 
                label="Coaching" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-blue-500"
              />
              <ServiceButton 
                type="astrologia" 
                label="Astrología" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-purple-500"
              />
              <ServiceButton 
                type="diseno-humano" 
                label="Diseño Humano" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-amber-500"
              />
              <ServiceButton 
                type="constelaciones" 
                label="Constelaciones" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-indigo-500"
              />
              <ServiceButton 
                type="sanaciones" 
                label="Sanaciones" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-teal-500"
              />
              <ServiceButton 
                type="retiros" 
                label="Retiros" 
                activeType={serviceType} 
                setServiceType={setServiceType} 
                color="bg-rose-500"
              />
            </div>

            {/* Services Grid */}
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
              ) : filteredServices?.length ? (
                filteredServices.map(service => (
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

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">1</div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Choose Your Service</h3>
                <p className="text-violet-300">Browse our range of spiritual and transformative services to find the perfect match for your needs.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">2</div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Book Your Session</h3>
                <p className="text-violet-300">Select a convenient date and time for your session with one of our expert practitioners.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">3</div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Transform Your Life</h3>
                <p className="text-violet-300">Experience deep transformation as you connect with cosmic wisdom tailored to your unique journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practitioner Showcase */}
        <section className="py-20 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-center">Our Expert Practitioners</h2>
            <p className="text-center text-violet-300 max-w-3xl mx-auto mb-12">
              Meet our team of skilled practitioners who bring decades of combined experience in spiritual guidance, astrology, and holistic healing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                // Loading skeleton
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                    <div className="h-64 bg-indigo-800/50 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-indigo-800/50 animate-pulse mb-2 rounded"></div>
                      <div className="h-4 bg-indigo-800/50 animate-pulse mb-4 rounded w-3/4"></div>
                      <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-full mb-1"></div>
                      <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-full mb-1"></div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Elena Rodriguez" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-montserrat font-semibold mb-1">Elena Rodriguez</h3>
                      <p className="text-[#ffc83d] mb-3">Astrologer & Human Design Analyst</p>
                      <p className="text-violet-300 text-sm">With over 15 years of experience in astrology and 8 years in Human Design, Elena provides profound insights into your cosmic blueprint.</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Marcus Chen" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-montserrat font-semibold mb-1">Marcus Chen</h3>
                      <p className="text-[#ffc83d] mb-3">Life Coach & Meditation Guide</p>
                      <p className="text-violet-300 text-sm">A certified life coach and meditation instructor who specializes in helping clients align with their true purpose and potential.</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Sarah Johnson" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-montserrat font-semibold mb-1">Sarah Johnson</h3>
                      <p className="text-[#ffc83d] mb-3">Energy Healer & Retreat Facilitator</p>
                      <p className="text-violet-300 text-sm">A gifted energy healer who facilitates transformative healing sessions and leads our spiritual retreats around the world.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <StarField count={50} />
          <div className="container mx-auto max-w-3xl relative z-10">
            <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 md:p-12 border border-indigo-500/30">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4 text-center">Ready to Begin Your Cosmic Journey?</h2>
              <p className="text-center text-violet-300 mb-8">
                Book your first session today and receive a special 15% discount for new clients.
              </p>
              <div className="flex justify-center">
                <Link href="#booking" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full text-white font-montserrat font-semibold hover:from-indigo-500 hover:to-violet-400 transition shadow-lg hover:shadow-xl hover-glow">
                  Book Your Session Now
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

type ServiceButtonProps = {
  type: string;
  label: string;
  activeType: string;
  setServiceType: (type: string) => void;
  color: string;
};

const ServiceButton = ({ type, label, activeType, setServiceType, color }: ServiceButtonProps) => {
  const isActive = activeType === type;

  return (
    <button
      onClick={() => setServiceType(type)}
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

export default Services;
