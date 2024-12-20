import React from 'react'
import s from './Checkbox.module.scss'
import { Tick } from '../../../svgs'

const CheckBox = ({ onChange, isChecked }) => {
    return (
        <div onClick={onChange} className={`${s.checkbox} ${isChecked ? s.checked : ''}`}>
            <div className={`${s.tick} ${isChecked ? s.active : ''}`}>
                <Tick />
            </div>
        </div>
    )
}

export default CheckBox
