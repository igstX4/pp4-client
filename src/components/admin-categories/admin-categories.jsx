import React, { useState, useEffect } from 'react'
import CheckBox from '../UI/Checkbox/Checkbox'
import s from './admin-categories.module.scss'
import Toggle from '../UI/Toggle/Toggle'
import axios from '../../core/axios'
import { Clock, Edit, StrangeArrow, Trash } from '../../svgs'
import DateTimePicker from '../UI/DateTimePicker/DateTimePicker'
import AddProductModal from '../modals/add-product-modal/add-product-modal'
import AddCategoryModal from '../modals/add-category-modal/add-category-modal'
import ConfirmModal from '../modals/confirm-modal/confirm-modal'
import EditCategoryModal from '../modals/edit-category-modal/edit-category-modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const data = [
    {
        _id: '123123123',
        name: 'Катушки'
    },
    {
        _id: '123123124',
        name: 'Спиннинги'
    },
    {
        _id: '123123125',
        name: 'Лески'
    },
    {
        _id: '123123126',
        name: 'Приманки'
    }
]

const DraggableItem = ({ item, index, ...props }) => {
    const {
        _id,
        name,
        setChosenIds,
        chosenIds,
        onDelete,
        onEdit
    } = props;

    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const isGeneralCategory = name === 'Общая категория';
    const draggableId = React.useMemo(() => `category-${_id}`, [_id]);

    const handleCheckbox = () => {
        if (isGeneralCategory) return;
        if (chosenIds.includes(_id)) {
            setChosenIds(prev => prev.filter(id => id !== _id))
        } else {
            setChosenIds(prev => [...prev, _id])
        }
    }

    return (
        <Draggable draggableId={draggableId} index={index} isDragDisabled={isGeneralCategory}>
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
                                disabled={isGeneralCategory}
                            />
                        </div>
                        <div className={s.info}>
                            <p className={s.name}>{name}</p>
                        </div>
                    </div>
                    <div className={s.right}>
                        {!isGeneralCategory && (
                            <>
                                <div className={s.edit} onClick={() => onEdit({ _id, name })}><Edit /></div>
                                <div className={s.verticalLine2}></div>
                                <div className={s.trash} onClick={() => setIsDeleteModalOpened(true)}><Trash /></div>
                            </>
                        )}
                    </div>
                    <ConfirmModal 
                        isModalOpened={isDeleteModalOpened}
                        setIsModalOpened={setIsDeleteModalOpened}
                        onConfirm={() => onDelete(_id)}
                        title="Удаление категории"
                        text={`Вы действительно хотите удалить категорию "${name}"?`}
                    />
                </div>
            )}
        </Draggable>
    );
};

export const AdminCategories = () => {
    const [chosenIds, setChosenIds] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
    const [categories, setCategories] = useState([])
    const [editingCategory, setEditingCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const getCategories = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/categories');
            const validCategories = data.map((category, index) => ({
                ...category,
                _id: category._id || `temp-${index}`
            }));
            setCategories(validCategories);
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category)
        setIsEditModalOpened(true)
    }

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`/categories/${id}`)
            await getCategories()
        } catch (error) {
            throw error;
        }
    }

    const deleteSelectedCategories = async () => {
        try {
            await Promise.all(chosenIds.map(id => axios.delete(`/categories/${id}`)))
            setChosenIds([])
            await getCategories()
            setIsDeleteModalOpened(false)
        } catch (error) {
            alert('Ошибка при удалении категорий. Возможно, вы пытаетесь удалить общую категорию');
            setIsDeleteModalOpened(false);
        }
    }

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        try {
            const items = Array.from(categories);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            setCategories(items);

            const orders = items.map((item, index) => ({
                id: item._id,
                order: index
            }));
            
            await axios.patch('/categories/reorder', { orders });
        } catch (error) {
            console.error('Ошибка при обновлении порядка:', error);
            getCategories();
        }
    };

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className={s.adminProductsWrapper}>
            <AddCategoryModal 
                getCategories={getCategories} 
                isModalOpened={isModalOpened} 
                setIsModalOpened={setIsModalOpened} 
            />
            <EditCategoryModal 
                getCategories={getCategories}
                isModalOpened={isEditModalOpened}
                setIsModalOpened={setIsEditModalOpened}
                category={editingCategory}
            />
            <ConfirmModal 
                isModalOpened={isDeleteModalOpened}
                setIsModalOpened={setIsDeleteModalOpened}
                onConfirm={deleteSelectedCategories}
                title="Удаление категорий"
                text={`Вы действительно хотите удалить выбранные категории (${chosenIds.length})?`}
            />
            <h1 className={s.title}>Категории</h1>
            <div className={s.topControls}>
                <div className={s.info}>
                    <p>Всего категорий: <span className={s.quantity}>{categories.length}</span></p>
                    {chosenIds.length > 0 && (
                        <p className={s.link} onClick={() => setIsDeleteModalOpened(true)}>
                            Удалить выделенные категории <span className={s.chosen}>(Выбрано {chosenIds?.length})</span>
                        </p>
                    )}
                </div>
                <button onClick={() => setIsModalOpened(true)} className={s.blackButton}>
                    Добавить категорию
                </button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                {!isLoading && (
                    <Droppable droppableId="categories">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`${s.items} ${snapshot.isDraggingOver ? s.isDraggingOver : ''}`}
                            >
                                {categories.map((item, index) => (
                                    <DraggableItem
                                        key={item._id}
                                        item={item}
                                        index={index}
                                        {...item}
                                        chosenIds={chosenIds}
                                        setChosenIds={setChosenIds}
                                        onDelete={deleteCategory}
                                        onEdit={handleEdit}
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