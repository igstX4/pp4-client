import React, { useEffect, useState } from 'react'
import s from './AdminLayout.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuSvg } from '../../svgs'
import adminLogo from '../../assets/adminLogo.png'
import axios from '../../core/axios'

const AdminLayout = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  console.log(data, isLoading)
  const getMe = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.get('/admin/me')
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getMe()
  }, [])
  useEffect(() => {
    if (!data && !isLoading) {
      navigate('/login')
    }
  }, [data, isLoading])

  if (isLoading) {
    return <div className={s.loading}>Загрузка...</div>
  }
  return (
    <div className={s.adminLayoutWrapper}>
      <div className={s.sidebar}>
        <div className={s.sidebarHeader}>
            <img src={adminLogo} alt="adminLogo" />
            <h2>Мальцевидзе</h2>
        </div>
        <div className={s.items}>
            <div onClick={() => navigate('/admin/categories')} className={s.item}>
                <MenuSvg />
                <p>Категории</p>
            </div>
            <div onClick={() => navigate('/admin')} className={s.item}>
                <MenuSvg />
                <p>Товары</p>
            </div>
            <div onClick={() => navigate('/admin/spoilers')} className={s.item}>
                <MenuSvg />
                <p>Спойлеры</p>
            </div>
        </div>
        <div onClick={() => navigate('/')} className={s.backToSite}>
            <h2>Вернуться на сайт</h2>
        </div>
      </div>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
