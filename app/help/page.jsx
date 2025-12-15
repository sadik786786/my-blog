'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaQuestionCircle, 
  FaBook, 
  FaEdit, 
  FaEye, 
  FaUser, 
  FaSearch, 
  FaComment,
  FaShareAlt,
  FaCog,
  FaBell,
  FaLock,
  FaRocket,
  FaChevronDown,
  FaChevronRight,
  FaUsers,
  FaChartLine,
  FaTag,
  FaBookmark,
  FaDownload,
  FaMobileAlt,
  FaDesktop,
  FaGlobe,
  FaCheckCircle,
  FaStar,
  FaMoon,
  FaSun
} from 'react-icons/fa';

export default function Help() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [theme, setTheme] = useState('dark');

  const faqs = [
    {
      question: 'How do I create my first blog post?',
      answer: 'Click on "Write Blog" in the navigation bar or the "Create New Post" button on your profile page. You\'ll be taken to an editor where you can write, add images, and format your content.'
    },
    {
      question: 'Can I save my post as a draft?',
      answer: 'Yes! When creating a post, you can save it as a draft. Drafts are only visible to you and can be published later from your profile page.'
    },
    {
      question: 'How do I edit my published posts?',
      answer: 'Go to your profile page, find the post you want to edit, and click the edit button. Make your changes and save them.'
    },
    {
      question: 'Is there a limit to how many posts I can create?',
      answer: 'No, there are no limits! You can create as many blog posts as you want.'
    },
    {
      question: 'Can I delete my blog posts?',
      answer: 'Yes, you can delete any of your posts from your profile page. This action is permanent and cannot be undone.'
    }
  ];

  const features = [
    {
      icon: <FaEdit className="text-2xl text-blue-400" />,
      title: 'Create Beautiful Posts',
      description: 'Write and format your blog posts with our rich editor. Add images, format text, and create engaging content.'
    },
    {
      icon: <FaEye className="text-2xl text-green-400" />,
      title: 'Read & Discover',
      description: 'Browse thousands of articles from other writers. Use search and filters to find content you love.'
    },
    {
      icon: <FaUser className="text-2xl text-purple-400" />,
      title: 'Personal Profile',
      description: 'Create your public profile, showcase your work, and build your reputation as a writer.'
    },
    {
      icon: <FaComment className="text-2xl text-cyan-400" />,
      title: 'Engage & Comment',
      description: 'Leave thoughtful comments on posts. Start meaningful discussions with other writers.'
    },
    {
      icon: <FaChartLine className="text-2xl text-orange-400" />,
      title: 'Track Performance',
      description: 'See how your posts are performing with detailed analytics on your profile dashboard.'
    },
    {
      icon: <FaMobileAlt className="text-2xl text-indigo-400" />,
      title: 'Mobile Friendly',
      description: 'Access our platform from any device. Our responsive design works perfectly on mobile, tablet, and desktop.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your account using Google authentication',
      icon: <FaUser />
    },
    {
      number: '02',
      title: 'Create Profile',
      description: 'Set up your public profile with bio and social links',
      icon: <FaCog />
    },
    {
      number: '03',
      title: 'Write First Post',
      description: 'Start writing your first blog post using our editor',
      icon: <FaEdit />
    },
    {
      number: '04',
      title: 'Publish & Share',
      description: 'Publish your post and share it with the community',
      icon: <FaShareAlt />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 border-b border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-indigo-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Help Center
              </h1>
            </div>
            
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <FaBook className="mr-2 text-blue-400" />
                Help Topics
              </h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('getting-started')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeSection === 'getting-started'
                      ? 'bg-gray-700 text-blue-400 border border-gray-600'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <FaRocket className="mr-3" />
                    <span>Getting Started</span>
                  </div>
                  <FaChevronRight className="text-sm" />
                </button>

                <button
                  onClick={() => setActiveSection('writing-blogs')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeSection === 'writing-blogs'
                      ? 'bg-gray-700 text-blue-400 border border-gray-600'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <FaEdit className="mr-3" />
                    <span>Writing Blogs</span>
                  </div>
                  <FaChevronRight className="text-sm" />
                </button>

                <button
                  onClick={() => setActiveSection('reading-blogs')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeSection === 'reading-blogs'
                      ? 'bg-gray-700 text-blue-400 border border-gray-600'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <FaEye className="mr-3" />
                    <span>Reading Blogs</span>
                  </div>
                  <FaChevronRight className="text-sm" />
                </button>

                <button
                  onClick={() => setActiveSection('profile-management')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeSection === 'profile-management'
                      ? 'bg-gray-700 text-blue-400 border border-gray-600'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-3" />
                    <span>Profile Management</span>
                  </div>
                  <FaChevronRight className="text-sm" />
                </button>

                <button
                  onClick={() => setActiveSection('faq')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeSection === 'faq'
                      ? 'bg-gray-700 text-blue-400 border border-gray-600'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <FaQuestionCircle className="mr-3" />
                    <span>FAQs</span>
                  </div>
                  <FaChevronRight className="text-sm" />
                </button>
              </nav>
            </div>

            {/* Quick Help Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-4">Need Quick Help?</h3>
              <p className="text-gray-400 mb-4">Can't find what you're looking for?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:opacity-90 transition-all w-full justify-center hover:shadow-lg hover:shadow-blue-500/20"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Getting Started Section */}
            {activeSection === 'getting-started' && (
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FaRocket className="mr-3 text-blue-400" />
                    Getting Started Guide
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Welcome to our blog platform! Whether you're here to share your thoughts or discover amazing content,
                    this guide will help you get started.
                  </p>

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {steps.map((step, index) => (
                      <div key={index} className="text-center group">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                          {step.number}
                        </div>
                        <div className="text-blue-400 text-2xl mb-3 flex justify-center group-hover:text-blue-300">
                          {step.icon}
                        </div>
                        <h3 className="font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <FaStar className="mr-2 text-yellow-400" />
                      Pro Tip
                    </h3>
                    <p className="text-gray-300">
                      Complete your profile first! A complete profile helps other readers connect with you and
                      makes your posts more engaging. Add a profile picture, bio, and social links.
                    </p>
                  </div>
                </div>

                {/* Platform Features */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">Platform Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Writing Blogs Section */}
            {activeSection === 'writing-blogs' && (
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FaEdit className="mr-3 text-green-400" />
                    Writing & Publishing Blogs
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-4">Creating Your First Post</h3>
                      <ol className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                          <div>
                            <p className="font-medium text-white">Click "Write Blog" button</p>
                            <p className="text-gray-400 text-sm">Available in the navigation bar or on your profile</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                          <div>
                            <p className="font-medium text-white">Write your content</p>
                            <p className="text-gray-400 text-sm">Use our rich text editor to format your post</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                          <div>
                            <p className="font-medium text-white">Add images and tags</p>
                            <p className="text-gray-400 text-sm">Upload images and add relevant tags for better visibility</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3 mt-1">4</div>
                          <div>
                            <p className="font-medium text-white">Publish or save as draft</p>
                            <p className="text-gray-400 text-sm">Publish immediately or save as draft to edit later</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-white mb-3 flex items-center">
                          <FaBookmark className="mr-2 text-blue-400" />
                          Writing Tips
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Write clear and concise titles</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Use headings to organize content</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Add images to make posts engaging</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Proofread before publishing</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-white mb-3 flex items-center">
                          <FaTag className="mr-2 text-purple-400" />
                          Best Practices
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaStar className="text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Use relevant tags for better discovery</span>
                          </li>
                          <li className="flex items-start">
                            <FaStar className="text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Engage with comments on your posts</span>
                          </li>
                          <li className="flex items-start">
                            <FaStar className="text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Share your posts on social media</span>
                          </li>
                          <li className="flex items-start">
                            <FaStar className="text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Update old posts to keep them relevant</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reading Blogs Section */}
            {activeSection === 'reading-blogs' && (
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FaEye className="mr-3 text-purple-400" />
                    Reading & Discovering Content
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-4">How to Find Great Content</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center group">
                          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-purple-400 text-xl mx-auto mb-3 group-hover:bg-gray-600 transition-colors">
                            <FaSearch />
                          </div>
                          <h4 className="font-bold text-white mb-2">Search</h4>
                          <p className="text-gray-400 text-sm">Use search bar to find specific topics</p>
                        </div>
                        <div className="text-center group">
                          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-purple-400 text-xl mx-auto mb-3 group-hover:bg-gray-600 transition-colors">
                            <FaTag />
                          </div>
                          <h4 className="font-bold text-white mb-2">Categories</h4>
                          <p className="text-gray-400 text-sm">Browse posts by category</p>
                        </div>
                        <div className="text-center group">
                          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-purple-400 text-xl mx-auto mb-3 group-hover:bg-gray-600 transition-colors">
                            <FaUsers />
                          </div>
                          <h4 className="font-bold text-white mb-2">Authors</h4>
                          <p className="text-gray-400 text-sm">Follow your favorite writers</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-white mb-3">Reading Experience</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center">
                              <FaDesktop className="text-blue-400 mr-3" />
                              <span className="text-gray-300">Clean Interface</span>
                            </div>
                            <span className="text-sm text-gray-500">Distraction-free</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center">
                              <FaMobileAlt className="text-green-400 mr-3" />
                              <span className="text-gray-300">Mobile Optimized</span>
                            </div>
                            <span className="text-sm text-gray-500">Any device</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center">
                              <FaDownload className="text-cyan-400 mr-3" />
                              <span className="text-gray-300">Read Offline</span>
                            </div>
                            <span className="text-sm text-gray-500">Download for later</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-white mb-3">Engagement Features</h4>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                            <FaComment className="text-blue-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-300">Commenting</p>
                              <p className="text-sm text-gray-500">Share your thoughts</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                            <FaShareAlt className="text-purple-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-300">Sharing</p>
                              <p className="text-sm text-gray-500">Share with others</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                            <FaBookmark className="text-yellow-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-300">Bookmarks</p>
                              <p className="text-sm text-gray-500">Save for later reading</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Management Section */}
            {activeSection === 'profile-management' && (
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FaUser className="mr-3 text-blue-400" />
                    Profile & Account Management
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Profile Settings</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                          <h4 className="font-bold text-white mb-2 flex items-center">
                            <FaCog className="mr-2 text-blue-400" />
                            Personal Information
                          </h4>
                          <p className="text-gray-400 text-sm">Update your name, bio, profile picture, and contact information.</p>
                        </div>
                        <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                          <h4 className="font-bold text-white mb-2 flex items-center">
                            <FaGlobe className="mr-2 text-green-400" />
                            Social Links
                          </h4>
                          <p className="text-gray-400 text-sm">Connect your social media profiles to your blog.</p>
                        </div>
                        <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                          <h4 className="font-bold text-white mb-2 flex items-center">
                            <FaLock className="mr-2 text-purple-400" />
                            Privacy Settings
                          </h4>
                          <p className="text-gray-400 text-sm">Control who can see your profile and posts.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Account Dashboard</h3>
                      <div className="p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <span className="font-medium text-white">Your Posts</span>
                            <span className="font-bold text-blue-400">View all</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <span className="font-medium text-white">Drafts</span>
                            <span className="font-bold text-yellow-400">Edit</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <span className="font-medium text-white">Comments</span>
                            <span className="font-bold text-green-400">Manage</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <span className="font-medium text-white">Analytics</span>
                            <span className="font-bold text-cyan-400">View stats</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {activeSection === 'faq' && (
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FaQuestionCircle className="mr-3 text-blue-400" />
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-colors">
                        <button
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                          onClick={() => {
                            const answer = document.getElementById(`answer-${index}`);
                            if (answer) {
                              answer.classList.toggle('hidden');
                            }
                          }}
                        >
                          <h3 className="font-bold text-white">{faq.question}</h3>
                          <FaChevronDown className="text-gray-400" />
                        </button>
                        <div id={`answer-${index}`} className="hidden px-6 pb-6">
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">Still have questions?</h3>
                    <p className="text-gray-300 mb-4">
                      Can't find the answer you're looking for? Please contact our support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        Contact Support
                      </Link>
                      <Link
                        href="/blogs"
                        className="inline-flex items-center justify-center gap-2 border border-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-800/50 transition-all"
                      >
                        Browse Blogs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-12 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of writers and readers who are already using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blogs/create"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            >
              <FaEdit />
              Write Your First Post
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-gray-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800/50 transition-all hover:border-gray-500"
            >
              <FaEye />
              Explore Blogs
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <FaBook className="text-2xl text-blue-400" />
                <span className="text-xl font-bold text-white">Dark Blog</span>
              </div>
              <p className="text-gray-400">
                A beautiful platform for writers and readers to share knowledge and stories.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link href="/blogs" className="text-gray-400 hover:text-blue-400 transition-colors">Blog Directory</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                  <FaGlobe className="text-xl" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                  <FaUsers className="text-xl" />
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                © {new Date().getFullYear()} Dark Blog. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}