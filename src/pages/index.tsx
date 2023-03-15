import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { retryDelay } from "@trpc/client/dist/internals/retryDelay";

const Home: NextPage = () => {
  const [state1, setState1] = useState(true);
    const {data, isFetching, isError, refetch} = api.posts.getUserPosts.useQuery({uname: 'hu_tao'}, {queryKey: [state1]});

  
  console.log(state1);


 useEffect(() => {
  // setState1('xD');
  if (state1) {
    refetch();
  }
}, [state1]) 



  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
       <div>Index


        <button onClick={() => {setState1(curr => !curr)}}>CLICK</button>
       </div>
      </main>
    </>
  );
};

export default Home;

