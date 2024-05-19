import { useForm } from "react-hook-form";

import './Home.css'
import { login } from "../../assets/ApiBack";
import { useEffect, useState } from "react";

export default function Home({ setUser }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [alert, setAlert] = useState('')
    const [logon, setLogon] = useState(false)
    useEffect(() => { localStorage.clear() }, [])

    async function logar(data) {
        try {
            setLogon(true)
            const response = await login(data)
            setUser(response);
            console.log(response);
            if (response.roles === 'adm') location.href = '/painel'
        } catch (error) {
            setAlert(error.message)
            setLogon(false)
        }
    }

    return (
        <main>
            <div className="home">
                <h1>SeeBox</h1>
                <form onSubmit={handleSubmit(logar)}>
                    <h3>Login</h3>
                    <label htmlFor='username'>Usuário:</label>
                    <input type='text' id="username" {...register('username')} />
                    <label htmlFor='password'>Senha:</label>
                    <input type='password' id="password" {...register('password')} />
                    {logon && <button type="submit" disabled><span></span>Entrando</button>}
                    {!logon && <button type="submit">Entrar</button>}
                    <span className="login__form-alert">{alert}</span>
                </form>
            </div>

        </main>
    )
}