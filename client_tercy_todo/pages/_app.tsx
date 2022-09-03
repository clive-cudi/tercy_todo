import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  NotificationsCtxProvider,
  HomePageTabCtxProvider,
  ModalCtxProvider,
  LoadingCtxProvider,
} from "../providers";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ModalCtxProvider>
        <LoadingCtxProvider>
          <NotificationsCtxProvider>
            <HomePageTabCtxProvider>
              <Component {...pageProps} />
            </HomePageTabCtxProvider>
          </NotificationsCtxProvider>
        </LoadingCtxProvider>
      </ModalCtxProvider>
    </SessionProvider>
  );
}

export default MyApp;
