import React from 'react'
import s from './Toggle.module.scss'

const Toggle = ({ isChecked, onChange }) => {
    return (
        <div onClick={onChange} className={`${s.toggle} ${isChecked ? s.checked : ''}`}>
            <div className={`${s.circle} ${isChecked ? s.active : ''}`}></div>
        </div>
    )
}

export default Toggle 