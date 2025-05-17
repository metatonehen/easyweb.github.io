import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import BlogCard from "../ui/BlogCard";
import { BlogPost } from "@shared/schema";

const BlogPreviewSection: React.FC = () => {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/recent'],
  });

  return (
    <section id="blog" className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">Cosmic Insights</h2>
        <p className="text-lg max-w-2xl mx-auto text-violet-300">
          Dive into our collection of wisdom on astrology, human design, and spiritual growth.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
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
        ) : (
          blogPosts?.map(post => (
            <BlogCard key={post.id} post={post} />
          ))
        )}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-indigo-800/50 border border-indigo-400/30 rounded-full text-white font-montserrat font-medium hover:bg-indigo-700/70 transition shadow-lg hover:shadow-xl hover-glow">
          Explore All Articles
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
