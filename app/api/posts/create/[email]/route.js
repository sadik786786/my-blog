import cloudinary from '@/app/lib/cloudinary';
import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function POST(req, { params }) {
  try {
    const formData = await req.formData();

    const title = formData.get('title');
    const content = formData.get('content');
    const slug = formData.get('slug');
    const user_id = formData.get('user_id');
    const status = formData.get('status');
    const image = formData.get('thumbnail'); // FILE
    console.log(image);

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // 🔹 Upload image to Cloudinary (if exists)
    if (image && image.size > 0) {
      if (!image.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Only image files allowed' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'blog_thumbnails',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // 🔹 Save to database
    await db.execute(
      `INSERT INTO posts (title, content, slug, thumbnail, user_id, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, content, slug, imageUrl, user_id, status]
    );

    return NextResponse.json({
      message: 'Post created successfully',
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
