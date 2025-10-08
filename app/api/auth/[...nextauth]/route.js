//api/auth/[...nextauth]/route.js
import { findUserByEmail, verifyPassword } from "@/utils/ServerActions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await findUserByEmail(email);
        if (!user) {
          throw new Error("Incorrect email or password");
        }

        const valid = await verifyPassword(password, user.password);
        if (!valid) {
          throw new Error("Incorrect email or password");
        }

        return {
          id: user._id.toString(), // ✅ always convert ObjectId to string
          email: user.email,
          name: user.name || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // ✅ Corrected: use user.id, not user._id
      if (user) {
        token.id = user.id; // user.id already string
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
