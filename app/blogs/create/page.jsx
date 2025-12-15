'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define form schema with validation
const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
});

export default function CreatePost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [slug, setSlug] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
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
    const generatedSlug = watchTitle
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() || '';
    setSlug(generatedSlug);
  }, [watchTitle]);

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
    setImageFile(null);
    setImagePreview('');
    
    // Clean up the object URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      // Create FormData object for multipart/form-data
      const formData = new FormData();
      
      // Append text fields
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('slug', slug || data.title.toLowerCase().replace(/\s+/g, '-'));
      formData.append('user_id', session?.user?.id);
      formData.append('status', 'published');
      
      // Append image file if exists
      if (imageFile) {
        formData.append('thumbnail', imageFile);
      }

      const response = await fetch(`/api/posts/create/${session.user.email}`, {
        method: 'POST',
        // Don't set Content-Type header - let browser set it with boundary
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create post');
      }

      // Clean up preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Success - redirect to posts page
      setTimeout(() => {
        router.push('/blogs');
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10 mx-5">
          <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
          <p className="text-gray-400">Share your thoughts with the world</p>
          
          <div className="flex items-center space-x-4 mt-6">
            <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-300">
              Published
            </div>
            {slug && (
              <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">
                Slug: <code className="ml-2 font-mono">{slug}</code>
              </div>
            )}
          </div>
        </div>

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

              {/* Thumbnail Field - Only One Image */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Thumbnail Image (One image only)
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
                              <p className="text-sm font-medium">Image uploaded successfully</p>
                              <p className="text-xs text-gray-400">One thumbnail image selected</p>
                              <p className="text-xs text-gray-500 mt-1">
                                File: {imageFile?.name} ({(imageFile?.size / 1024 / 1024).toFixed(2)} MB)
                              </p>
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
                          <p className="text-gray-400">Click to upload a thumbnail image</p>
                          <p className="text-sm text-gray-500">One image only • PNG, JPG, GIF up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Preview in larger view */}
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

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Publish Post</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Post Preview</h3>
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <svg className="w-12 h-12 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">No thumbnail selected</p>
                    </div>
                  )}
                </div>
                
                {watchTitle && (
                  <div>
                    <h4 className="font-medium truncate">{watchTitle}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Published • Just now
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
                      {imagePreview ? '✓ Uploaded' : 'Not uploaded'}
                    </span>
                  </div>
                  {imageFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    <p>Posts are published immediately</p>
                    <p className="mt-1 text-xs">All published posts are visible to everyone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-700/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Image Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1 mr-3"></div>
                  <span>Upload only one thumbnail image</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1 mr-3"></div>
                  <span>Maximum file size: 5MB</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1 mr-3"></div>
                  <span>Supported formats: PNG, JPG, GIF</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1 mr-3"></div>
                  <span>Images are uploaded to Cloudinary</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}