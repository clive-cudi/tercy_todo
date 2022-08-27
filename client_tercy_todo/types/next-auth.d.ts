import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User {
    token?: {
      tercy_token: string;
    };
    authUser: {
      email: string | null;
      userName: string | null;
      password?: string | null;
      uid: string | null;
    } | null;
    user_token?: {
      user: {
        email: string | null;
        userName: string | null;
        password?: string | null;
        uid: string | null;
      } | null;
      token: string | null;
      error?: {
        status: boolean;
        message: string | null;
        code: string | null;
      } | null;
    } | null;
  }

  //   declare function signIn<P extends RedirectableProviderType | undefined = undefined>(
  //     provider?: LiteralUnion<BuiltInProviderType>,
  //     options?: SignInOptions,
  //     authorizationParams?: SignInAuthorisationParams
  //   ): Promise<SignInResponse
  // >;
}

declare module "next-auth/jwt" {
  interface JWT {
    // signIn(user: User): Promise<SignInResponse>;
    tercy_token: string;
  }
}
