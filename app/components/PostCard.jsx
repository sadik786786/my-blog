'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiEdit, FiTrash2, FiChevronRight, FiEye } from 'react-icons/fi';
import { BsCardText } from 'react-icons/bs';

const PostCard = ({ 
  post, 
  variant = 'grid', 
  isOwner = false, 
  onDelete = null,
  onEdit = null
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const getExcerpt = (content, maxLength = 100) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (variant === 'list') {
    return (
      <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-purple-500/30 transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Thumbnail */}
          <div className="lg:w-48 lg:h-32 relative rounded-xl overflow-hidden flex-shrink-0">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                <BsCardText className="w-8 h-8 text-gray-600" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                {post.status}
              </span>
              <div className="flex items-center text-sm text-gray-400">
                <FiCalendar className="mr-2" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span>Updated: {getTimeAgo(post.updated_at)}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-400 mb-4 line-clamp-2">
              {getExcerpt(post.content, 200)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link
                  href={`/blog/${post.slug || post.id}`}
                  className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Read Full Article
                  <FiChevronRight className="ml-1" />
                </Link>
                <span className="text-sm text-gray-500">
                  ID: <code className="ml-1 bg-gray-900 px-2 py-1 rounded">{post.id}</code>
                </span>
              </div>
              
              {isOwner && (
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/edit/${post.id}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete && onDelete(post)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 text-sm"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  return (
    <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
            <BsCardText className="w-12 h-12 text-gray-600" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
            {post.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <FiCalendar className="mr-2" />
          <span>{formatDate(post.created_at)}</span>
          <span className="mx-2">•</span>
          <span>{getTimeAgo(post.updated_at)}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3">
          {getExcerpt(post.content, 120)}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <Link
            href={`/blog/${post.slug || post.id}`}
            className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            Read More
            <FiChevronRight className="ml-1" />
          </Link>
          
          {isOwner && (
            <div className="flex items-center space-x-2">
              <Link
                href={`/edit/${post.id}`}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
                title="Edit"
              >
                <FiEdit className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete && onDelete(post)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;