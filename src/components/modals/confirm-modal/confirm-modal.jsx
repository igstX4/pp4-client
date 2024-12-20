import React from 'react'
import Modal from '../../UI/Modal/Modal'
import s from './confirm-modal.module.scss'

const ConfirmModal = ({ isModalOpened, setIsModalOpened, onConfirm, title, text }) => {
    return (
        <Modal 
            button1={{text: 'Удалить', onClick: onConfirm}} 
            button2={{text: 'Отмена', onClick: () => setIsModalOpened(false)}} 
            isOpened={isModalOpened} 
            setOpen={setIsModalOpened} 
            title={title}
        >
            <div className={s.content}>
                <p className={s.text}>{text}</p>
            </div>
        </Modal>
    )
}

export default ConfirmModal 