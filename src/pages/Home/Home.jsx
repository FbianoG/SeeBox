import { useForm } from "react-hook-form";

import './Home.css'
import { createUser, login } from "../../assets/ApiBack";
import { useEffect, useState } from "react";

export default function Home({ setUser }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [alert, setAlert] = useState('')
    const [logon, setLogon] = useState(false)
    const [formNewUser, setFormNewUser] = useState(false)
    useEffect(() => { localStorage.clear() }, [])

    async function logar(data) {
        setLogon(true)
        try {
            const response = await login(data)
            console.log(response);
            localStorage.setItem('User', JSON.stringify(response))
            if (response.roles === 'adm') location.href = '/painel'
            else if (response.roles === 'med') location.href = '/emerg'
            else if (response.roles === 'rec') location.href = '/recep'
            else if (response.roles === 'ger') location.href = '/leitos'
        } catch (error) {
            setAlert(error.message)
            setLogon(false)
        }
    }

    async function newUser(data) {
        setLogon(true)
        console.log(data)
        try {
            if (!data.username, !data.password, !data.secundPassword, !data.key) throw new Error('Preencha todos os campos!!')
            const response = await createUser(data)
            setFormNewUser(false)
            setAlert('')
        } catch (error) {
            setAlert(error.message)
        } finally {
            setLogon(false)
        }
    }

    return (
        <main>
            <div className="home">
                <h1>SeeBox</h1>
                {!formNewUser &&
                    <form onSubmit={handleSubmit(logar)}>
                        <h3>Login</h3>
                        <label htmlFor='username'>Usuário:</label>
                        <input type='text' id="username" {...register('username')} required />
                        <label htmlFor='password'>Senha:</label>
                        <input type='password' id="password" {...register('password')} required />
                        <span className="login__form-alert">{alert}</span>
                        {logon && <button type="submit" disabled><span></span>Entrando</button>}
                        {!logon && <button type="submit">Entrar</button>}
                        <button type="button" className="btn__createNewUser" onClick={() => { setFormNewUser(true), reset(), setAlert('') }}>Criar novo cadastro!</button>
                    </form>
                }
                {formNewUser &&
                    <form onSubmit={handleSubmit(newUser)}>
                        <h3>Criar Cadastro</h3>
                        <label htmlFor='username'>Usuário:</label>
                        <input type='text' id="username" {...register('username')} required />
                        <label htmlFor='password'>Senha:</label>
                        <input type='password' id="password" {...register('password')} required />
                        <label htmlFor='spassword'>Repita a senha:</label>
                        <input type='password' id="spassword" {...register('secundPassword')} required />
                        <label htmlFor='key'>Key fornecido:</label>
                        <input type='password' id="key" {...register('key')} />
                        <span className="login__form-alert">{alert}</span>
                        {logon && <button type="submit" disabled><span></span>Criando</button>}
                        {!logon && <button type="submit">Criar</button>}
                        <button type="button" className="btn__createNewUser cancel" onClick={() => { setFormNewUser(false), reset(), setAlert('') }}>Cancelar</button>
                    </form>
                }
            </div>

        </main>
    )
}