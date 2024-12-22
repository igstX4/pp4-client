import React, { useState, useEffect } from 'react'
import s from './rules-modal.module.scss'
import hook2 from '../../../assets/hook2.png'
import axios from '../../../core/axios'

const RulesModal = ({ isModalOpened, setIsModalOpened }) => {
    const [rules, setRules] = useState('')

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const { data } = await axios.get('/rules')
                setRules(data.content || '')
            } catch (error) {
                console.error('Ошибка при получении правил:', error)
            }
        }

        if (isModalOpened) {
            fetchRules()
        }
    }, [isModalOpened])

    if (!isModalOpened) return null

    return (
        <div className={`${s.rulesWrapper} ${isModalOpened ? s.active : ''}`} onClick={() => setIsModalOpened(false)}>
            <div className={s.content} onClick={e => e.stopPropagation()}>
                <div className={s.cross} onClick={() => setIsModalOpened(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={51}
                        height={52}
                        viewBox="0 0 51 52"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.06697 2.01616C2.48959 0.593532 4.79612 0.593532 6.21875 2.01616L25.5 21.2974L44.7813 2.01616C46.2039 0.593532 48.5104 0.593532 49.933 2.01616C51.3557 3.43878 51.3557 5.74531 49.933 7.16793L30.6518 26.4492L49.933 45.7304C51.3557 47.1531 51.3557 49.4596 49.933 50.8822C48.5104 52.3048 46.2039 52.3048 44.7813 50.8822L25.5 31.601L6.21875 50.8822C4.79612 52.3048 2.48959 52.3048 1.06697 50.8822C-0.355656 49.4596 -0.355656 47.1531 1.06697 45.7304L20.3482 26.4492L1.06697 7.16793C-0.355656 5.74531 -0.355656 3.43878 1.06697 2.01616Z"
                            fill="#BC071C"
                        />
                    </svg>
                </div>
                <div className={s.right}>
                    <h2>Правила Теста снастей от Вани Мальцевидзе</h2>
                    <p className={s.rulesText}>{rules}</p>
                </div>
                <div className={s.left}>
                    <img className={s.hook2} src={hook2} alt="Hook" />
                </div>
            </div>
        </div>
    )
}

export default RulesModal 