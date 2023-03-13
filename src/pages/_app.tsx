import Layout from '@/src/components/layout'
import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { createContext, useState } from 'react'
import { withTRPC } from '@trpc/next'
import {loggerLink} from '@trpc/client/links/loggerLink';
import {httpBatchLink} from '@trpc/client/links/httpBatchLink'
import superjson from 'superjson';

const AuthContext = createContext<any>(null);
const App = ({
   Component, 
   pageProps: {session, ...pageProps} }: 
   AppProps) => {
  return (

    <SessionProvider session={session}>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </SessionProvider>
  )
}

// export default App;
//todo add approuter as generic
export default withTRPC({
  config({ctx}) {

    //change later
    const url = 'http://localhost:3000/api/trpc'
  
    const links = [
      loggerLink(),
      httpBatchLink({
        // maxBatchSize: 10,
        url
      })
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60
          }
        }
      },
      headers() {
        if (ctx?.req) {
          return { 
            ...ctx.req.headers,
            'x-ssr': '1'
          }
        }
        return {}
      },
      links,
      transformer: superjson
    }
  
  },
  ssr: false // modify and check
})(App);
