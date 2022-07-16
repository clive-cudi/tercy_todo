import { HTMLInputTypeAttribute } from "react";
import styles from "../../styles/components/reusable/input.module.scss";


interface InputProps {
    type: HTMLInputTypeAttribute,
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({type, placeholder, onChange,...inputProps}: InputProps)=>{
    return (
        <input className={styles.input} type={type} placeholder={placeholder} onChange={(e)=>{
            onChange(e);
        }} {...inputProps} />
    )
}