import React, { useState } from 'react';
import s from './AdminProducts.module.scss';

const CheckUrlPopup = ({ checkUrl, onSave, onClose }) => {
    const [url, setUrl] = useState(checkUrl || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(url);
        onClose();
    };

    return (
        <div className={s.checkUrlPopup}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Введите URL для проверки"
                />
                <div className={s.buttons}>
                    <button type="submit" className={s.saveButton}>Сохранить</button>
                    <button type="button" onClick={onClose} className={s.cancelButton}>Отмена</button>
                </div>
            </form>
        </div>
    );
};

export default CheckUrlPopup; 