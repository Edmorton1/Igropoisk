import { memo, useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { Context } from '../../App'
import { Link } from "react-router-dom";
import "../../css/Login.scss"

function Login():React.ReactNode {
    const store = useContext(Context)
    const {register, handleSubmit} = useForm();

    function login(data: any) {
        console.log(data)
        store.login(data)
    }
      
    return (
        <main className="login-section">
            <form onSubmit={handleSubmit((data) => login(data))}>
                <strong>Авторизация</strong>
                <input {...register('mail')} type="text" placeholder="Почта" />
                <input {...register('password')} type="password" placeholder="Пароль" />
                <button>Готово</button> <span><Link to="/registration">Зарегестрироваться</Link></span>
            </form>
        </main>
    )
}

export default memo(Login)