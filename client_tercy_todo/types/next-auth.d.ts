import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: User
    }
    interface User {
        authUser: {
            email: string | null
            userName: string | null
            password?: string | null
            uid: string | null
        } | null
        user_token?: {
            user: {
                email: string | null
                userName: string | null
                password?: string | null
                uid: string | null
            } | null
            token: string | null
            error?: {
                status: boolean
                message: string | null
                code: string | null
            } | null
        }| null
    }
}