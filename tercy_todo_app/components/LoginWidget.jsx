import styles from "../styles/login.module.css";
import { LoginForm } from "./LoginForm";
import Link from "next/link";

export function LoginWidget() {
  return (
    <div className={styles.login_widget}>
      <h1>Login</h1>
      <LoginForm />
      <Link href={"/signup"}>No Account? Signup</Link>
    </div>
  );
}
