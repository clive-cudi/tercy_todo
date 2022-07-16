import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import type { loginDataTypes } from '../types';
import { useStickyState, useModal } from '../hooks';
import { useRouter } from 'next/router';
import { ErrorModal } from '../components';

interface resTypes {
    error?: '' | null
    status?: number
    ok?: boolean
    url?: string | null
}

export function LoginForm(): JSX.Element{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const session = useSession();
    const serverURL = `${process.env.SERVER_URL ?? `http://localhost:5000`}/auth/login`;
    const userTemplate = {
        userName: '',
        email: '',
        token: '',
        uid: ''
    }
    const [user, setUser] = useStickyState(userTemplate, 'tercy_todo_user');
    const router = useRouter();
    const { openModal } = useModal();

    function submitLogin(){
        if (email && password){
            // console.log({
            //     email,
            //     password
            // })

            signIn('credentials_email', {
                email,
                password,
                redirect: false
            }).then((res)=> {
                if (res?.error !== null){
                    const resError = JSON.parse(res?.error);
                    console.log(resError);
                    openModal(<ErrorModal message={resError?.message ?? 'An Error occurred during login. Please Try Again!'} />);
                } else {
                    setUser(session.data?.user.user_token?.user)
                    router.push('/');
                }
            }).catch((err)=> {
                console.log(err);
                openModal(<ErrorModal message={err?.message ?? 'An Error occurred during login attempt. Please Try Again!'} />);
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