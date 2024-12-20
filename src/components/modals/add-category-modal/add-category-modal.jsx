import React, { useState, useRef } from 'react'
import Modal from '../../UI/Modal/Modal'
import s from './add-category-modal.module.scss'
import Input from '../../UI/Input/Input'
import TextArea from '../../UI/TextArea/TextArea'
import axios from '../../../core/axios'

const sampleText = `• ПЕРЕДАТОЧНОЕ ЧИСЛО -
• ФРИКЦИОН - 
• ДВИГАТЕЛЬ - 
• МЕХАНИЗМ - 
• СКОРОСТЬ - 
• ТЕСТ - от `;
const sampleText2 = `4 часа =
8 часов =
1 сутки = 
2 суток = 
3 суток = 
4 суток = 
5 суток =
6 суток =
7 суток =`;

const AddCategoryModal = ({isModalOpened, setIsModalOpened, getCategories}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const createCategory = async () => {
        try {
            const {data} = await axios.post('categories', {name})
            console.log(data)
            setName('')
            setError('')
            setIsModalOpened(false)
            getCategories()
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при создании категории')
        }
    }

    return (
        <Modal 
            button1={{text: 'Создать категорию', onClick: createCategory}} 
            button2={{text: 'Отмена', onClick: () => {
                setIsModalOpened(false)
                setError('')
                setName('')
            }}} 
            isOpened={isModalOpened} 
            setOpen={setIsModalOpened} 
            title='Создание категории'
        >
            <div className={s.content}>
                <Input 
                    label={'Категория'} 
                    placeholder={''} 
                    value={name} 
                    onChange={setName}
                    error={error}
                />
            </div>
        </Modal>
    )
}

export default AddCategoryModal
