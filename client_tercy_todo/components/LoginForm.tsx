import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';

export function LoginForm(): JSX.Element{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function submitLogin(){
        if (email && password){
            console.log({
                email,
                password
            })
            // signIn('credentials_email', {
            //     email,
            //     password,
            //     redirect: false
            // }).then((res)=>{
            //     console.log(res);
            // }).catch((e)=>{
            //     console.log(e);
            // })
            const loginData = await axios.post(`${process.env.SERVER_URL ?? `http://localhost:5000`}/auth/login`, {
                    password: password,
                    email: email
                }).then((res)=>{
                    return res;
                }).catch((e)=>{console.log(e)});

            console.log(loginData);
        }
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
            <input type={'email'} placeholder={'Enter Email'} onChange={(e):void=>{
                setEmail(e.target.value);
            }} />
            <input type={"password"} placeholder={"Enter Password"} onChange={(e):void=>{
                setPassword(e.target.value);
            }} />
            <button type="submit" onClick={():void=>{
                submitLogin();
            }}>Login</button>
        </form>
    )
}