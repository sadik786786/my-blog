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
        const result = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [user.email]
        );

        if (result.rows.length === 0) {
          await db.query(
            "INSERT INTO users (name, email, image) VALUES ($1, $2, $3)",
            [user.name, user.email, user.image]
          );
        }

        return true;
      } catch (error) {
        console.error("SIGNIN ERROR:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const result = await db.query(
          "SELECT id FROM users WHERE email = $1 LIMIT 1",
          [session.user.email]
        );

        if (result.rows.length > 0) {
          session.user.id = result.rows[0].id;
        }

        return session;
      } catch (error) {
        console.error("SESSION ERROR:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
