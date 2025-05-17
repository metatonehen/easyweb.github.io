import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CourseCubeSection from "@/components/home/CourseCubeSection";
import ServicesCubeSection from "@/components/home/ServicesCubeSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden">
      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950">
          <div className="relative w-[300px] h-[300px] opacity-15 animate-pulse-slow">
            <FlowerOfLife size={300} opacity={0.6} />
          </div>
          <h1 className="text-4xl font-montserrat font-bold absolute text-white">NEO GAIAM</h1>
        </div>
      )}

      <Header />
      <main>
        <HeroSection />
        <CourseCubeSection />
        <ServicesCubeSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <UpcomingEventsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

// Helper component for the preloader
const FlowerOfLife = ({ size, opacity }: { size: number, opacity: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M150,150 m0,-130 a130,130 0 1,0 0,260 a130,130 0 1,0 0,-260 M150,150 m0,-86.6 a86.6,86.6 0 1,0 0,173.2 a86.6,86.6 0 1,0 0,-173.2 M150,150 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6 M150,63.4 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6 M150,236.6 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6 M93.3,106.7 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6 M206.7,106.7 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6 M93.3,193.3 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6 M206.7,193.3 m0,-43.3 a43.3,43.3 0 1,0 0,86.6 a43.3,43.3 0 1,0 0,-86.6"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
    </svg>
  );
};

export default Home;
