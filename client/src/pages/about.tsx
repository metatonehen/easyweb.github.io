import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

const About = () => {
  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <StarField count={100} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FlowerOfLife size={300} opacity={0.15} />
          </div>
          
          <div className="container mx-auto z-10 text-center max-w-4xl relative">
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                About NEO GAIAM
              </span>
            </h1>
            <p className="text-lg md:text-xl text-violet-300 mb-8 max-w-3xl mx-auto">
              A sanctuary of cosmic wisdom and transformation, dedicated to elevating consciousness through sacred geometry, astrology, and human design.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-montserrat font-bold mb-4">Our Story</h2>
                <p className="text-violet-300 mb-4">
                  NEO GAIAM was born from a profound spiritual awakening and a vision to create a platform where ancient wisdom meets modern understanding. 
                </p>
                <p className="text-violet-300 mb-4">
                  Our founder, after years of studying various esoteric traditions and experiencing firsthand the transformative power of cosmic knowledge, felt called to share these teachings with the world.
                </p>
                <p className="text-violet-300">
                  The name "NEO GAIAM" represents our mission: "NEO" for a new approach to ancient wisdom, and "GAIAM" honoring our connection to Earth (Gaia) and the greater universe.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1518715303843-586e350765b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Spiritual Retreat" 
                  className="rounded-lg shadow-lg object-cover w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-montserrat font-bold mb-4">Our Mission</h2>
              <p className="text-violet-300 max-w-3xl mx-auto">
                To guide individuals on their journey of spiritual awakening and self-discovery, providing tools and knowledge that bridge the gap between ancient wisdom and modern life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Empower</h3>
                <p className="text-violet-300">
                  We empower individuals to understand their unique cosmic blueprint and harness their inherent potential for growth and transformation.
                </p>
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Educate</h3>
                <p className="text-violet-300">
                  Through our courses and resources, we share esoteric knowledge in a practical, accessible way that can be integrated into everyday life.
                </p>
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <div className="w-12 h-12 rounded-full bg-[#ffc83d] flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">Connect</h3>
                <p className="text-violet-300">
                  We foster a community of like-minded individuals who support each other on their journey of spiritual growth and cosmic understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-montserrat font-bold mb-12 text-center">Our Cosmic Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Elena Rodriguez" 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-1">Elena Rodriguez</h3>
                  <p className="text-[#ffc83d] mb-3">Founder & Astrologer</p>
                  <p className="text-violet-300 text-sm mb-4">
                    With over 15 years of experience in astrology and cosmic studies, Elena founded NEO GAIAM to share ancient wisdom with the modern world.
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Marcus Chen" 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-1">Marcus Chen</h3>
                  <p className="text-[#ffc83d] mb-3">Human Design Analyst</p>
                  <p className="text-violet-300 text-sm mb-4">
                    Marcus specializes in Human Design readings that help individuals understand their energetic blueprint and make decisions aligned with their true nature.
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-1">Sarah Johnson</h3>
                  <p className="text-[#ffc83d] mb-3">Spiritual Coach & Healer</p>
                  <p className="text-violet-300 text-sm mb-4">
                    Sarah facilitates transformative healing sessions and retreats, combining sacred geometry principles with energy work for deep spiritual transformation.
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-violet-300 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-montserrat font-bold mb-12 text-center">What Our Community Says</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ffc83d] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                <p className="text-violet-200 italic mb-6">
                  "NEO GAIAM has transformed my understanding of myself and my place in the universe. The Human Design reading was incredibly accurate and has helped me make decisions that feel right for me."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold">Maya Thompson</h4>
                    <p className="text-xs text-violet-300">Human Design Client</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ffc83d] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                <p className="text-violet-200 italic mb-6">
                  "The Abundance & Cosmic Flow course completely shifted my relationship with money. I've implemented the practices daily and seen remarkable changes in my financial situation within just two months."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold">David Williams</h4>
                    <p className="text-xs text-violet-300">Course Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-montserrat font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">What is NEO GAIAM?</h3>
                <p className="text-violet-300">
                  NEO GAIAM is a platform dedicated to sharing cosmic wisdom and spiritual teachings through online courses, personalized sessions, and community events. We focus on astrology, human design, sacred geometry, and various spiritual practices.
                </p>
              </div>
              
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">Do I need prior knowledge to take your courses?</h3>
                <p className="text-violet-300">
                  No prior knowledge is necessary. Our courses are designed to be accessible to beginners while also providing depth for those with experience. Each course includes foundational knowledge and builds progressively.
                </p>
              </div>
              
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">How do I book a personal session?</h3>
                <p className="text-violet-300">
                  You can book a personal session through our Services page. Select the type of session you're interested in, choose an available date and time, and complete the booking process. You'll receive a confirmation email with details about your session.
                </p>
              </div>
              
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">What is Human Design and how can it help me?</h3>
                <p className="text-violet-300">
                  Human Design is a system that combines ancient wisdom traditions with modern science to provide a map of your energetic makeup. It helps you understand your unique decision-making strategy, strengths, and potential challenges, enabling you to live more authentically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 relative overflow-hidden">
          <StarField count={50} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FlowerOfLife size={300} opacity={0.1} />
          </div>
          
          <div className="container mx-auto max-w-3xl relative z-10">
            <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 md:p-12 border border-indigo-500/30 text-center">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Begin Your Cosmic Journey</h2>
              <p className="text-violet-300 mb-8">
                Connect with your higher self, unlock your cosmic potential, and transform your life with NEO GAIAM's courses and services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/courses" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full text-white font-montserrat font-semibold hover:from-indigo-500 hover:to-violet-400 transition shadow-lg hover:shadow-xl hover-glow">
                  Explore Courses
                </Link>
                <Link href="/services" className="px-8 py-4 bg-indigo-800/50 border border-violet-400/30 rounded-full text-white font-montserrat font-semibold hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
                  Book a Session
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

export default About;
