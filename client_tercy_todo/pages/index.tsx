import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useModal } from '../hooks';
import { useSession } from 'next-auth/react';
import { NavBar, NextHead, TopNav, HomePageCurrentTab, Modal } from '../components';

export default function Home() {
  // const auth = useAuth();
  const session = useSession();
  const { modal } = useModal();

  useEffect(()=>{
    // console.log(auth)
    console.log(session);
  }, [session])

  return (
    <div className={styles.app}>
      <NextHead title='HomePage' />
      <main className={styles.content}>
        <NavBar />
        <div className={styles.content_view}>
          <TopNav />
          <HomePageCurrentTab />
          {/* <Stars amount={4} /> */}
        </div>
        <NavBar isPrimary />
        {modal.open == true && <Modal data={modal.data} />}
      </main>
    </div>
  )
}
