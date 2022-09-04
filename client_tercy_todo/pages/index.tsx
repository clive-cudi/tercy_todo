import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useModal, useLoading } from '../hooks';
import { useSession } from 'next-auth/react';
import { NavBar, NextHead, TopNav, HomePageCurrentTab, Modal, Spinner } from '../components';
import { getSession } from 'next-auth/react';

export default function Home() {
  // const auth = useAuth();
  const session = useSession();
  const { modal } = useModal();
  const { isLoading } = useLoading();

  // useEffect(()=>{
  //   // console.log(auth)
  //   console.log(session);
  // }, [session])

  return (
    <div className={styles.app}>
      <NextHead title='HomePage' />
      { isLoading.status === true && <Spinner /> }
      <main className={styles.content}>
        <NavBar />
        <div className={styles.content_view}>
          <TopNav />
          <HomePageCurrentTab />
          {/* <Stars amount={4} /> */}
        </div>
        <NavBar isPrimary={true} />
        {modal.open == true && <Modal data={modal.data} />}
      </main>
    </div>
  )
}

Home.getInitialProps = async (ctx: {req: any, res: any}) => {
  const {req, res} = ctx;
  const session = getSession({req});

  if (!(await session)?.user && res) {
    res.writeHead(302, {
      Location: '/login'
    });

    res.end();

    return {
      authSession: session
    };
  }

  return {
    authSession: session
  }
}
