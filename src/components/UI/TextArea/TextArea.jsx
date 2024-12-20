import React from 'react'
import s from './TextArea.module.scss'

const TextArea = ({ 
    placeholder, 
    value, 
    onChange, 
    label, 
    withDots = false, 
    sample,
    disabled,
    height = 170
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && withDots) {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart;
            const textBeforeCursor = value.slice(0, cursorPosition);
            const textAfterCursor = value.slice(cursorPosition);
            
            const newValue = textBeforeCursor + '\n• ' + textAfterCursor;
            onChange(newValue);
            
            setTimeout(() => {
                e.target.selectionStart = cursorPosition + 3;
                e.target.selectionEnd = cursorPosition + 3;
            }, 0);
        }
    };

    const handleSampleClick = () => {
        onChange(sample);
    };

    return (
        <div className={s.textAreaWrapper}>
            <div className={s.labelContainer}>
                <div className={s.labelWithTemplate}>
                    <label>{label}</label>
                    {sample && (
                        <span 
                            className={s.sample}
                            onClick={handleSampleClick}
                        >
                            Использовать шаблон
                        </span>
                    )}
                </div>
            </div>
            <textarea
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ height: `${height}px` }}
            />
        </div>
    )
}

export default TextArea 