import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const isOnSignupPage = nextUrl.pathname.startsWith("/signup");

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL("/aki", nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id, is_admin: user.is_admin };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id, is_admin } = token as { id: string; is_admin: boolean };
        const { user } = session;
        // console.log("usertoken", token);

        session = { ...session, user: { ...user, id, is_admin } };
      }

      // console.log("usersession", session);

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
