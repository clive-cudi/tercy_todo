import { useState } from "react";
import styles from "../../styles/components/reusable/navbar.module.scss";
import { BsHouseDoor, BsCheckCircle } from "react-icons/bs";
import { FiCheckCircle, FiBell } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { GoAlert } from "react-icons/go";
import { FaHamburger } from "react-icons/fa"

interface NavBarProps {
    starredTasks?: []
    urgentTasks?: []
}

const iconStyles: React.CSSProperties = {
    margin: "10px",
    fontSize: "20px"
}

export function NavBar({starredTasks, urgentTasks}: NavBarProps): JSX.Element {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    function toggleCollapse(): void{
        if (isCollapsed == true){
            setIsCollapsed(false);
        } else {
            setIsCollapsed(true);
        }
    }

    return (
        <nav className={`${styles.nav} ${isCollapsed ? styles.nav_collapsed: ''}`}>
            <div className={styles.nav_wrapper}>
                <div className={styles.nav_logo}>
                    {isCollapsed == false && <h1 className={styles.nav_logo_title}>MY TODO</h1>}
                    <span onClick={():void=>{toggleCollapse()}}>{isCollapsed ? <FaHamburger /> : <HiMenuAlt1 />}</span>
                </div>
                <ul>
                    <li><button><BsHouseDoor />{isCollapsed == false && <span>Home</span>}</button></li>
                    <li><button><FiCheckCircle />{isCollapsed == false && <span>My Tasks</span>}</button></li>
                    <li><button><FiBell />{isCollapsed == false && <span>Inbox</span>}</button></li>   
                </ul>
                <span className={styles.nav_mini_title}>{isCollapsed == false ? <span className={styles.nav_mini_title_txt}>Starred Tasks</span> : ''}<AiFillStar /></span>
                <ul>
                    {
                        starredTasks?.map((task)=>{
                            return (
                                <li></li>
                            )
                        })
                    }
                </ul>
                <span className={styles.nav_mini_title}>{isCollapsed == false ? <span className={styles.nav_mini_title_txt}>Urgent Tasks</span> : ''}<GoAlert /></span>
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