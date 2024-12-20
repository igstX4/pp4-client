import React, { useState, useEffect } from 'react'
import Modal from '../../UI/Modal/Modal'
import s from './add-spoiler-modal.module.scss'
import Input from '../../UI/Input/Input'
import TextArea from '../../UI/TextArea/TextArea'
import axios from '../../../core/axios'

const AddSpoilerModal = ({isModalOpened, setIsModalOpened, editingSpoiler, setEditingSpoiler, onSuccess}) => {
    const [question, setQuestion] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        if (editingSpoiler) {
            setQuestion(editingSpoiler.question)
            setText(editingSpoiler.text)
        } else {
            setQuestion('')
            setText('')
        }
    }, [editingSpoiler])

    const handleSubmit = async () => {
        try {
            if (editingSpoiler) {
                await axios.patch(`/spoilers/${editingSpoiler._id}`, {
                    question,
                    text
                })
            } else {
                await axios.post('/spoilers', {
                    question,
                    text
                })
            }
            setIsModalOpened(false)
            setEditingSpoiler(null)
            onSuccess()
        } catch (error) {
            console.error('Ошибка при сохранении спойлера:', error)
        }
    }

    return (
        <Modal 
            button1={{
                text: editingSpoiler ? 'Сохранить' : 'Создать спойлер',
                onClick: handleSubmit
            }} 
            button2={{
                text: 'Отмена',
                onClick: () => {
                    setIsModalOpened(false)
                    setEditingSpoiler(null)
                }
            }} 
            isOpened={isModalOpened} 
            setOpen={setIsModalOpened} 
            title={editingSpoiler ? 'Редактирование спойлера' : 'Новый спойлер'}
        >
            <div className={s.content}>
                <Input 
                    label={'Вопрос'} 
                    placeholder={'Введите вопрос'} 
                    value={question} 
                    onChange={setQuestion}
                />
                <div className={s.descriptionArea}>
                    <TextArea 
                        label="Текст"
                        placeholder="Введите текст"
                        value={text}
                        onChange={setText}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AddSpoilerModal

// AddSpoilerModal