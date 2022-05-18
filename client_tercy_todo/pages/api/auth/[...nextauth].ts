import NextAuth from "next-auth/next";
import { EmailProvider, CredentialsProvider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { type } from "os";


// user {
//   [1]   _id: new ObjectId("628185d3c4322b9e832cb24b"),
//   [1]   email: 'clivemaina41@gmail.com',
//   [1]   userName: 'cudi_two',
//   [1]   password: '$2a$10$c.xeiQMkHmAMHXynYOt/j.3MCNjbz1JxqhtuhVdmtjJgki83/gGsm',
//   [1]   uid: 'idw6akzyecTercym2kiy2kkwea',
//   [1]   __v: 0
//   [1] }
  

type loginDataTypes = {
  message: string,
  user_token: {
    user: {
      email?: string
      userName?: string
      password?: string
    } | null
    token: string | null
    error: {
      status: boolean | null
      message: string | null
      code: string | null
    }
  }
}

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials_email",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Email"
        },
        password : {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials, req){
        console.log(credentials);

        const {data: login_res} = await axios.post(`${process.env.SERVER_URL ?? `http://localhost:5000`}/auth/login`, {
          email: credentials?.email,
          password: credentials?.password
        });

        const login_data: loginDataTypes = login_res;

        if (login_data.user_token.user && (login_data.user_token.error.status !== false)){
          return login_data;
        } else {
          throw new Error(JSON.stringify(login_data));
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: `${process.env.SECRET ?? "shwuhjaljdcudijndkweho"}`,
});
