import React from 'react'
import s from './Input.module.scss'

const Input = ({placeholder, type, value, onChange, label, disabled}) => {
  return (
    <div className={s.inputWrapper}>
        <label>{label}</label>
      <input type={type} disabled={disabled} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}

export default Input
