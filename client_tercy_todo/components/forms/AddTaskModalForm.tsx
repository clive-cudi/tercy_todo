import { Input } from "../../components";

export const AddTaskModalForm = (): JSX.Element=>{
    return (
        <form>
            <Input type="text" placeholder="Enter task title" onChange={(e)=>{console.log(e.target.value)}} />
        </form>
    )
}