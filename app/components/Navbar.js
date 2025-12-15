'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  FaGoogle, 
  FaSignOutAlt, 
  FaBlog, 
  FaEdit,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaBook,
  FaEnvelope
} from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/blogs", label: "Blogs", icon: <FaBook /> },
    { href: "/profile", label: "Profile", icon: <FaUser /> },
    { href: "/help", label: "Help", icon: <FaEnvelope /> },
  ];

  const getNavLinkClass = (href) => {
    const isActive = pathname === href;
    return isActive 
      ? "text-white" 
      : "text-gray-300 hover:text-white";
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/95 backdrop-blur-lg py-4 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <FaBlog className="relative text-3xl text-blue-400" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MyBlog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <span className={`flex items-center space-x-2 transition-colors duration-300 ${getNavLinkClass(link.href)}`}>
                    <span className="text-sm">{link.icon}</span>
                    <span>{link.label}</span>
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                    pathname === link.href ? 'w-full' : ''
                  } bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300`}></span>
                </Link>
              ))}
            </div>
            
            {session ? (
              <div className="flex items-center space-x-6">
                <Link 
                  href="/blogs/create"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <FaEdit />
                  <span>Write Blog</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2.5 rounded-lg transition-all duration-300 group"
                  >
                    <FaSignOutAlt className="group-hover:rotate-180 transition-transform duration-300" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <FaGoogle />
                <span>Get Started</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-gray-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 animate-slideDown">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 py-2 transition-colors ${getNavLinkClass(link.href)}`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-700">
                {session ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <img
                        src={session.user.image}
                        alt={session.user?.name || "User"}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{session.user?.name}</p>
                        <p className="text-sm text-gray-400 truncate">{session.user?.email}</p>
                      </div>
                    </div>
                    <Link 
                        href="/createPost"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-3 rounded-lg font-medium transition-all"
                    >
                      <FaEdit />
                      <span>Write Blog</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-3 rounded-lg transition-all"
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => signIn('google')}
                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-4 py-3 rounded-lg font-medium transition-all w-full"
                  >
                    <FaGoogle />
                    <span>Sign in with Google</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}