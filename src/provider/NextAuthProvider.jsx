"use client";

const { SessionProvider } = require("next-auth/react");

const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
