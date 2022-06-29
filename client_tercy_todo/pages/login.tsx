import { LoginWidget, NextHead } from "../components";
import styles from '../styles/login.module.css';
import { getSession } from "next-auth/react";

export default function Login(){
    return (
        <div className={styles.app}>
            <NextHead title={`Login page`} />
            <div className={styles.content}>
                <div className={styles.login_wrapper}>
                    <LoginWidget />
                </div>
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