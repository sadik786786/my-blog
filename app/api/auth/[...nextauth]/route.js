import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        // check if user already exists
        const [rows] = await db.query(
          "SELECT * FROM users WHERE email = ?",
          [user.email]
        );

        // if not exist → insert
        if (rows.length === 0) {
          await db.query(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [user.name, user.email, user.image]
          );
        }

        return true;
      } catch (error) {
        console.error("Error inserting user:", error);
        return false;
      }
    },

    async session({ session }) {
      // fetch the user ID from DB and attach to session
      const [rows] = await db.query(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [session.user.email]
      );

      if (rows.length > 0) {
        session.user.id = rows[0].id;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
