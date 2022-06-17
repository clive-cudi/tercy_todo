import { useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Stars from '../components/Stars';
import { useAuth } from '../hooks';
import { useSession } from 'next-auth/react';
import { NavBar, NextHead, TopNav } from '../components';

export default function Home() {
  const auth = useAuth();
  const session = useSession();

  useEffect(()=>{
    console.log(auth)
    console.log(session);
  }, [auth, session])

  return (
    <div className={styles.app}>
      <NextHead title='HomePage' />
      <main className={styles.content}>
        <NavBar />
        <div className={styles.content_view}>
          <TopNav />
          <Stars amount={4} />
        </div>
      </main>
    </div>
  )
}
