import styles from "../../../styles/components/views/hometab.module.scss";
import { HiPlus } from "react-icons/hi";
import { AddTaskModal, AddTaskModalForm } from "../../../components";
import { useModal } from "../../../hooks";
import { useId } from "react";

export function HomeTab(): JSX.Element {
    const { openModal } = useModal();
    const id = useId();

    return (
        <section className={styles.hometab_wrapper}>
            <div className={styles.hometab_content}>
                <div className={styles.hometab_header_strip}>
                    <button onClick={():void => {
                        openModal(<AddTaskModal key={id} title="Add Task" form={<AddTaskModalForm />} />)
                    }}>Add Task <HiPlus /></button>
                </div>
            </div>
        </section>
    )
}