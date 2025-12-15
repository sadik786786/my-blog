import db from "@/app/lib/db";

export async function GET(request, { params }) {
  try {
    const { email } = await params;
    console.log(email);
    // Query DB
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log(rows[0]);

    const [posts] = await db.query(
      "SELECT * FROM posts WHERE user_id = ?",
      [rows[0].id]
    );
     await new Promise(resolve => setTimeout(resolve, 500));
     return new Response(JSON.stringify([rows[0], posts]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}