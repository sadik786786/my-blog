import { FaEdit, FaTrash, FaExternalLinkAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import Link from "next/link";

export default function PostCard({ post, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {post.title}
              </h3>
              {post.status === 'published' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FaCheckCircle />
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <FaClock />
                  Draft
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.content}
            </p>
            
            <div className="text-sm text-gray-500">
              Created {formatDate(post.created_at)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/blogs/${post.slug}`}
              className="p-2 text-gray-500 hover:text-blue-600 transition"
              title="View"
            >
              <FaExternalLinkAlt />
            </Link>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 text-gray-500 hover:text-red-600 transition"
              title="Delete"
            >
              <FaTrash />
            </button>
            <Link
              href={`/blogs/edit/${post.id}`}
              className="p-2 text-gray-500 hover:text-green-600 transition"
              title="Edit"
            >
              <FaEdit />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}