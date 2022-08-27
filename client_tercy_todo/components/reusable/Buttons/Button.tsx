import styles from "../../../styles/components/reusable/Buttons/button.module.scss";

export const Button = ({children, onClick, type, className, disabled , withIcon}:{children: React.ReactNode, onClick?: () => void, type?: "button" | "submit" | "reset", className?: string, disabled?: boolean, withIcon?: {status: boolean, icon: React.ReactNode, place: "end" | "start"}}) => {
    return (
        <button onClick={onClick} type={type} className={`${styles.button_default} ${className} ${withIcon?.place === "end" ? styles.button_icon_end : styles.button_icon_start}`} disabled={disabled}>
            {withIcon?.status ? <span>{withIcon?.icon}</span> : null}
            {children}
        </button>
    )
}