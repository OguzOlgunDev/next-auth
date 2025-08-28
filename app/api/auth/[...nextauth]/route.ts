import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Kullanıcıya ilk login olduğunda role ata
      if (user) {
        // örnek: domain bazlı admin atama
        token.role = user.email === "tiredcavalry@gmail.com" ? "admin" : "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
