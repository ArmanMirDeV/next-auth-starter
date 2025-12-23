import { authOptions } from "@/lib/authOption";
import NextAuth from "next-auth";


// name, email, image

const userList = [
  { name: "hablu", password: "1234" },
  { name: "dablu", password: "1234" },
  { name: "bablu", password: "1234" },
  { name: "lablu", password: "1234" },
  { name: "mablu", password: "1234" },
];



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
