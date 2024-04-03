import { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { addNewUserToDb } from "../firebase/utils/addNewUserToDb";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.TOKEN_SECRET,

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session(passedValues) {
      const { session, token } = passedValues;
      return {
        ...session,
        user: { ...session.user, id: token.sub },
      } as DefaultSession;
    },
    async signIn(params) {
      try {
        await addNewUserToDb(params.user);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
