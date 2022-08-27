import styles from "../../../styles/components/reusable/modals/addTaskModal.module.scss";
import styles_btn from "../../../styles/components/reusable/Buttons/button.module.scss";
import { Button } from "../../../components";
import { HiPlus } from "react-icons/hi";
import { useModal } from "../../../hooks";
interface addTaskModalProps {
    title: string
    form: JSX.Element | React.ReactNode
}

export const AddTaskModal = ({title, form}: addTaskModalProps): JSX.Element=>{
    const { closeModal } = useModal();

    return (
        <div className={styles.adt_wrapper}>
            <div className={styles.adt_content}>
                <div className={styles.adt_title_wrapper}>
                    <h2>{title.toUpperCase()}</h2>
                </div>
                {form}
                <div className={styles.adt_footer}>
                    <Button type="button" className={styles_btn.add_task_btn} onClick={(): void => {closeModal()}}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}