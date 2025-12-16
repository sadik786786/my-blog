'use client';
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  FaGoogle, 
  FaSignOutAlt, 
  FaPenFancy, 
  FaUserCircle,
  FaChevronDown,
  FaCompass,
  FaEdit,
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaChartLine
} from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleWriteBlog = () => {
    if (session) {
      router.push('/blogs/create');
    } else {
      signIn('google');
    }
  };

  const handleExploreArticles = () => {
    router.push('/blogs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 z-0 bg-[url('/img/background.png')] bg-cover bg-center bg-no-repeat opacity-20"
      />

      {/* Animated gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-6xl mx-auto w-full">
          {/* Welcome Message */}
          <div className={`mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Unleash Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Creative Voice
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Share your unique perspective with the world. Join thousands of writers 
              creating meaningful content every day.
            </p>
          </div>

          {/* User Profile Display & Action Buttons */}
          <div className="mb-16">
            {session ? (
              <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Left: User Profile */}
                <div className="flex-1 max-w-lg">
                  <div className="flex flex-col items-center lg:items-start space-y-6">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition duration-700"></div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50"></div>
                        <Image
                          src={session.user.image}
                          alt={session.user?.name || "User"}
                          height={90}
                          width={90}
                          className="relative w-40 h-40 rounded-full object-cover border-4 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="text-center lg:text-left">
                      <h2 className="text-3xl font-bold mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">{session.user?.name}</span>!
                      </h2>
                      <p className="text-gray-400 mb-6">{session.user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex-1 max-w-lg">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Ready to Create?
                      </h3>
                      <p className="text-gray-400 mb-8">
                        Start writing your next masterpiece or explore inspiring content from our community.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button
                        onClick={handleWriteBlog}
                        className="group relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                      >
                        <div className="absolute top-4 right-4 text-blue-400 group-hover:scale-110 transition-transform">
                          <FaArrowRight />
                        </div>
                        <div className="flex flex-col items-start text-left space-y-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <FaEdit className="text-2xl" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">Write Blog</h4>
                            <p className="text-gray-400 text-sm">
                              Create and publish your thoughts to the world
                            </p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={handleExploreArticles}
                        className="group relative bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                      >
                        <div className="absolute top-4 right-4 text-purple-400 group-hover:scale-110 transition-transform">
                          <FaArrowRight />
                        </div>
                        <div className="flex flex-col items-start text-left space-y-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                            <FaCompass className="text-2xl" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">Explore Articles</h4>
                            <p className="text-gray-400 text-sm">
                              Discover inspiring content from our community
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link 
                        href="/profile"
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600 px-6 py-3.5 rounded-xl transition-all duration-300 group"
                      >
                        <FaUserCircle />
                        <span>View Profile</span>
                      </Link>
                      <button
                        onClick={() => router.push('/blogs')}
                        className="flex-1 flex items-center justify-center space-x-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-500/50 text-green-300 px-6 py-3.5 rounded-xl transition-all duration-300 group"
                      >
                        <FaBookOpen />
                        <span>My Blogs</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex flex-col items-center space-y-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* User Icon */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50"></div>
                    <FaUserCircle className="relative text-[180px] text-gray-700" />
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Creative Community</span>
                  </h2>
                  <p className="text-lg text-gray-400 mb-10">
                    Sign in to start writing, share your stories, and explore thousands of articles from writers around the world.
                  </p>

                  {/* Action Buttons for Non-Signed In Users */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <button
                      onClick={() => signIn('google')}
                      className="group relative bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                          <FaEdit className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Start Writing</h4>
                          <p className="text-gray-400 text-sm">
                            Sign in to create your first blog post
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={handleExploreArticles}
                      className="group relative bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                          <FaCompass className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Explore Articles</h4>
                          <p className="text-gray-400 text-sm">
                            Read amazing content from our community
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <button
                    onClick={() => signIn('google')}
                    className="group relative inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 px-10 py-4 rounded-full font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
                  >
                    <FaGoogle className="text-xl" />
                    <span>Sign in with Google to Get Started</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className={`mt-20 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-3xl font-bold mb-12 text-center">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">MyBlog</span>?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/40 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 mb-6">
                  <FaBookOpen className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold mb-4">Rich Content Editor</h4>
                <p className="text-gray-400">
                  Write with our powerful editor featuring markdown, images, and code highlighting.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-6">
                  <FaUsers className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold mb-4">Vibrant Community</h4>
                <p className="text-gray-400">
                  Connect with thousands of writers and readers who share your passion.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8 hover:border-pink-400/40 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-pink-500 to-orange-600 mb-6">
                  <FaChartLine className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold mb-4">Insightful Analytics</h4>
                <p className="text-gray-400">
                  Track your readership and engagement with detailed analytics dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaChevronDown className="text-2xl text-gray-500" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 border-t border-white/10 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <FaBookOpen className="text-2xl text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                MyBlog
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help</Link>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MyBlog. All rights reserved.
            </p>
          </div>
          <p className="text-center text-gray-600 text-sm mt-8">
            Share your story with the world. One blog at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
