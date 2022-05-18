import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export function LoginForm(): JSX.Element{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const session = useSession();
    const serverURL = `${process.env.SERVER_URL ?? `http://localhost:5000`}/auth/login`;

    async function submitLogin(){
        if (email && password){
            // console.log({
            //     email,
            //     password
            // })
            signIn('credentials_email', {
                email,
                password,
                redirect: false
            }).then((res)=>{
                console.log(res);
                console.log(session);
            }).catch((e)=>{
                console.log(e);
            })
            // const loginData = await axios.post(`${process.env.SERVER_URL ?? `http://localhost:5000`}/auth/login`, {
            //         password: password,
            //         email: email
            // })

            // console.log(serverURL);
            // axios.get(serverURL).then((res)=>{
            //     console.log(res);
            // }).catch((e)=>{
            //     console.log(e);
            // })

            // console.log(loginData);
        }
    }

    // useEffect(()=>{
    //     console.log(serverURL);
    //     axios.get(serverURL).then((res)=>{
    //         console.log(res);
    //     }).catch((e)=>{
    //         console.log(e);
    //     })
    // },[])

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