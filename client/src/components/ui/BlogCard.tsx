import { format } from "date-fns";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition border border-indigo-500/20 hover-glow">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-xs text-violet-300">
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </span>
          <span className="mx-2 text-violet-400">•</span>
          <span className="text-xs text-violet-300">{post.category}</span>
        </div>
        <h3 className="text-xl font-montserrat font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-violet-300 mb-4">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.id}`} 
          className="text-[#ffc83d] font-medium text-sm hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
