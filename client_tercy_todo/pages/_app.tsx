import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  NotificationsCtxProvider,
  HomePageTabCtxProvider,
  ModalCtxProvider,
} from "../providers";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ModalCtxProvider>
        <NotificationsCtxProvider>
          <HomePageTabCtxProvider>
            <Component {...pageProps} />
          </HomePageTabCtxProvider>
        </NotificationsCtxProvider>
      </ModalCtxProvider>
    </SessionProvider>
  );
}

export default MyApp;
