import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserList from "../../components/UserList/UserList";
import Header from "@/components/Header/Header";
import { AuthContext } from "@/providers/AuthContext";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <title>Next App - User List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoggedIn ? (
        <>
          <Header />
          <main className={`${styles.main} ${inter.className}`}>
            <UserList />
          </main>
        </>
      ) : null}
    </>
  );
}
