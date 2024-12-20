import React, { useState, useEffect } from 'react'
import s from './admin-spoilers.module.scss'
import { Edit, Trash } from '../../svgs'
import CheckBox from '../UI/Checkbox/Checkbox'
import AddSpoilerModal from '../modals/add-spoiler-modal/add-spoiler-modal'
import axios from '../../core/axios'

const Item = ({ question, _id, setChosenIds, chosenIds, onEdit, onDelete }) => {
    const handleCheckbox = () => {
        if (chosenIds.includes(_id)) {
            setChosenIds(prev => prev.filter(id => id !== _id))
        } else {
            setChosenIds(prev => [...prev, _id])
        }
    }

    return (
        <div className={s.item}>
            <div className={s.left}>
                <div className={s.checkbox}>
                    <CheckBox
                        isChecked={chosenIds.includes(_id)}
                        onChange={handleCheckbox}
                    />
                </div>
                <div className={s.info}>
                    <p className={s.name}>{question}</p>
                </div>
            </div>
            <div className={s.right}>
                <div className={s.edit} onClick={() => onEdit(_id)}><Edit /></div>
                <div className={s.verticalLine2}></div>
                <div className={s.trash} onClick={() => onDelete(_id)}><Trash /></div>
            </div>
        </div>
    )
}

export const AdminSpoilers = () => {
    const [spoilers, setSpoilers] = useState([])
    const [chosenIds, setChosenIds] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [editingSpoiler, setEditingSpoiler] = useState(null)

    const fetchSpoilers = async () => {
        try {
            const response = await axios.get('/spoilers')
            setSpoilers(response.data)
        } catch (error) {
            console.error('Ошибка при загрузке спойлеров:', error)
        }
    }

    useEffect(() => {
        fetchSpoilers()
    }, [])

    const handleEdit = async (id) => {
        const spoiler = spoilers.find(s => s._id === id)
        setEditingSpoiler(spoiler)
        setIsModalOpened(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот спойлер?')) {
            try {
                await axios.delete(`/spoilers/${id}`)
                fetchSpoilers()
            } catch (error) {
                console.error('Ошибка при удалении спойлера:', error)
            }
        }
    }

    const handleDeleteSelected = async () => {
        if (window.confirm(`Вы уверены, что хотите удалить выбранные спойлеры (${chosenIds.length})?`)) {
            try {
                await Promise.all(chosenIds.map(id => axios.delete(`/spoilers/${id}`)))
                fetchSpoilers()
                setChosenIds([])
            } catch (error) {
                console.error('Ошибка при удалении спойлеров:', error)
            }
        }
    }

    return (
        <div className={s.adminProductsWrapper}>
            <AddSpoilerModal 
                isModalOpened={isModalOpened} 
                setIsModalOpened={setIsModalOpened}
                editingSpoiler={editingSpoiler}
                setEditingSpoiler={setEditingSpoiler}
                onSuccess={fetchSpoilers}
            />
            <h1 className={s.title}>Спойлеры</h1>
            <div className={s.topControls}>
                <div className={s.info}>
                    <p>Всего спойлеров: <span className={s.quantity}>{spoilers.length}</span></p>
                    {chosenIds.length > 0 && (
                        <p className={s.link} onClick={handleDeleteSelected}>
                            Удалить выделенные спойлеры <span className={s.chosen}>(Выбрано {chosenIds.length})</span>
                        </p>
                    )}
                </div>
                <button onClick={() => {
                    setEditingSpoiler(null)
                    setIsModalOpened(true)
                }} className={s.blackButton}>
                    Добавить спойлер
                </button>
            </div>
            <div className={s.items}>
                {spoilers.map(spoiler => (
                    <Item
                        key={spoiler._id}
                        {...spoiler}
                        chosenIds={chosenIds}
                        setChosenIds={setChosenIds}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}