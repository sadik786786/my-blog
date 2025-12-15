import db from "@/app/lib/db";

export async function GET(req, { params }) {
  try {
    const [rows] = await db.query("SELECT * FROM posts");
    return new Response(
      JSON.stringify({ success: true, data: rows }), 
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
