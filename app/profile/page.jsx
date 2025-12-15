'use client';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaBook, 
  FaNewspaper, 
  FaChartLine, 
  FaShareAlt,
  FaFacebook, 
  FaTwitter, 
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaCog,
  FaChevronRight,
  FaExternalLinkAlt,
  FaPlus,
  FaListUl,
  FaThLarge,
  FaFilter
} from "react-icons/fa";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  });

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadProfileData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/profile/${session.user.email}`,{method:'GET'});
        const data = await res.json();
        if (Array.isArray(data) && data.length >= 2) {
          setUserData(data[0]);
          setPosts(data[1]);
          
          // Calculate statistics
          const total = data[1].length;
          const published = data[1].filter(post => post.status === 'published').length;
          const drafts = data[1].filter(post => post.status === 'draft').length;
          
          setStats({
            totalPosts: total,
            publishedPosts: published,
            draftPosts: drafts,
            totalViews: data[1].reduce((sum, post) => sum + (post.views || 0), 0)
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, [session]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">Published</span>;
      case 'draft':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Draft</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">{status}</span>;
    }
  };

  const handleEditPost = (postId) => {
    router.push(`/blogs/edit/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res =  await fetch(`/api/posts/${postId}`, {
           method: "DELETE",
          });

        
        if (res.ok) {
          setPosts(posts.filter(post => post.id !== postId));
          // Update stats
          setStats(prev => ({
            ...prev,
            totalPosts: prev.totalPosts - 1
          }));
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filterStatus === 'all') return true;
    return post.status === filterStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-gray-400 mb-8">Unable to load profile data. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      {/* Background overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info & Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                    <Image
          src={session.user.image}
          alt="User Image"
          width={125}
          height={125}
          className="rounded-full"
        />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                <p className="text-gray-400 mb-4">{userData.email}</p>
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <FaCalendarAlt />
                  <span>Joined {formatDate(userData.created_at)}</span>
                </div>
              </div>
              

              {/* Quick Actions */}
              <div className="space-y-3">
                <Link
                  href="/blogs/create"
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/30 hover:border-blue-400/50 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <FaPlus className="text-blue-400" />
                    <span>Create New Post</span>
                  </div>
                  <FaChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaChartLine className="mr-2 text-blue-400" />
                Your Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.totalPosts}</div>
                  <div className="text-sm text-gray-400">Total Posts</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{stats.publishedPosts}</div>
                  <div className="text-sm text-gray-400">Published</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.draftPosts}</div>
                  <div className="text-sm text-gray-400">Drafts</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">{stats.totalViews}</div>
                  <div className="text-sm text-gray-400">Total Views</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Blog Posts */}
          <div className="lg:col-span-2">
            {/* Posts Header */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center">
                    <FaNewspaper className="mr-2 text-purple-400" />
                    Your Blog Posts
                  </h2>
                  <p className="text-gray-400">
                    {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-800/50 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      <FaListUl />
                    </button>
                  </div>

                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 appearance-none pr-10 focus:outline-none focus:border-blue-500/50"
                    >
                      <option value="all">All Posts</option>
                      <option value="published">Published</option>
                      <option value="draft">Drafts</option>
                    </select>
                    <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <Link
                    href="/blogs/create"
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <FaPlus />
                    <span>New Post</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Posts Grid/List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center">
                <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No posts found</h3>
                <p className="text-gray-400 mb-6">Start writing your first blog post to share with the world.</p>
                <Link
                  href="/blogs/create"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <FaPlus />
                  <span>Create Your First Post</span>
                </Link>
              </div>
            ) : viewMode === 'grid' ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaBook className="text-6xl text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(post.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">
                          {formatDate(post.created_at)}
                        </span>
                        {post.updated_at !== post.created_at && (
                          <span className="text-xs text-gray-500">Edited</span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditPost(post.id)}
                            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <FaEdit />
                            <span className="text-sm">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors ml-4"
                          >
                            <FaTrash />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                        
                        <Link
                          href={`/blogs/${post.id}`}
                          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <span className="text-sm">Read</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Thumbnail */}
                      <div className="md:w-40 md:flex-shrink-0">
                        <div className="relative h-40 md:h-28 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                          {post.thumbnail ? (
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaBook className="text-4xl text-gray-600" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold">{post.title}</h3>
                              {getStatusBadge(post.status)}
                            </div>
                            <p className="text-sm text-gray-400 mb-3">
                              Created {formatDate(post.created_at)}
                              {post.updated_at !== post.created_at && (
                                <span className="ml-2">• Edited</span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleEditPost(post.id)}
                              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                            >
                              <FaTrash />
                              <span>Delete</span>
                            </button>
                            <Link
                              href={`/blogs/${post.slug}`}
                              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                              <FaExternalLinkAlt />
                              <span>View</span>
                            </Link>
                          </div>
                          
                          {post.status === 'published' && (
                            <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors text-sm">
                              <FaEye />
                              <span>123 views</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4 py-8 mt-12 border-t border-gray-800/50">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
          <p className="mt-2">Profile last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}