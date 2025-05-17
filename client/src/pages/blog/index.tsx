import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import BlogCard from "@/components/ui/BlogCard";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { BlogPost } from "@shared/schema";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [category, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // Filter blog posts based on category and search query
  const filteredPosts = blogPosts?.filter(post => {
    const matchesCategory = category === "all" || post.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
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
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                Cosmic Insights
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              Explore our collection of wisdom on astrology, human design, and spiritual growth to illuminate your path.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-indigo-900/50 border-indigo-500/30 pl-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Category Filter */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <CategoryButton 
                name="all" 
                label="All Topics" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-indigo-600"
              />
              <CategoryButton 
                name="astrology" 
                label="Astrology" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-purple-500"
              />
              <CategoryButton 
                name="human design" 
                label="Human Design" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-amber-500"
              />
              <CategoryButton 
                name="sacred geometry" 
                label="Sacred Geometry" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-teal-500"
              />
              <CategoryButton 
                name="meditation" 
                label="Meditation" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-blue-500"
              />
              <CategoryButton 
                name="spirituality" 
                label="Spirituality" 
                activeCategory={category} 
                setCategory={setCategory} 
                color="bg-violet-500"
              />
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {isLoading ? (
                // Loading skeleton
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-indigo-500/20">
                    <div className="h-48 bg-indigo-800/50 animate-pulse"></div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-20 mr-2"></div>
                        <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-4 mx-2"></div>
                        <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-20"></div>
                      </div>
                      <div className="h-6 bg-indigo-800/50 animate-pulse rounded w-full mb-2"></div>
                      <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-full mb-1"></div>
                      <div className="h-4 bg-indigo-800/50 animate-pulse rounded w-3/4 mb-4"></div>
                      <div className="h-5 bg-indigo-800/50 animate-pulse rounded w-24"></div>
                    </div>
                  </div>
                ))
              ) : filteredPosts?.length ? (
                filteredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-violet-300 text-lg">No articles found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-20 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-12 text-center">Featured Article</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Featured Article" 
                  className="rounded-lg shadow-lg object-cover w-full h-[400px]"
                />
              </div>
              <div>
                <span className="text-[#ffc83d] uppercase text-sm font-medium mb-2 block">Featured</span>
                <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">The Lyra Constellation: Your Cosmic Origins</h3>
                <p className="text-violet-300 mb-6">
                  Explore the ancient wisdom connecting human consciousness to the Lyra star system and what it means for your spiritual journey. Discover how this distant constellation holds the keys to understanding your soul's purpose.
                </p>
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Author" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">By Alex Winters</p>
                    <p className="text-xs text-violet-300">June 15, 2023 • 8 min read</p>
                  </div>
                </div>
                <a 
                  href="/blog/1" 
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-montserrat font-medium transition"
                >
                  Read Full Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 md:p-12 border border-indigo-500/30">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Stay Connected with Cosmic Wisdom</h2>
              <p className="text-violet-300 mb-8">
                Subscribe to our newsletter and receive the latest insights, guided meditations, and exclusive content.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow bg-indigo-900/50 border-indigo-500/30"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 rounded-full px-6 py-2 text-white font-montserrat font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-violet-300 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

type CategoryButtonProps = {
  name: string;
  label: string;
  activeCategory: string;
  setCategory: (category: string) => void;
  color: string;
};

const CategoryButton = ({ name, label, activeCategory, setCategory, color }: CategoryButtonProps) => {
  const isActive = activeCategory === name;

  return (
    <button
      onClick={() => setCategory(name)}
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

export default Blog;
