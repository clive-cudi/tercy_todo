import { useState, useEffect } from "react";
import { Input, Button } from "../../components";
import styles_btn from "../../styles/components/reusable/Buttons/button.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";

export const AddTaskModalForm = (): JSX.Element=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const session = useSession();


    // useEffect(()=>{console.log(session.data?.user.token?.tercy_token)}, [session]);

    function submitTask(): void{
        axios.post("http://localhost:5000/tasks/addtask", {task_data: {title, description, expiry: {date: dueDate}}}, {headers: {Authorization: `${session.data?.user?.token?.tercy_token}`}})
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
            <Input type={"text"} placeholder="Enter task title" onChange={(e)=>{setTitle(e.target.value)}} />
            <Input type={"text"} placeholder="Enter task description" onChange={(e)=>{setDescription(e.target.value)}} />
            <Input type={'date'} placeholder="Enter task due date" onChange={(e)=>{setDueDate(e.target.value)}} />
            <Button type={"submit"} className={styles_btn.add_task_btn} onClick={()=>{submitTask()}}>Add Task</Button>
        </form>
    )
}