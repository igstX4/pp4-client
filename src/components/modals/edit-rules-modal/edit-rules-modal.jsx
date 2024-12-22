import React, { useState, useEffect } from 'react'
import Modal from '../../UI/Modal/Modal'
import s from './edit-rules-modal.module.scss'
import TextArea from '../../UI/TextArea/TextArea'
import axios from '../../../core/axios'

const EditRulesModal = ({isModalOpened, setIsModalOpened}) => {
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const fetchRules = async () => {
        try {
            const { data } = await axios.get('/rules')
            setContent(data.content || '')
        } catch (error) {
            console.error('Ошибка при получении правил:', error)
        }
    }

    useEffect(() => {
        if (isModalOpened) {
            fetchRules()
        }
    }, [isModalOpened])

    const handleSave = async () => {
        try {
            await axios.put('/rules', { content })
            setIsModalOpened(false)
            setError('')
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при сохранении правил')
        }
    }

    return (
        <Modal 
            button1={{text: 'Сохранить', onClick: handleSave}} 
            button2={{text: 'Отмена', onClick: () => {
                setIsModalOpened(false)
                setError('')
                fetchRules()
            }}} 
            isOpened={isModalOpened} 
            setOpen={setIsModalOpened} 
            title='Редактирование правил'
        >
            <div className={s.content}>
                <div className={s.descriptionArea}>
                    <TextArea 
                        label="Правила"
                        placeholder="Введите правила"
                        value={content}
                        onChange={setContent}
                        error={error}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default EditRulesModal 