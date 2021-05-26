import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react"
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/free-fall")
  }, []);

  return (
    <>
      <Head>
        <title>DogePhysics —  Interactive Physics Simulations — The Fastest and Easiest Way of Learning Physics</title>
      </Head>
      <div></div>
    </>
  )
}
