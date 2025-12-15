'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiEdit, FiEye, FiShare2, FiUser, FiArrowLeft } from 'react-icons/fi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

export default function BlogPage() {
  const { data: session } = useSession();
  const params = useParams();
  const { id } = params; // Note: This is actually the slug from the URL
  
  const router = useRouter();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${id}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      
      const data = await response.json();
      console.log(data.result[0])
      if (!data.success) {
        throw new Error(data.message || 'Post not found');
      }
      
      setBlog(data.result[0]);
      
      // Calculate reading time
      if (data.post?.content) {
        const words = data.post.content.split(/\s+/).length;
        const time = Math.ceil(words / 200); // 200 words per minute
        setReadingTime(time);
      }
      
      // Simulate view count
      setViewCount(Math.floor(Math.random() * 1000) + 100);
      
    } catch (error) {
      console.error('Error fetching blog:', error);
      router.push('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.content?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Skeleton Loader */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-700 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get the actual blog data (handle both response structures)
  const postData = blog.post || blog;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/blogs" 
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Blogs
            </Link>
            
            <div className="flex items-center space-x-4">
              {session?.user?.id === postData.user_id && (
                <Link
                  href={`/blogs/edit/${postData.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm"
                >
                  <FiEdit className="mr-2" />
                  Edit
                </Link>
              )}
              
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm"
              >
                <FiShare2 className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="mb-12">
          {/* Category & Status */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm ${postData.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                {postData.status === 'published' ? 'Published' : 'Draft'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400 text-sm">Blog</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {postData.title}
          </h1>

          {/* Author & Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-400">
            <div className="flex items-center">
              <FiUser className="mr-2" />
              <span>By User #{postData.user_id}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <time dateTime={postData.created_at}>
                {formatDate(postData.created_at)}
              </time>
              {postData.updated_at !== postData.created_at && (
                <span className="ml-2 text-sm">(Updated: {formatDate(postData.updated_at)})</span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {postData.thumbnail && (
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10">
              <Image
                src={postData.thumbnail}
                alt={postData.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-invert">
            <div className="whitespace-pre-wrap leading-relaxed text-lg text-gray-300">
              {postData.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-3 z-40">
        <button
          onClick={handleShare}
          className="p-3 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg"
          title="Share"
        >
          <FiShare2 size={20} />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-700/50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Read more interesting articles on our blog
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Explore All Posts
          </Link>
        </div>
      </footer>
    </div>
  );
}