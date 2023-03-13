import Layout from '@/src/components/layout'
import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { createContext, useState } from 'react'


const AuthContext = createContext<any>(null);
export default function App({
   Component, 
   pageProps: {session, ...pageProps} }: 
   AppProps) {
  return (

    <SessionProvider session={session}>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </SessionProvider>
  )
}
