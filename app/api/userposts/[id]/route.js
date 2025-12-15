import db from "@/app/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // user_id

    const [rows] = await db.query(
      "SELECT * FROM posts WHERE user_id = ?",
      [id]
    );
    console.log(rows[0])
    return new Response(
      JSON.stringify({
        success: true,
        posts: rows[0],
        message: "Posts fetched successfully",
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
