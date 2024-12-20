import React, { useState, useRef } from 'react'
import Modal from '../../UI/Modal/Modal'
import s from './add-product-modal.module.scss'
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

const AddProductModal = ({isModalOpened, setIsModalOpened, getProducts, categories}) => {
    const [name, setName] = useState('')
    const [file, setFile] = useState('')
    const [mainDescription, setMainDescription] = useState('')
    const [modalDescription, setModalDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)
    const [activeCategory, setActiveCategory] = useState('')

    const handleFileButton = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Пожалуйста, выберите изображение')
                return
            }
            setFile(file)
        }
    }

    const createProduct = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('img', file)
            formData.append('category', activeCategory)
            formData.append('descriptionMain', mainDescription)
            formData.append('descriptionModal', modalDescription)
            formData.append('price', price)

            await axios.post('products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setName('')
            setFile('')
            setMainDescription('')
            setModalDescription('')
            setPrice('')
            setActiveCategory('')
            setError('')
            setIsModalOpened(false)
            getProducts()
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при создании продукта')
        }
    }

    return (
        <Modal 
            button1={{text: 'Создать товар', onClick: createProduct}} 
            button2={{text: 'Отмена', onClick: () => {
                setIsModalOpened(false)
                setError('')
                setName('')
                setFile('')
                setMainDescription('')
                setModalDescription('')
                setPrice('')
                setActiveCategory('')
            }}} 
            isOpened={isModalOpened} 
            setOpen={setIsModalOpened} 
            title='Добавление товара'
        >
            <div className={s.content}>
                <Input 
                    label={'Название товара'} 
                    placeholder={''} 
                    value={name} 
                    onChange={setName}
                    error={error}
                />
                <div className={s.addFileDiv}>
                    <Input 
                        disabled={true} 
                        label={'Изображение URL'} 
                        placeholder={''} 
                        value={file ? file.name : ''} 
                    />
                    <div className={s.btn}>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button 
                            className={s.blackButton}
                            onClick={handleFileButton}
                        >
                            Добавить файл
                        </button>
                    </div>
                </div>
                <div className={s.descriptionArea}>
                    <TextArea 
                        label="Характеристики товара(главная)"
                        placeholder="Введите описание товара"
                        value={mainDescription}
                        onChange={setMainDescription}
                        withDots={true}
                        sample={sampleText}
                    />
                </div>
                <div className={s.descriptionArea}>
                    <TextArea 
                        label="Характеристики товара(модальное окно)"
                        placeholder="Введите описание товара"
                        value={modalDescription}
                        onChange={setModalDescription}
                        withDots={true}
                        sample={sampleText}
                    />
                </div>
                <div className={s.descriptionArea}>
                    <TextArea 
                        label="Стоимость"
                        placeholder="Введите стоимость товара"
                        value={price}
                        onChange={setPrice}
                        withDots={false}
                        sample={sampleText2}
                    />
                </div>
                <div className={s.categories}>
                    {categories.map(cat => (
                        <div 
                            key={cat._id}
                            className={`${s.category} ${activeCategory === cat._id ? s.active : ''}`} 
                            onClick={() => setActiveCategory(cat._id)}
                        >
                            <p>{cat.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}

export default AddProductModal
