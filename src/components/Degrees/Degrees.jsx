import React from 'react'
import s from './Degrees.module.scss'

const Degrees = ({ lessMargin }) => {
    return (
        <div className={`${s.wrapper} ${lessMargin ? s.lessMargin : ''}`}>
            <div className={s.degrees}>
                <p className={s.not90}>180°</p>
                <p className={s.not90}>150°</p>
                <p className={s.not90}>120°</p>
                    <p>90°</p>
                    <p>60°</p>
                    <p>30°</p>
                    <p>0°</p>
                    <p>30°</p>
                    <p>60°</p>
                    <p>90°</p>
                <p className={s.not90}>120°</p>
                <p className={s.not90}>150°</p>
                <p className={s.not90}>180°</p>
            </div>
        </div>
    )
}

export default Degrees
