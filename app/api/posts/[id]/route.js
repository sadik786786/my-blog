import db from "@/app/lib/db";
import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";
import { success } from "zod";
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query(
      "DELETE FROM posts WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Post deleted" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const title = formData.get('title');
    const content = formData.get('content');
    const slug = formData.get('slug');
    const user_id = formData.get('user_id');
    const status = formData.get('status');
    const image = formData.get('thumbnail');

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Upload new image if exists
    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'blog_thumbnails' },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    } else {
      // keep existing image
      const [rows] = await db.execute(
        'SELECT thumbnail FROM posts WHERE id = ?',
        [id]
      );
      imageUrl = rows[0]?.thumbnail ?? null;
    }

    // 🔒 SAFE VALUES
    const safeSlug = slug || null;
    const safeUserId = user_id ? Number(user_id) : null;
    const safeStatus = status || 'draft';
    const safeImageUrl = imageUrl ?? null;

    await db.execute(
      `UPDATE posts 
       SET title = ?, slug = ?, content = ?, thumbnail = ?, status = ?, user_id = ?
       WHERE id = ?`,
      [
        title,
        safeSlug,
        content,
        safeImageUrl,
        safeStatus,
        safeUserId,
        id,
      ]
    );

    return new Response(
      JSON.stringify({success:true, message: 'Post updated successfully' }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating post:', error);
    return new Response(
      JSON.stringify({success:false, error: 'Failed to update post' }),
      { status: 500 }
    );
  }
}


export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query(
      "select * FROM posts WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true,result, message: "Post deleted" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}