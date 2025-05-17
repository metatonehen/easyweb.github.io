import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { BlogPost } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

const BlogPostPage = () => {
  const { id } = useParams();
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${id}`],
  });

  if (isLoading) {
    return (
      <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-indigo-800/50 w-3/4 rounded mb-2"></div>
              <div className="h-4 bg-indigo-800/50 w-1/2 rounded mb-8"></div>
              <div className="h-64 bg-indigo-800/50 rounded-lg mb-8"></div>
              <div className="h-4 bg-indigo-800/50 w-full rounded mb-2"></div>
              <div className="h-4 bg-indigo-800/50 w-full rounded mb-2"></div>
              <div className="h-4 bg-indigo-800/50 w-3/4 rounded mb-6"></div>
              <div className="h-4 bg-indigo-800/50 w-full rounded mb-2"></div>
              <div className="h-4 bg-indigo-800/50 w-full rounded mb-2"></div>
              <div className="h-4 bg-indigo-800/50 w-full rounded mb-2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Article Not Found</h1>
            <p className="text-violet-300 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-montserrat font-medium transition">
              Browse All Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        {/* Article Header */}
        <section className="relative py-16 px-4 mb-8 overflow-hidden">
          <StarField count={70} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FlowerOfLife size={300} opacity={0.1} />
          </div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-violet-300 hover:text-white transition mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Articles
            </Link>
            
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-indigo-600 text-white mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">{post.title}</h1>
              <div className="flex items-center mb-8">
                <img 
                  src={post.author.avatarUrl} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">By {post.author.name}</p>
                  <p className="text-xs text-violet-300">
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")} • {post.readingTime} min read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Featured Image */}
        <section className="px-4 mb-12">
          <div className="container mx-auto max-w-4xl">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl font-medium mb-6 text-violet-300">
                {post.excerpt}
              </p>
              
              {post.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.heading && (
                    <h2 className="text-2xl font-montserrat font-bold mb-4">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 text-violet-200">{paragraph}</p>
                  ))}
                </div>
              ))}
              
              {post.quote && (
                <blockquote className="border-l-4 border-[#ffc83d] pl-6 py-2 my-8 bg-indigo-900/50 rounded-r-lg pr-6">
                  <p className="text-xl italic text-violet-200">{post.quote.text}</p>
                  {post.quote.author && (
                    <cite className="block text-sm text-violet-300 mt-2">— {post.quote.author}</cite>
                  )}
                </blockquote>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-indigo-900/70 rounded-full text-xs text-violet-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-12 bg-indigo-500/20" />

            {/* Author Bio */}
            <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 mb-12">
              <div className="flex items-start">
                <img 
                  src={post.author.avatarUrl} 
                  alt={post.author.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-montserrat font-semibold mb-1">About {post.author.name}</h3>
                  <p className="text-sm text-violet-300 mb-3">{post.author.title}</p>
                  <p className="text-sm text-violet-200">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mb-12">
              <h3 className="text-2xl font-montserrat font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Related Article" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-montserrat font-semibold mb-2">Human Design: The 5 Energy Types Explained</h4>
                    <a href="/blog/2" className="text-[#ffc83d] text-sm hover:underline">Read More →</a>
                  </div>
                </div>
                <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="Related Article" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-montserrat font-semibold mb-2">The Hidden Power of Metatron's Cube</h4>
                    <a href="/blog/3" className="text-[#ffc83d] text-sm hover:underline">Read More →</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments - Could be implemented with actual comments if needed */}
            <div>
              <h3 className="text-2xl font-montserrat font-bold mb-6">Join the Conversation</h3>
              <p className="text-violet-300 mb-4">Share your thoughts on this article</p>
              
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 mb-6">
                <textarea 
                  placeholder="Write your comment..." 
                  className="w-full min-h-[120px] rounded-md border border-indigo-500/30 bg-indigo-900/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                />
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-montserrat font-medium transition">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
