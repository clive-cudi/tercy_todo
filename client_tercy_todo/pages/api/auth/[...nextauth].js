import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth";
import axios from "axios";

// interface credentials {
    // email: string
    // password: string
// }

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials_email",
            name: 'Credentials',
            async authorize(credentials){
                console.log(credentials);

                const loginData = await axios.post(`${process.env.SERVER_URL ?? `http://localhost:5000`}/auth/login`, {
                    password: credentials.password,
                    email: credentials.email
                });

                console.log(loginData);
                if (loginData.data.user_token.error.status == false) {
                    return loginData;
                }

                return null;
            }
        })
    ],
    callbacks: {
        jwt: async({token, user, account})=>{
            if(loginData.data?.user_token?.token){
                token = {...token, user_token: loginData.data.user_token.token};
            }
            return token;
        },
        session: async({session, token})=>{
            session.user = {...session.user, token: token};
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: `${process.env.SECRET ?? 'hgfwuewir'}`
})