import React, { useState, useEffect } from 'react'
import s from './admin-spoilers.module.scss'
import { Edit, Trash } from '../../svgs'
import CheckBox from '../UI/Checkbox/Checkbox'
import AddSpoilerModal from '../modals/add-spoiler-modal/add-spoiler-modal'
import EditRulesModal from '../modals/edit-rules-modal/edit-rules-modal'
import ConfirmModal from '../modals/confirm-modal/confirm-modal'
import axios from '../../core/axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const DraggableItem = ({ item, index, ...props }) => {
    const {
        _id,
        question,
        setChosenIds,
        chosenIds,
        onEdit,
        onDelete
    } = props;

    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const draggableId = React.useMemo(() => `spoiler-${_id}`, [_id]);

    const handleCheckbox = () => {
        if (chosenIds.includes(_id)) {
            setChosenIds(prev => prev.filter(id => id !== _id))
        } else {
            setChosenIds(prev => [...prev, _id])
        }
    }

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${s.item} ${snapshot.isDragging ? s.isDragging : ''}`}
                >
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
                        <div className={s.trash} onClick={() => setIsDeleteModalOpened(true)}><Trash /></div>
                    </div>
                    <ConfirmModal 
                        isModalOpened={isDeleteModalOpened}
                        setIsModalOpened={setIsDeleteModalOpened}
                        onConfirm={() => onDelete(_id)}
                        title="Удаление спойлера"
                        text={`Вы действительно хотите удалить этот спойлер?`}
                    />
                </div>
            )}
        </Draggable>
    );
};

export const AdminSpoilers = () => {
    const [spoilers, setSpoilers] = useState([])
    const [chosenIds, setChosenIds] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [isRulesModalOpened, setIsRulesModalOpened] = useState(false)
    const [editingSpoiler, setEditingSpoiler] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchSpoilers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/spoilers');
            const validSpoilers = response.data.map((spoiler, index) => ({
                ...spoiler,
                _id: spoiler._id || `temp-${index}`
            }));
            setSpoilers(validSpoilers);
        } catch (error) {
            console.error('Ошибка при загрузке спойлеров:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleEdit = async (id) => {
        const spoiler = spoilers.find(s => s._id === id)
        setEditingSpoiler(spoiler)
        setIsModalOpened(true)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/spoilers/${id}`)
            fetchSpoilers()
        } catch (error) {
            console.error('Ошибка при удалении спойлера:', error)
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

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        try {
            const items = Array.from(spoilers);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            setSpoilers(items);

            const orders = items.map((item, index) => ({
                id: item._id,
                order: index
            }));
            
            await axios.patch('/spoilers/reorder', { orders });
        } catch (error) {
            console.error('Ошибка при обновлении порядка:', error);
            fetchSpoilers();
        }
    };

    useEffect(() => {
        fetchSpoilers()
    }, [])

    return (
        <div className={s.adminProductsWrapper}>
            <AddSpoilerModal 
                isModalOpened={isModalOpened} 
                setIsModalOpened={setIsModalOpened}
                editingSpoiler={editingSpoiler}
                setEditingSpoiler={setEditingSpoiler}
                onSuccess={fetchSpoilers}
            />
            <EditRulesModal
                isModalOpened={isRulesModalOpened}
                setIsModalOpened={setIsRulesModalOpened}
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
                <div className={s.buttons}>
                    <button onClick={() => setIsRulesModalOpened(true)} className={s.whiteButton}>
                        Редактировать правила
                    </button>
                    <button onClick={() => {
                        setEditingSpoiler(null)
                        setIsModalOpened(true)
                    }} className={s.blackButton}>
                        Добавить спойлер
                    </button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                {!isLoading && (
                    <Droppable droppableId="spoilers">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`${s.items} ${snapshot.isDraggingOver ? s.isDraggingOver : ''}`}
                            >
                                {spoilers.map((item, index) => (
                                    <DraggableItem
                                        key={item._id}
                                        item={item}
                                        index={index}
                                        {...item}
                                        chosenIds={chosenIds}
                                        setChosenIds={setChosenIds}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </DragDropContext>

            {isLoading && (
                <div className={s.loading}>Загрузка...</div>
            )}
        </div>
    )
}