import { useSession, getSession } from "next-auth/react";

export function useAuth() {
  const isOnServer = typeof window == undefined ? true : false;

  console.log(isOnServer);
  let auth = isOnServer ? `On Server` : `On Client`;
  return auth;
}
