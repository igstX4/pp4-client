import React from 'react'
import { useState, useEffect } from 'react';
import styles from './Modal.module.scss'
const Modal = ({ children, isOpened, setOpen, title, button1, button2 }) => {

    const [isRendered, setIsRendered] = useState(false); // Отвечает за наличие компонента в DOM
    const [isClosing, setIsClosing] = useState(false); // Запускает анимацию закрытия

    useEffect(() => {
        if (isOpened) {
            setIsRendered(true); // Показываем модальное окно
        } else if (isRendered) {
            setIsClosing(true); // Запускаем анимацию закрытия
            const timer = setTimeout(() => {
                setIsClosing(false); // Сбрасываем состояние
                setIsRendered(false); // Удаляем из DOM
            }, 300); // Время анимации должно совпадать с CSS
            return () => clearTimeout(timer); // Чистим таймер при размонтировании
        }
    }, [isOpened, isRendered]);

    const handleClose = () => {
        setIsClosing(true); // Запускаем анимацию закрытия
        const timer = setTimeout(() => {
            setOpen(false); // Меняем состояние открытия
            setIsClosing(false); // Сбрасываем состояние
            setIsRendered(false); // Убираем из DOM
        }, 300);
        return () => clearTimeout(timer);
    };

    if (!isRendered) return null; // Убираем из DOM, если окно не активно

    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`}
            onClick={handleClose}
        >
            <div
                style={styles}
                className={`${styles.modal} ${isClosing ? styles.slideOut : styles.slideIn}`}
                onClick={(e) => e.stopPropagation()} // Останавливаем всплытие клика
            >
                <div className={styles.content}>
                    <div className={styles.topDiv}>
                        <h1 className={styles.heading}>{title}</h1>
                        <div className={styles.closeButton1} onClick={handleClose}>
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

                    </div>
                    {children}
                    <div className={styles.buttons}>
                        <button
                            onClick={button1.onClick}
                            className={styles.blackButton}
                        >
                            {button1.text}
                        </button>
                        <button
                            onClick={button2.onClick}
                            className={styles.grayButton}
                        >
                            {button2.text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal
