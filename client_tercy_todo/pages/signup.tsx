import { SignupWidget } from "../components";
import styles from '../styles/login.module.css';
import { NextHead, Modal } from "../components";
import { useModal } from "../hooks";
import { getSession } from "next-auth/react";

export default function Signup(){
    const { modal } = useModal();

    return (
        <div className={styles.app}>
            <NextHead title={`Sign up Page`} />
            <div className={styles.content}>
                <div className={styles.login_wrapper}>
                    <SignupWidget />
                </div>
                {modal.open == true && <Modal data={modal.data} />}
                {/* <Modal data={<h1>My Modal</h1>} /> */}
            </div>
        </div>
    )
}


Signup.getInitialProps = async (ctx: {req: any, res: any})=>{
    const {req, res} = ctx;
    const session = getSession({req});

    // redirect to home page if user is authenticated

    if ((await session)?.user && res){
        res.writeHead(302, {
            Location: '/'
        });

        res.end();
        return {};
    }

    return {};
}