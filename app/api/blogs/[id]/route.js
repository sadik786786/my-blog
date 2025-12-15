import db from "@/app/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // this is actually slug in URL

    const [rows] = await db.query(
      "SELECT * FROM posts WHERE id = ? LIMIT 1",
      [id]
    );
    
    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, post: rows[0] }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
