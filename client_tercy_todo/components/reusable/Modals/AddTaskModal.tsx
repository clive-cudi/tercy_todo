import styles from "../../../styles/components/reusable/modals/addTaskModal.module.scss";

interface addTaskModalProps {
    title: string
    form: JSX.Element | React.ReactNode
}

export const AddTaskModal = ({title, form}: addTaskModalProps): JSX.Element=>{
    return (
        <div className={styles.adt_wrapper}>
            <div className={styles.adt_content}>
                <div className={styles.adt_title_wrapper}>
                    <h2>{title.toUpperCase()}</h2>
                </div>
                {form}
                <div className={styles.adt_footer}>
                    <button>Close</button>
                </div>
            </div>
        </div>
    )
}