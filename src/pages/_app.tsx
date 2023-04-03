import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";
import ErrorContextProvider from "~/contexts/errorContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ErrorContextProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </ErrorContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
