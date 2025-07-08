import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log('info', session, token, user);
      
      // Bổ sung id, provider, avatar vào session
      if (session.user) {
        session.user.id = token.sub || user?.id;
        session.user.provider = token.provider || user?.provider || 'google';
        session.user.avatarUrl = session.user.image;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 