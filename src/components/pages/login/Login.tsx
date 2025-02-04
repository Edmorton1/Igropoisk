import { useContext } from "react";
import { useForm } from "react-hook-form"
import { Context } from '../../App'
import { Link } from "react-router-dom";

function Login():React.ReactNode {
    const store = useContext(Context)
    const {register, handleSubmit} = useForm();

    function login(data: any) {
        console.log(data)
        store.login(data)
    }
      
    return (
        <main>
            <form onSubmit={handleSubmit((data) => login(data))}>
                <p><strong>Авторизация</strong></p>
                <p><input {...register('mail')} type="text" placeholder="Почта" value='test@gmail.com' /></p>
                <p><input {...register('password')} type="text" placeholder="Пароль" value='123' /></p>
                <p><button>Готово</button> <Link to="/registration">Зарегестрироваться</Link></p>
            </form>
            <button onClick={() => store.refresh()}>REFRESH</button>
            <p></p>
            <button onClick={() => store.logout()}>LOGOUT</button>
        </main>
    )
}

export default Login

// <p><strong>ЛОГИНИЗАЦИЯ</strong></p>
// <input {...register('mail')} type="text" placeholder="Почта" value='test@gmail.com' />
// <input {...register('password')} type="text" placeholder="Пароль" value='123' />

// <p><strong>РЕГИСТРАЦИЯ</strong></p>
// <input {...register('nickname')} type="text" placeholder="Ник" value='BEfCK' />
// <input {...register('mail')} type="text" placeholder="Почта" value='test@mdfail.com' />
// <input {...register('password')} type="text" placeholder="Пароль" value='123' />