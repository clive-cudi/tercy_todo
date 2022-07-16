import { LoginWidget, NextHead, Modal } from "../components";
import styles from '../styles/login.module.css';
import { getSession } from "next-auth/react";
import { useModal } from "../hooks";

export default function Login(){
    const { modal } = useModal();

    return (
        <div className={styles.app}>
            <NextHead title={`Login page`} />
            <div className={styles.content}>
                <div className={styles.login_wrapper}>
                    <LoginWidget />
                </div>
                {modal.open == true && <Modal data={modal.data} />}
            </div>
        </div>
    )
}

Login.getInitialProps = async (ctx: {req: any, res: any})=>{
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