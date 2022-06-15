import NextAuth from "next-auth";
import type { BuiltInProviderType ,RedirectableProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion, SessionProviderProps, SignInAuthorisationParams, SignInOptions, SignInResponse, SignOutParams, SignOutResponse, UseSessionOptions } from 'next-auth/react';

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User {
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
