
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // Configure your providers here, e.g.,
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials provided
    //     // For now, returning null
    //     return null;
    //   }
    // })
  ],
  // Add your session and callback configurations here
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   return token;
    // },
    // async session({ session, token }) {
    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
