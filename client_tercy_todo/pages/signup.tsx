import { SignupWidget } from "../components";
import styles from '../styles/login.module.css';
import { NextHead } from "../components";

export default function Signup(){
    return (
        <div className={styles.app}>
            <NextHead title={`Sign up Page`} />
            <div className={styles.content}>
                <div className={styles.login_wrapper}>
                    <SignupWidget />
                </div>
            </div>
        </div>
    )
}