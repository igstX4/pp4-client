import React, { useState, useRef, useEffect } from 'react';
import s from './FAQ.module.scss';

const FAQItem = ({ question, answers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, answers]);

    return (
        <div className={s.faqItem}>
            <button 
                className={`${s.questionButton} ${isOpen ? s.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <div className={s.arrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
            </button>
            <div 
                className={`${s.answerWrapper} ${isOpen ? s.open : ''}`}
                style={{ height: `${contentHeight}px` }}
            >
                <div ref={contentRef} className={s.answer}>
                    {answers.map((answer, index) => (
                        <p key={index} className={s.answerItem}>{answer}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQItem; 