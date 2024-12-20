import React, { useState, useEffect } from 'react'
import s from './FAQ.module.scss'
import FAQItem from './FAQItem'
import { Element } from 'react-scroll'
import axios from '../../core/axios'

const FAQ = () => {
    const [spoilers, setSpoilers] = useState([])

    useEffect(() => {
        const fetchSpoilers = async () => {
            try {
                const response = await axios.get('/spoilers')
                setSpoilers(response.data)
            } catch (error) {
                console.error('Ошибка при загрузке спойлеров:', error)
            }
        }
        fetchSpoilers()
    }, [])

    return (
        <Element name='spoilers'>
            <div className={s.faqWrapper}>
                <h1 className={s.faqTitle}>Вопросы и ответы</h1>
                <div className={s.faqContainer}>
                    {spoilers.map((spoiler) => (
                        <FAQItem 
                            key={spoiler._id}
                            question={spoiler.question}
                            answers={spoiler.text.split('\n')}
                        />
                    ))}
                </div>
            </div>
        </Element>
    )
}

export default FAQ
