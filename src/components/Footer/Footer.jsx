import React from 'react'
import s from './Footer.module.scss'
import gray_fish_icon from '../../assets/gray_fish_icon.png'
import { YoutubeLogo2 } from '../../svgs'
import footerLogo from '../../assets/footerLogo.png'
import fishIcon5 from '../../assets/fishIcon5.png'
import fishIcon6 from '../../assets/fishIcon6.png'
import { scroller, Element } from 'react-scroll'


const Footer = ({setIsRulesModalOpened}) => {
    const handleClick = (to) => {
        scroller.scrollTo(to, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -100, // Scrolls to element + 50 pixels down the page
            // ... other options
        });
    }
    return (
        <Element name='footer'>
            <div className={s.footerWrapper}>
            <img className={s.fishIcon5} src={fishIcon5} alt="fishIcon5" />
            <img className={s.fishIcon6} src={fishIcon6} alt="fishIcon6" />
            <div className={s.footerContainer}>
                <div className={s.top}>
                    <img className={s.grayFishIcon} src={gray_fish_icon} alt="gray_fish_icon" />
                    <h1>Контакты</h1>

                    <div className={s.blocks}>
                        <div className={s.block}>
                            <h5>Поддержка</h5>
                            <p>@yuliyamalcevidzerf4</p>
                        </div>
                        <div className={s.block}>
                            <h5>Почта:</h5>
                            <p>santexlider@bk.ru</p>
                        </div>

                        <div onClick={() => window.open('https://www.youtube.com/@malcev007')} className={s.block}>
                            <YoutubeLogo2 />
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => window.open('https://vk.com/pp4farmtrof')} className={s.block}>
                            <h5>Где клюет?</h5>
                            <p>vk.com/pp4farmtrof</p>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => window.open('https://t.me/pp4farmtrof')} className={s.block}>
                            <h5>Telegram канал:</h5>
                            <p>t.me/pp4farmtrof</p>
                        </div>


                    </div>
                </div>
                <div className={s.bottom}>
                    <img src={footerLogo} alt="footerLogo" />
                    <div className={s.links}>
                        <p onClick={() => handleClick('welcome')}>Главная</p>
                        <p onClick={() => handleClick('catalog')}>Ассортимент</p>
                        <p onClick={() => setIsRulesModalOpened(true)}>Правила</p>
                    </div>
                </div>
            </div>
        </div>
        </Element>
    )
}

export default Footer
