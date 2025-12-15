'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  FaSearch, 
  FaCalendar, 
  FaUser, 
  FaArrowRight,
  FaBookOpen,
  FaClock,
  FaNewspaper,
  FaEdit,
  FaSun,
  FaMoon
} from 'react-icons/fa';

export default function Blogs() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [theme, setTheme] = useState('dark'); // Default to dark

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const d = await response.json();
      const {data} = await d;
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const calculateReadTime = (content) => {
    if (!content) return '1 min read';
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const filteredBlogs = blogs
    .filter(blog => {
      if (search && !blog.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading blog posts...</p>
              <p className="text-gray-400 text-sm mt-2">Fetching the latest articles</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 border-b border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-indigo-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                 Blogs
              </h1>
            </div>
            
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {filteredBlogs.length} posts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header with Count and View Toggle */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    All Posts <span className="text-blue-400">({filteredBlogs.length})</span>
                  </h2>
                  <p className="text-gray-400">Browse through our collection of articles</p>
                </div>
                
                <div className="flex gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-gray-700 shadow-sm text-blue-400' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      title="Grid View"
                    >
                      <div className="grid grid-cols-2 gap-1 w-6 h-6">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="bg-current rounded-sm"></div>
                        ))}
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'list' 
                          ? 'bg-gray-700 shadow-sm text-blue-400' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      title="List View"
                    >
                      <div className="flex flex-col gap-1 w-6 h-6">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="bg-current h-1 rounded-sm"></div>
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid/List */}
            {filteredBlogs.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-12 text-center">
                <FaNewspaper className="text-5xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No blog posts found</h3>
                <p className="text-gray-400 mb-6">
                  {search 
                    ? `No posts found for "${search}"` 
                    : 'No blog posts available yet'
                  }
                </p>
                <button
                  onClick={() => setSearch('')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                >
                  Clear Search
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map(blog => (
                  <article 
                    key={blog.id}
                    className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.thumbnail ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                          style={{ backgroundImage: `url(${blog.thumbnail})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
                        </div>
                      )}
                      {/* Date Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-gray-900/80 backdrop-blur-sm text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700">
                          {formatDate(blog.created_at).split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <span className="flex items-center mr-4">
                          <FaCalendar className="mr-2 text-blue-400" />
                          {formatDate(blog.created_at)}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-2 text-purple-400" />
                          {calculateReadTime(blog.content)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {blog.content}
                      </p>

                      {/* Author and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                              {blog.author_name ? blog.author_name.charAt(0) : 'U'}
                            </div>
                            <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {blog.author_name || 'Anonymous'}
                            </p>
                            <p className="text-xs text-gray-500">Author</p>
                          </div>
                        </div>
                        
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group/link"
                        >
                          Read
                          <FaArrowRight className="text-sm group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-6">
                {filteredBlogs.map(blog => (
                  <article 
                    key={blog.id}
                    className="group bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                  >
                    <div className="md:flex">
                      {/* Thumbnail */}
                      <div className="md:w-64 md:flex-shrink-0">
                        <div className="h-48 md:h-full relative overflow-hidden">
                          {blog.thumbnail ? (
                            <div 
                              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                              style={{ backgroundImage: `url(${blog.thumbnail})` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent"></div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                          )}
                          {/* List view date badge */}
                          <div className="absolute bottom-3 left-3">
                            <span className="bg-gray-900/80 backdrop-blur-sm text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700">
                              {formatDate(blog.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1">
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="flex items-center text-sm text-gray-400 mb-4">
                              <span className="flex items-center mr-4 bg-gray-900/50 px-3 py-1 rounded-full">
                                <FaClock className="mr-2 text-purple-400" />
                                {calculateReadTime(blog.content)}
                              </span>
                              {blog.category && (
                                <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs">
                                  {blog.category}
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                              {blog.title}
                            </h3>
                            
                            <p className="text-gray-400 mb-6 line-clamp-2">
                              {blog.content}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-700">
                            <div className="flex items-center">
                              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                                {blog.author_name ? blog.author_name.charAt(0) : 'U'}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {blog.author_name || 'Anonymous'}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Published {formatDate(blog.created_at)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Link
                                href={`/blogs/${blog.slug}`}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-all group/btn"
                              >
                                Read Article
                                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredBlogs.length > 9 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center text-white hover:scale-105">
                    1
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all flex items-center justify-center text-gray-400 hover:text-white">
                    2
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all flex items-center justify-center text-gray-400 hover:text-white">
                    3
                  </button>
                  <span className="px-2 text-gray-600">•••</span>
                  <button className="w-12 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all flex items-center justify-center text-gray-400 hover:text-white">
                    10
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center text-white group">
                    →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Write Blog Button */}
            {session && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBookOpen className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Write a Post</h3>
                  <p className="text-gray-400 mb-5">Share your knowledge with the community</p>
                  <Link
                    href="/blogs/create"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <FaEdit className="mr-2" />
                    Create Post
                  </Link>
                </div>
              </div>
            )}

            {/* Recent Posts */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">
                  Recent Posts
                </h3>
                <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                  Latest
                </span>
              </div>
              <div className="space-y-4">
                {blogs.slice(0, 5).map((blog, index) => (
                  <Link 
                    key={blog.id} 
                    href={`/blogs/${blog.slug}`}
                    className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-700/50 transition-all border border-transparent hover:border-gray-600"
                  >
                    <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent w-6 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                        {blog.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <FaClock className="mr-1 text-gray-600" />
                        {calculateReadTime(blog.content)}
                      </div>
                    </div>
                    <FaArrowRight className="text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-800 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                 Blogs
              </h3>
              <p className="text-gray-500 text-sm mt-1">Thoughts in the dark</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Dark Blog Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}