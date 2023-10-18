import React, { useEffect, useContext } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserDetail from "../../components/UserDetail/UserDetail";
import Header from "@/components/Header/Header";
import { AuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function User() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoggedIn ? (
        <>
          <Header />
          <main className={`${styles.main} ${inter.className}`}>
            <UserDetail />
          </main>
        </>
      ) : null}
    </>
  );
}
