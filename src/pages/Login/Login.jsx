import React, { useState } from 'react'
import Input from '../../components/UI/Input/Input'
import s from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from '../../core/axios'


const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const loginHandler = async () => {
        try {
          const {data} = await axios.post('/admin/login', {password, login})
        if (data) {
          console.log(data)
          localStorage.setItem('token', data.token)
          navigate('/admin')
        } else {
          setError('Неверный логин или пароль')
        }
        } catch (error) {
          setError('Неверный логин или пароль')
        }
    }
  return (
    <div className={s.loginWrapper}>
      <div className={s.loginContainer}>
        <h1>Вход в Админ-панель</h1>
        <div className={s.inputContainer}>
            <Input type="text" placeholder='user' value={login} onChange={setLogin} label='Логин' />
            <Input type="password" placeholder='****' value={password} onChange={setPassword} label='Пароль' />
        </div>
        <button className={s.blackButton} onClick={loginHandler}>Войти</button>
        {error && <div className={s.error}>{error}</div>}
      </div>
    </div>
  )
}

export default Login
