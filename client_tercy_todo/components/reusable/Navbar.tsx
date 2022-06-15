import styles from "../../styles/components/reusable/navbar.module.css";

interface NavBarProps {
    starredTasks?: []
    urgentTasks?: []
}

export function NavBar({starredTasks, urgentTasks}: NavBarProps): JSX.Element {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav_wrapper}>
                <div className={styles.nav_logo}>
                    <h1>MY TODO</h1>
                </div>
                <ul>
                    <li><button>Home</button></li>
                    <li><button>My Tasks</button></li>
                    <li><button>Inbox</button></li>
                </ul>
                <span>Starred Tasks</span>
                <ul>
                    {
                        starredTasks?.map((task)=>{
                            return (
                                <li></li>
                            )
                        })
                    }
                </ul>
                <span>Urgent Tasks</span>
                <ul>
                    {
                        urgentTasks?.map((task)=>{
                            return (
                                <li></li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}