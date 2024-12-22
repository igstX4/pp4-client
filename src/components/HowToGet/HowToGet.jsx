import React from 'react'
import s from './HowToGet.module.scss'
import vertical_line from '../../assets/vertical_line.png'
import Degrees from '../Degrees/Degrees'
import line from '../../assets/line.png'
import fishIcon3 from '../../assets/fishIcon3.png'
import { scroller } from 'react-scroll'
import fishIcon4 from '../../assets/fishIcon4.png'
import { TgIcon, CopyIcon, AttentionIcon, SupportIcon } from '../../svgs'

const HowToGet = ({ setIsRulesModalOpened }) => {
    const handleClick = (to) => {
        scroller.scrollTo(to, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -60,
        });
    }
    const copy = async () => {
        await navigator.clipboard.writeText('Ваня Мальцевидзе Джуниор');
    }
    return (
        <div className={s.howToGetWrapper}>
            <img className={s.fishIcon3} src={fishIcon3} alt="fishIcon3" />
            <img className={s.fishIcon4} src={fishIcon4} alt="fishIcon4" />
            <div className={s.howToGetContainer}>
                <div className={s.linesWrapper}>
                    <div className={s.lines}>
                        <img src={line} alt="line" />
                        <img src={line} alt="line" />
                        <img src={line} alt="line" />
                        <img src={line} alt="line" />
                    </div>
                </div>
                    <h1 className={s.title}>Простые шаги для <span>получения <img className={s.second_line} src={vertical_line} alt="vertical_line" /> снастей!</span></h1>
                    <Degrees lessMargin={true} />
                    <div className={s.info_blocks}>
                        <div className={s.info_block}>
                            <p>Написать в игре РР4 игроку: <span>Ваня Мальцевидзе Джуниор</span> 🖐</p>
                        </div>
                        <div className={`${s.info_block} ${s.info_block_2}`}>
                            <p>Уточнить интересующий предмет и наличие 📃</p>
                        </div>
                        <div className={`${s.info_block} ${s.info_block_3}`}>
                            <p>Оплатить срок теста 📅</p>
                        </div>
                        <div className={`${s.info_block} ${s.info_block_4}`}>
                            <p>Получить предмет и наслаждаться ✅</p>
                        </div>
                    </div>
                    <div className={s.btns}>
                        {/* <button onClick={() => window.open('https://t.me/cyberbit')} className={s.tgBtn}><TgIcon /> Связаться с нами</button> */}
                        <button onClick={copy} className={s.copyBtn}><CopyIcon /> Скопировать имя PP4</button>
                    </div>
                    <div className={s.horizontal_line}></div>
                    <div className={s.links}>
                        <div className={s.link}>
                            <AttentionIcon />
                            <div onClick={() => setIsRulesModalOpened(true)}>
                                <h6>Правила теста</h6>
                                <p>Ознакомиться с правилами!</p>
                            </div>
                        </div>
                        <div className={s.link}>
                            <SupportIcon />
                            <div onClick={() => handleClick('spoilers')}>
                                <h6>Дополнительные ответы на вопросы</h6>
                                <p>Вопрос-ответ</p>
                            </div>
                        </div>
                    </div>
                    <Degrees lessMargin={true} />
                    
            </div>
        </div>
    )
}

export default HowToGet
