import styles from "../styles/login.module.css";
import { SignupForm } from "./SignupForm";
import Link from "next/link";

export function SignupWidget() {
  return (
    <div className={styles.login_widget}>
      <h1>Signup.</h1>
      <SignupForm />
      <Link href={"/login"}>Have an Account? Login</Link>
    </div>
  );
}
