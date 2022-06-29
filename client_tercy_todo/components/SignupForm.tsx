import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ErrorModal } from "../components";
import { useModal } from "../hooks";
import { useRouter } from "next/router";

interface registerAPIresponseType {
    message: string,
    user_token: {
      user: {
        email?: string
        userName?: string
        password?: string
      } | null
      token: string | null
      error: {
        status: boolean | null
        message: string | null
        code: string | null
      }
    }
} 

export function SignupForm(){
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { openModal } = useModal();
    const router = useRouter();

    function checkCredentials(): boolean{
        if (email !== ""){
            if (userName !== ""){
                if (password !== "" && confirmPassword !== ""){
                    if (confirmPassword == password){
                        return true;
                    } else {
                        openModal(<ErrorModal message={'Passwords do not match'} />);
                        return false;
                    }
                } else {
                    openModal(<ErrorModal message={'Please Enter Both Passwords'} />);
                    return false;
                }
            } else {
                openModal(<ErrorModal message={'Enter UserName'} />);
                return false;
            }
        } else {
            openModal(<ErrorModal message={'Enter Email'} />);
            return false;
        }
    }

    function submitRegister(): void{
        if (checkCredentials()){
            axios.post('http://localhost:5000/auth/register', {
                email,
                userName,
                password
            }).then((res: AxiosResponse<registerAPIresponseType, any>)=>{
                console.log(res.data);
                if (res.data.user_token.error.status == false){
                    // push to login
                    openModal(<ErrorModal message={"Successful sign in"} />);
                    router.push('/login');
                } else {
                    openModal(<ErrorModal message={"An error occurred! Please try Again"} />)
                }
            }).catch((err)=>{
                const error: registerAPIresponseType = err.response?.data;
                console.log(error.message);
                openModal(<ErrorModal message={error.message} />);
            })
        }
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
            <input type={`email`} onChange={(e):void=>{
                setEmail(e.target.value);
            }} placeholder={`Enter your email`} />
            <input type={`text`} onChange={(e):void=>{
                setUserName(e.target.value);
            }} placeholder={`Enter preferred username`} />
            <input type="password" onChange={(e):void=>{
                setPassword(e.target.value);
            }} placeholder={`Enter password`} />
            <input type="password" onChange={(e):void=>{
                setConfirmPassword(e.target.value);
            }} placeholder={`Confirm password`} />
            <button type={`submit`} onClick={():void=>{
                submitRegister();
            }}>Submit</button>
        </form>
    )
}