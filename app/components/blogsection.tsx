import React from 'react';
import Link from 'next/link';

interface BlogPost {
  title: string;
  author: string;
  url: string;
}

interface BlogsSectionProps {
  posts: BlogPost[];
  featuredPost: BlogPost;
}

const BlogsSection: React.FC<BlogsSectionProps> = ({ posts, featuredPost }) => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured Blog Post (Left Side) */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-xl shadow-md overflow-hidden relative h-full">
              {/* Tilted overlapping shapes */}
              <div className="absolute top-4 left-4 w-24 h-24 bg-gray-200 transform rotate-12 rounded-lg"></div>
              <div className="absolute top-6 left-6 w-24 h-24 bg-gray-300 transform -rotate-6 rounded-lg"></div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  {featuredPost.title}
                </h2>
                
                {/* Abstract Graphic */}
                <div className="relative mt-12">
                  <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-300 transform rotate-45"></div>
                  </div>
                </div>
                
                {/* Black circles at bottom */}
                <div className="flex gap-2 mt-16">
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                </div>
              </div>
            </article>
          </div>
          
          {/* Blog List (Right Side) */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Blogs</h2>
            
            <div className="space-y-6">
              {posts.map((post, index) => (
                <article key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                    <Link href={post.url} className="flex justify-between items-start">
                      <span>{post.title}</span>
                      <span className="text-sm font-normal text-gray-500 ml-2">View →</span>
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">A blog by {post.author}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Example usage with sample data
const samplePosts: BlogPost[] = [
  {
    title: "The Future of Web Development",
    author: "Sarah Johnson",
    url: "#"
  },
  {
    title: "Understanding TypeScript Generics",
    author: "Michael Chen",
    url: "#"
  },
  {
    title: "CSS Grid vs Flexbox",
    author: "Emma Davis",
    url: "#"
  },
  {
    title: "React Performance Optimization",
    author: "David Wilson",
    url: "#"
  }
];

const sampleFeaturedPost: BlogPost = {
  title: "From Code to Cure: Big Tech in Healthcare",
  author: "Dr. Alan Smith",
  url: "#"
};

export default function Page() {
  return <BlogsSection posts={samplePosts} featuredPost={sampleFeaturedPost} />;
}