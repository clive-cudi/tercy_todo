import { LoginWidget, NextHead } from "../components";
import styles from "../styles/login.module.css";

export default function Login() {
  return (
    <div className={styles.app}>
      <NextHead title={`Login page`} />
      <div className={styles.content}>
        <div className={styles.login_wrapper}>
          <LoginWidget />
        </div>
      </div>
    </div>
  );
}
