import { useState } from "react";
import styles from "../../styles/components/reusable/topNav.module.scss";
import { BiBell } from "react-icons/bi";
import { useNotification } from "../../hooks";
import { NotificationsCtxTypes } from "../../context";
import { signOut } from "next-auth/react";

export function TopNav(): JSX.Element {
    const { getNotificationsNumber, updateNotifications } = useNotification();
    const [count, setCount] = useState<number>(0);

    const notificationsCtx_template: NotificationsCtxTypes = {
        status: false,
        number: count,
        data: {}
    }

    return (
        <nav className={styles.tn_wrapper}>
            <div className={styles.tn_info_wrapper}>
                {/* Page Title */}
                <h1 className={styles.tn_title}>MY TODO</h1>
            </div>
            <div className={styles.tn_info_wrapper}>
                {/* Account info and notification */}
                <div className={styles.tn_info}>
                    <span className={styles.tn_bell_wrapper} onClick={()=>{setCount(count+1); updateNotifications({...notificationsCtx_template})}}>
                        <BiBell />
                        <span className={styles.tn_notification_label}>{getNotificationsNumber()}</span>
                    </span>
                </div>
                <div className={styles.tn_account_wrapper}>
                    <div className={styles.tn_account_profile} onClick={()=>{
                        signOut({callbackUrl: '/login'})
                    }}>

                    </div>
                </div>
            </div>
        </nav>
    )
}