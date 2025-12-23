import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";


// name, email, image

const userList = [
  { name: "hablu", password: "1234" },
  { name: "dablu", password: "1234" },
  { name: "bablu", password: "1234" },
  { name: "lablu", password: "1234" },
  { name: "mablu", password: "1234" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign In with {name} Button
      name: "Email & Password",

      // form inputs

      credentials: {
        email: { label: "email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "***********",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // const user = userList.find(u => u.name == username)

        const user = await dbConnect("users").findOne({ email });

        if (!user) return null;

        const isPasswordOkay = await bcrypt.compare(password, user.password);

        if (isPasswordOkay) {
          return user;
        }

        // my own login logic

        return null;
      },
    }),



    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })

    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
