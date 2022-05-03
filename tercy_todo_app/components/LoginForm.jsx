export function LoginForm(){
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
            <input type={'email'} placeholder={'Enter Email'} />
            <input type={"password"} placeholder={"Enter Password"} />
            <button type="submit">Login</button>
        </form>
    )
}