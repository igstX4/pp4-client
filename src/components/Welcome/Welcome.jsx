import React from 'react'
import s from './Welcome.module.scss'
import fishIcon1 from '../../assets/fishIcon1.png'
import fishIcon2 from '../../assets/fishIcon2.png'
import line from '../../assets/line.png'
import { scroller } from 'react-scroll'
import { Element } from 'react-scroll'

const Welcome = () => {
    const handleClick = (to) => {
        scroller.scrollTo(to, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -60, // Scrolls to element + 50 pixels down the page
            // ... other options
        });
    }
    return (
        <Element name='welcome'>
            <div className={s.welcome}>
                <img className={s.fishIcon1} src={fishIcon1} alt="fishIcon1" />
                <img className={s.fishIcon2} src={fishIcon2} alt="fishIcon2" />

                {/* <img src={line} alt="line" /> */}
                <div className={s.wrapper}>
                    <div className={s.linesWrapper}>
                        <div className={s.lines}>
                            <img src={line} alt="line" />
                            <img src={line} alt="line" />
                            <img src={line} alt="line" />
                            <img src={line} alt="line" />
                        </div>
                    </div>
                    <div className={s.WelcomeTextBlock}>
                        <h1 className={s.topText}>Аренда Снастей от</h1>
                        <div className={s.bottomTextBlock}><h1 className={s.bottomText}>Мальцевидзе</h1></div>
                    </div>
                    <div className={s.buttonBlock}>
                        <p className={s.description}>В РР4 нет понятия АРЕНДЫ СНАСТЕЙ, есть понятие ТЕСТИРОВАНИЕ СНАСТЕЙ.
                            Просим везде употреблять слово "ТЕСТИРОВАНИЕ" снастей, вместо "АРЕНДА"</p>
                        <div className={s.buttons}>
                            <button onClick={() => handleClick('catalog')} className={s.whiteButton}>Асортимент</button>
                            <button onClick={() => handleClick('footer')} className={s.blackButton}>Связаться</button>
                        </div>
                    </div>
                </div>
            </div>
        </Element>
    )
}

export default Welcome
