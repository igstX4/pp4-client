import React, { useState, useRef, useEffect } from 'react'
import s from './DateTimePicker.module.scss'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const DateTimePicker = ({ isEnabled, onChange, value }) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [timeInput, setTimeInput] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        setSelectedDate(value);
        if (value) {
            const hours = value.getHours().toString().padStart(2, '0');
            const minutes = value.getMinutes().toString().padStart(2, '0');
            setTimeInput(`${hours}:${minutes}`);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
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
        }
    };

    const handleDateSelect = (date) => {
        // Сохраняем текущее время при выборе новой даты
        const currentTime = selectedDate ? {
            hours: selectedDate.getHours(),
            minutes: selectedDate.getMinutes()
        } : { hours: 0, minutes: 0 };

        const newDate = new Date(date);
        newDate.setHours(currentTime.hours);
        newDate.setMinutes(currentTime.minutes);
        
        setSelectedDate(newDate);
        onChange && onChange(newDate);
    };

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTimeInput(value);

        // Проверяем формат времени (ЧЧ:ММ)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (timeRegex.test(value) && selectedDate) {
            const [hours, minutes] = value.split(':').map(Number);
            const newDate = new Date(selectedDate);
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            setSelectedDate(newDate);
            onChange && onChange(newDate);
        }
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
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateSelect}
                        inline
                        minDate={new Date()}
                        dateFormat="dd.MM.yyyy"
                    />
                    <div className={s.timeInput}>
                        <input
                            type="text"
                            value={timeInput}
                            onChange={handleTimeChange}
                            placeholder="ЧЧ:ММ"
                            pattern="[0-2][0-9]:[0-5][0-9]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateTimePicker; 