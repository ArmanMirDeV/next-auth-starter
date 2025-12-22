import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const userList = [
  {name: "hablu", password: "1234"},
  {name: "dablu", password: "1234"},
  {name: "bablu", password: "1234"},
  {name: "lablu", password: "1234"},
  {name: "mablu", password: "1234"},
]



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign In with {name} Button
      name: "Email & Password",

      // form inputs

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your Name" },
        password: { label: "Password", type: "password", placeholder: "***********" },
        secretCode: { label: "Secret Code", type: "number", placeholder:" Enter Code" },
      },
      async authorize(credentials, req) {


        const {password, username, secretCode} = credentials;

        const user = userList.find(u => u.name == username)
        if(!user) return null;

        const isPasswordOkay = user.password == password;

        if(isPasswordOkay){
          return user;
        }


        // my own login logic

        return null;
      },
    }),

    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
