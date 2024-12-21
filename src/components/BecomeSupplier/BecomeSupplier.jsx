import React from 'react'
import s from './BecomeSupplier.module.scss'
import fisherMan from '../../assets/bgFIsher.png'
import fishIcon from '../../assets/fishIcon.png'
import white_line from '../../assets/white_line.png'
import roundedText from '../../assets/roundedText.png'
import bgFisher from '../../assets/bgFIsher.png'
import { scroller } from 'react-scroll'

const BecomeSupplier = () => {
    
    return (
        <div className={s.becomeSupplierWrapper}>
            <img className={s.roundedText} src={roundedText} alt="roundedText" />
            <div className={s.becomeSupplierContainer} style={{
                backgroundImage: `linear-gradient(95.13deg, #090707 48.22%, #931618 93.71%), url(${fisherMan})`,
                '--bg-fisher': `url(${bgFisher})`
            }}>
                <img className={s.fishIcon} src={fishIcon} alt='fishIcon' />
                <div className={s.leftDiv}>
                    <h2>Стань поставщиком <span>снастей! <img className={s.second_line} src={white_line} alt="vertical_line" /> </span></h2>
                    <div className={s.bottomLeft}>
                        <p>Есть лишние снасти и хочешь заработать на комиссии?</p>
                        <p>Мы поможем тебе в этом с помощью нашего сайта!</p>
                    </div>
                </div>
                <div className={s.rightDiv}>
                    <button onClick={() => window.open('https://t.me/cyberbit')} className={s.blackButton}>Связаться</button>
                </div>
            </div>
        </div>
    )
}

export default BecomeSupplier
