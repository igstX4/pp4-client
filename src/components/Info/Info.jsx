import React from 'react'
import s from './Info.module.scss'
import line from '../../assets/line.png'
import fisherman from '../../assets/fisherman.png'
import vertical_line from '../../assets/vertical_line.png'
import img1 from '../../assets/1.png'
import img2 from '../../assets/2.png'
import img3 from '../../assets/3.png'
import img4 from '../../assets/4.png'
import plus from '../../assets/plujs.svg'
import ban from '../../assets/ban.png'
import { scroller } from 'react-scroll'

const Info = () => {
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
        <div className={s.wrapper}>
            <div className={s.infoBlock}>
                <img className={s.fisherman} src={fisherman} alt="fisherman" />
                <img className={s.second_ban} src={ban} alt='ban'/>
                <img className={s.first_ban} src={ban} alt='ban'/>
                <div className={s.quarterSircle}></div>
                <div className={s.linesWrapper}>
                    <div className={s.lines}>
                        <img src={line} alt="line" />
                        <img src={line} alt="line" />
                        <img src={line} alt="line" />
                        <img src={line} alt="line" />
                    </div>
                </div>

                <div className={s.content}>
                    <div className={s.title_div}>
                        <img className={s.first_line} src={vertical_line} alt="vertical_line" />
                        <h1>Огромный выбор снастей разного
                            качества и длительный <span className={s.span1}>срок <img className={s.second_line} src={vertical_line} alt="vertical_line" />
                            </span>  </h1>
                    </div>
                    <p className={s.description}>Если вы хотите сдавать свои снасти на Тест и зарабатывать золотые монеты РР4, но у Вас нет времени или желания,
                        мы поможем сдать Ваши снасти за нашу комиссию.</p>
                    <h2>Мы гарантируем качество и надежность наших услуг!</h2>
                    <div className={s.warning_container}>
                        <p className={s.warning}>Если у кого то есть желание обмануть и не вернуть снасти, удалите их из своей головы -</p>
                        <p className={s.warning}>Вы будете забанены АДМИНИСТРАЦИЕЙ РР4 и снасти будут возвращены. Давайте жить честно и дружно и играть в нашу любимую игру.</p>
                    </div>
                </div>

                
            </div>
            <div className={s.imagesList}>
                    <div className={s.item}><img src={img1} alt="item 1" /></div>
                    <div className={s.item}><img src={img2} alt="item 2" /></div>
                    <div className={s.item}><img src={img3} alt="item 3" /></div>
                    <div className={s.item}><img src={img4} alt="item 4" /></div>
                    <div className={s.item}><img src={img1} alt="item 1" /></div>
                    <div className={s.item}><img src={img2} alt="item 2" /></div>
                    <div className={s.item}><img src={img3} alt="item 3" /></div>
                    <div onClick={() => handleClick('footer')} className={s.plusButton}><img src={plus}/></div>
                    <div className={s.item}><img src={img4} alt="item 4" /></div>
                    <div className={s.item}><img src={img1} alt="item 1" /></div>
                    <div className={s.item}><img src={img2} alt="item 2" /></div>
                    <div className={s.item}><img src={img3} alt="item 3" /></div>
                    <div className={s.item}><img src={img4} alt="item 4" /></div>
                    <div className={s.item}><img src={img1} alt="item 1" /></div>
                    <div className={s.item}><img src={img2} alt="item 2" /></div>
                </div>
        </div>
    )
}

export default Info
