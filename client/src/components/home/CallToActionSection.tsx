import { Link } from "wouter";
import StarField from "../stars/StarField";
import FlowerOfLife from "../sacred-geometry/FlowerOfLife";

const CallToActionSection: React.FC = () => {
  return (
    <section id="cta" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-indigo-950 opacity-80"></div>
      <div className="absolute inset-0 opacity-20">
        <FlowerOfLife size={800} opacity={0.4} className="mx-auto" />
      </div>
      
      {/* Animated Stars */}
      <StarField count={100} speed={0.5} className="z-0" />
      
      <div className="container mx-auto z-10 text-center relative">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6 text-white">Begin Your Cosmic Journey</h2>
          <p className="text-lg text-violet-300 mb-10">
            Connect with your higher self, unlock your cosmic potential, and transform your life with NEO GAIAM's courses and services.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full text-white font-montserrat font-semibold hover:from-indigo-500 hover:to-violet-400 transition shadow-lg hover:shadow-xl hover-glow">
              Explore Courses
            </Link>
            <Link href="/services" className="w-full sm:w-auto px-8 py-4 bg-indigo-800/50 border border-violet-400/30 rounded-full text-white font-montserrat font-semibold hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
