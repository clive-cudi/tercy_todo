import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NotificationsCtxProvider } from "../providers";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NotificationsCtxProvider>
        <Component {...pageProps} />
      </NotificationsCtxProvider>
    </SessionProvider>
  );
}

export default MyApp;
