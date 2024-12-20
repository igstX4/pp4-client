import React, { useState, useRef, useEffect } from 'react'
import s from './DateTimePicker.module.scss'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const DateTimePicker = ({ isEnabled, onChange, value }) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('date');
    const wrapperRef = useRef(null);

    const hours = Array.from({ length: 13 }, (_, i) => i + 8);
    const minutes = ['00', '30'];

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setStep('date');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        if (isEnabled) {
            setIsOpen(!isOpen);
            setStep('date');
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setStep('time');
    };

    const handleTimeSelect = (hours, minutes) => {
        const newDate = new Date(selectedDate);
        newDate.setHours(hours);
        newDate.setMinutes(parseInt(minutes));
        setSelectedDate(newDate);
        setIsOpen(false);
        setStep('date');
        onChange && onChange(newDate);
    };

    const formatDate = (date) => {
        if (!date) return 'Выберите дату и время';
        
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return date.toLocaleString('ru', options).replace(',', '');
    };

    return (
        <div className={s.datePickerWrapper} ref={wrapperRef}>
            <button 
                className={`${s.dateButton} ${!isEnabled ? s.disabled : ''}`}
                onClick={handleClick}
                disabled={!isEnabled}
            >
                <span>{formatDate(selectedDate)}</span>
            </button>
            {isOpen && (
                <div className={s.pickerContainer}>
                    {step === 'date' ? (
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateSelect}
                            inline
                            minDate={new Date()}
                            dateFormat="dd.MM.yyyy"
                        />
                    ) : (
                        <div className={s.timeSelector}>
                            <div className={s.timeHeader}>Выберите время</div>
                            <div className={s.timeGrid}>
                                {hours.map(hour => (
                                    minutes.map(minute => (
                                        <button
                                            key={`${hour}:${minute}`}
                                            className={s.timeButton}
                                            onClick={() => handleTimeSelect(hour, minute)}
                                        >
                                            {`${hour}:${minute}`}
                                        </button>
                                    ))
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DateTimePicker; 