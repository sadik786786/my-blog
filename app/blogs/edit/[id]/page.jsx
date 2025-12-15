'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define form schema with validation
const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
});

export default function Edit() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [post, setPost] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [slug, setSlug] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
    }
  });

  const watchTitle = watch('title');

  // Generate slug from title
  useEffect(() => {
    if (watchTitle) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [watchTitle]);

  // Fetch post data on component mount
  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/posts/${id}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      
      const data = await response.json();
      
      // Check if data has result array or is the post object directly
      const postData = data.result ? data.result[0] : data;
      
      if (!postData) {
        throw new Error('Post not found');
      }
      
      setPost(postData);
      
      // Set form values
      reset({
        title: postData.title || '',
        content: postData.content || '',
      });
      
      // Set image preview if thumbnail exists
      if (postData.thumbnail) {
        setImagePreview(postData.thumbnail);
      }
      
      // Set slug
      setSlug(postData.slug || '');
      
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post. Please try again.');
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file (PNG, JPG, GIF)');
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    // Store the file object for FormData
    setImageFile(file);
    
    // Create preview URL for UI
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    // Clean up the object URL if it's a blob
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImageFile(null);
    setImagePreview('');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
  if (!session?.user?.id) {
    setError('You must be logged in to update a post');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append(
      'slug',
      slug || data.title.toLowerCase().replace(/\s+/g, '-')
    );
    formData.append('user_id', String(session.user.id));
    formData.append('status', post?.status || 'published');

    // ✅ ONLY append file if it exists
    if (imageFile) {
      formData.append('thumbnail', imageFile);
    }

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update post');
    }

    router.push('/profile');

  } catch (error) {
    console.error('Error:', error);
    setError(error.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};


  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (status === 'loading' || fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!post && !fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-400 mb-6">The post you're trying to edit doesn't exist.</p>
          <button
            onClick={() => router.push('/posts')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10 mx-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Edit Post</h1>
              <p className="text-gray-400">Update your post content and thumbnail</p>
            </div>
            <div className="text-sm text-gray-400">
              Post ID: <code className="ml-2 font-mono bg-gray-800 px-3 py-1 rounded">{id}</code>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-6">
            <div className={`px-4 py-2 rounded-full ${post?.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
              {post?.status === 'draft' ? 'Draft' : 'Published'}
            </div>
            {slug && (
              <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">
                Slug: <code className="ml-2 font-mono">{slug}</code>
              </div>
            )}
            <div className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              Last updated: {post?.updated_at ? new Date(post.updated_at).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 mx-5 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Title
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                  placeholder="Enter a captivating title..."
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              {/* Content Field */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Content
                </label>
                <textarea
                  {...register('content')}
                  rows={15}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
                  placeholder="Write your amazing content here..."
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-400">{errors.content.message}</p>
                )}
              </div>

              {/* Thumbnail Field */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Thumbnail Image
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    
                    {imagePreview ? (
                      <div className="relative group">
                        <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={imagePreview}
                                alt="Thumbnail preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Image {imageFile ? '(New)' : '(Existing)'}</p>
                              <p className="text-xs text-gray-400">Click change to upload new image</p>
                              {imageFile && (
                                <p className="text-xs text-gray-500 mt-1">
                                  File: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={triggerFileInput}
                              className="px-4 py-2 border border-purple-600 text-purple-300 rounded-lg hover:bg-purple-900/30 transition-all duration-300 text-sm"
                            >
                              Change Image
                            </button>
                            <button
                              type="button"
                              onClick={removeImage}
                              className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={triggerFileInput}
                        className="block w-full px-4 py-10 border-2 border-dashed border-gray-700 rounded-lg text-center hover:border-purple-500 transition-all duration-300 cursor-pointer bg-gray-900/50"
                      >
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-gray-400">Click to upload a new thumbnail image</p>
                          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-300 mb-2">Image Preview:</p>
                      <div className="relative rounded-lg overflow-hidden border border-gray-700">
                        <img
                          src={imagePreview}
                          alt="Thumbnail preview"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-between space-x-4 pt-6">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/posts')}
                    className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    View All Posts
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all changes?')) {
                        reset({
                          title: post?.title || '',
                          content: post?.content || '',
                        });
                        setImagePreview(post?.thumbnail || '');
                        setImageFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }
                    }}
                    className="px-6 py-3 border border-yellow-700 text-yellow-300 rounded-lg hover:bg-yellow-900/20 transition-all duration-300"
                  >
                    Reset Changes
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Update Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Post Details Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Post Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Created</p>
                  <p className="text-gray-300">
                    {post?.created_at ? new Date(post.created_at).toLocaleDateString() : 'N/A'} at{' '}
                    {post?.created_at ? new Date(post.created_at).toLocaleTimeString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="text-gray-300">
                    {post?.updated_at ? new Date(post.updated_at).toLocaleDateString() : 'N/A'} at{' '}
                    {post?.updated_at ? new Date(post.updated_at).toLocaleTimeString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <div className={`px-3 py-1 rounded-full text-sm inline-block ${post?.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                    {post?.status === 'draft' ? 'Draft' : 'Published'}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Original Slug</p>
                  <code className="text-sm font-mono text-gray-300 bg-gray-900 px-2 py-1 rounded">
                    {post?.slug || 'N/A'}
                  </code>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <svg className="w-12 h-12 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">No thumbnail</p>
                    </div>
                  )}
                </div>
                
                {(watchTitle || post?.title) && (
                  <div>
                    <h4 className="font-medium truncate">{watchTitle || post?.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {post?.status === 'draft' ? 'Draft' : 'Published'} • {post?.updated_at ? 'Updated' : 'Just now'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Content Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Content Words</span>
                    <span className="text-green-400">
                      {watch('content')?.split(/\s+/).filter(word => word.length > 0).length || 0} words
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: `${Math.min((watch('content')?.length || 0) / 5000 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Characters</span>
                    <span className="text-purple-400">
                      {watch('content')?.length || 0} chars
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Thumbnail</span>
                    <span className={imagePreview ? 'text-green-400' : 'text-yellow-400'}>
                      {imagePreview ? (imageFile ? 'New' : 'Existing') : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
              <h3 className="text-lg font-semibold mb-4 text-red-300">Danger Zone</h3>
              <p className="text-sm text-gray-300 mb-4">
                Once you delete this post, there is no going back. Please be certain.
              </p>
              <button
                type="button"
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                    try {
                      const response = await fetch(`/api/posts/${id}`, {
                        method: 'DELETE',
                      });
                      
                      if (response.ok) {
                        router.push('/posts');
                      } else {
                        const result = await response.json();
                        throw new Error(result.error || 'Failed to delete post');
                      }
                    } catch (error) {
                      console.error('Error deleting post:', error);
                      alert(error.message || 'Failed to delete post. Please try again.');
                    }
                  }
                }}
                className="w-full px-4 py-2 bg-red-500/20 border border-red-500 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}