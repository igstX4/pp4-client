import React from 'react'
import s from './Header.module.scss'
import logo from '../../assets/adminLogo.png'
import { YoutubeLogo } from '../../svgs'
import { Link, animateScroll as scroll, scroller } from "react-scroll"

const Header = ({ setIsRulesModalOpened }) => {
  const handleClick = (to) => {
    scroller.scrollTo(to, {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: -60,
    });
  }

  return (
    <div className={s.header}>
      <div onClick={() => window.location.reload()} className={s.header__logo}>
        <img src={logo} alt='logo'/>
        <p>Мальцевидзе</p>
      </div>
      <div onClick={() => window.open('https://www.youtube.com/@malcev007', '_blank')} className={s.header__social}>
        <span>Стримы каждый день <YoutubeLogo /> присоединяйся!</span>
         <div className={s.responsible}><YoutubeLogo /> </div>
      </div>
      <div className={s.header__menu}>
        <a className={s.where} href='https://vk.com/pp4farmtrof'>Где клюет?</a>
        <a onClick={() => handleClick('catalog')}>Асортимент</a>
        <a onClick={() => setIsRulesModalOpened(true)}>Правила</a>
        <a onClick={() => handleClick('footer')}>Контакты</a>
      </div>
    </div>
  )
}

export default Header
