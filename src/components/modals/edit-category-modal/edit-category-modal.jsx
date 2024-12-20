import React, { useState, useEffect } from 'react'
import Modal from '../../UI/Modal/Modal'
import s from './edit-category-modal.module.scss'
import Input from '../../UI/Input/Input'
import axios from '../../../core/axios'

const EditCategoryModal = ({isModalOpened, setIsModalOpened, getCategories, category}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (category) {
            setName(category.name)
        }
    }, [category])

    const editCategory = async () => {
        try {
            await axios.put(`categories/${category._id}`, {name})
            setName('')
            setError('')
            setIsModalOpened(false)
            getCategories()
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при изменении категории')
        }
    }

    return (
        <Modal 
            button1={{text: 'Сохранить', onClick: editCategory}} 
            button2={{text: 'Отмена', onClick: () => {
                setIsModalOpened(false)
                setError('')
                setName(category?.name || '')
            }}} 
            isOpened={isModalOpened} 
            setOpen={setIsModalOpened} 
            title='Редактирование категории'
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

export default EditCategoryModal 