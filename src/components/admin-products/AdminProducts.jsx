import React, { useState, useEffect } from 'react'
import CheckBox from '../UI/Checkbox/Checkbox'
import s from './AdminProducts.module.scss'
import Toggle from '../UI/Toggle/Toggle'
import axios from '../../core/axios'
import { Clock, Edit, StrangeArrow, Trash, Commission } from '../../svgs'
import DateTimePicker from '../UI/DateTimePicker/DateTimePicker'
import AddProductModal from '../modals/add-product-modal/add-product-modal'
import ConfirmModal from '../modals/confirm-modal/confirm-modal'
import EditProductModal from '../modals/edit-product-modal/edit-product-modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const DraggableItem = ({ item, index, ...props }) => {
    const {
        _id,
        name,
        price,
        category,
        img,
        isVisible,
        isCommission,
        freeDate,
        descriptionMain,
        descriptionModal,
        setChosenIds,
        chosenIds,
        onDelete,
        onToggleVisibility,
        onToggleCommission,
        onSetFreeDate,
        onEdit
    } = props;

    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [isEnabled, setIsEnabled] = useState(!!freeDate);
    const [selectedDateTime, setSelectedDateTime] = useState(freeDate ? new Date(freeDate) : null);

    // Создаем стабильный ID для draggable
    const draggableId = React.useMemo(() => `product-${_id}`, [_id]);

    // Функция для округления времени до следующего получаса
    const getNextHalfHour = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const roundedMinutes = minutes <= 30 ? 30 : 60;
        
        now.setMinutes(roundedMinutes);
        now.setSeconds(0);
        now.setMilliseconds(0);
        
        // Если минуты были > 30, увеличиваем час
        if (roundedMinutes === 60) {
            now.setMinutes(0);
            now.setHours(now.getHours() + 1);
        }
        
        return now;
    };

    const handleCheckbox = () => {
        if (chosenIds.includes(_id)) {
            setChosenIds(prev => prev.filter(id => id !== _id))
        } else {
            setChosenIds(prev => [...prev, _id])
        }
    }

    const handleToggleVisible = async () => {
        await onToggleVisibility(_id);
    }

    const handleToggle = () => {
        setIsEnabled(prev => !prev);
        if (!isEnabled) {
            const nextHalfHour = getNextHalfHour();
            setSelectedDateTime(nextHalfHour);
            onSetFreeDate(_id, nextHalfHour);
        } else {
            setSelectedDateTime(null);
            onSetFreeDate(_id, null);
        }
    }

    const handleDateChange = (date) => {
        setSelectedDateTime(date);
        onSetFreeDate(_id, date);
    }

    const handleDelete = async () => {
        try {
            await onDelete(_id);
            setIsDeleteModalOpened(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Ошибка при удалении продукта');
            setIsDeleteModalOpened(false);
        }
    }

    const handleToggleCommission = async () => {
        await onToggleCommission(_id);
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
                        <div className={s.imgWrapper}>
                            <img src={img} alt={name} />
                        </div>
                        <div className={s.info}>
                            <p className={s.name}>{name}</p>
                            <p className={s.category}>Категория: <span className={s.categoryValue}>{category?.name || 'Без категории'}</span></p>
                        </div>
                    </div>
                    <div className={s.right}>
                        <div className={s.verticalLine}></div>
                        <div className={s.date}>
                            <Clock />
                            <Toggle
                                isChecked={isEnabled}
                                onChange={handleToggle}
                            />
                            <DateTimePicker
                                isEnabled={isEnabled}
                                onChange={handleDateChange}
                                value={selectedDateTime}
                            />
                        </div>
                        <div className={s.strangeArrow}><StrangeArrow /></div>
                        <div className={s.toggle2}>
                            <Toggle
                                isChecked={isVisible}
                                onChange={handleToggleVisible}
                            />
                        </div>
                        <div className={s.commission}>
                            <Commission />
                            <Toggle
                                isChecked={isCommission}
                                onChange={handleToggleCommission}
                            />
                        </div>
                        <div className={s.edit} onClick={() => onEdit({ 
                            _id, 
                            name, 
                            price, 
                            category, 
                            img, 
                            descriptionMain, 
                            descriptionModal 
                        })}><Edit /></div>
                        <div className={s.verticalLine2}></div>
                        <div className={s.trash} onClick={() => setIsDeleteModalOpened(true)}><Trash /></div>
                    </div>
                    <ConfirmModal 
                        isModalOpened={isDeleteModalOpened}
                        setIsModalOpened={setIsDeleteModalOpened}
                        onConfirm={handleDelete}
                        title="Удаление товара"
                        text={`Вы действительно хотите удалить товар "${name}"?`}
                    />
                </div>
            )}
        </Draggable>
    );
};

export const AdminProducts = () => {
    const [chosenIds, setChosenIds] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/products');
            // Проверяем наличие _id и добавляем временные id если их нет
            const validProducts = data.map((product, index) => ({
                ...product,
                _id: product._id || `temp-${index}`
            }));
            setProducts(validProducts);
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategories = async () => {
        const {data} = await axios.get('/categories')
        setCategories(data)
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/products/${id}`)
            await getProducts()
        } catch (error) {
            throw error;
        }
    }

    const deleteSelectedProducts = async () => {
        try {
            await Promise.all(chosenIds.map(id => axios.delete(`/products/${id}`)))
            setChosenIds([])
            await getProducts()
            setIsDeleteModalOpened(false)
        } catch (error) {
            alert('Ошибка при удалении товаров');
            setIsDeleteModalOpened(false);
        }
    }

    const toggleVisibility = async (id) => {
        try {
            await axios.patch(`/products/${id}/visibility`)
            await getProducts()
        } catch (error) {
            console.error('Ошибка при изменении видимости:', error)
        }
    }

    const setFreeDate = async (id, date) => {
        try {
            await axios.patch(`/products/${id}/release-date`, { 
                date: date ? date.toISOString() : null 
            });
            await getProducts();
        } catch (error) {
            console.error('Ошибка при установке даты освобождения:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product)
        setIsEditModalOpened(true)
    }

    const toggleCommission = async (id) => {
        try {
            await axios.patch(`/products/${id}/commission`)
            await getProducts()
        } catch (error) {
            console.error('Ошибка при изменении комиссионного статуса:', error)
        }
    }

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        try {
            const items = Array.from(products);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            // Обновляем состояние немедленно
            setProducts(items);

            // Извлекаем чистый ID из draggableId (убираем префикс 'product-')
            const orders = items.map((item, index) => ({
                id: item._id,
                order: index
            }));
            
            await axios.patch('/products/reorder', { orders });
        } catch (error) {
            console.error('Ошибка при обновлении порядка:', error);
            getProducts();
        }
    };

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <div className={s.adminProductsWrapper}>
            <AddProductModal 
                getProducts={getProducts} 
                isModalOpened={isModalOpened} 
                setIsModalOpened={setIsModalOpened}
                categories={categories}
            />
            <ConfirmModal 
                isModalOpened={isDeleteModalOpened}
                setIsModalOpened={setIsDeleteModalOpened}
                onConfirm={deleteSelectedProducts}
                title="Удаление товаров"
                text={`Вы действительно хотите удалить выбранные товары (${chosenIds.length})?`}
            />
            <h1 className={s.title}>Товары</h1>
            <div className={s.topControls}>
                <div className={s.info}>
                    <p>Всего товаров: <span className={s.quantity}>{products.length}</span></p>
                    <p>Категорий: <span className={s.quantity}>
                        {categories.length}
                    </span></p>
                    {chosenIds.length > 0 && (
                        <p className={s.link} onClick={() => setIsDeleteModalOpened(true)}>
                            Удалить выделенные товары <span className={s.chosen}>(Выбрано {chosenIds.length})</span>
                        </p>
                    )}
                </div>
                <button onClick={() => setIsModalOpened(true)} className={s.blackButton}>
                    Добавить товар
                </button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                {!isLoading && (
                    <Droppable droppableId="products">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`${s.items} ${snapshot.isDraggingOver ? s.isDraggingOver : ''}`}
                            >
                                {products.map((item, index) => (
                                    <DraggableItem
                                        key={item._id}
                                        item={item}
                                        index={index}
                                        {...item}
                                        chosenIds={chosenIds}
                                        setChosenIds={setChosenIds}
                                        onDelete={deleteProduct}
                                        onToggleVisibility={toggleVisibility}
                                        onToggleCommission={toggleCommission}
                                        onSetFreeDate={setFreeDate}
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

            <EditProductModal 
                getProducts={getProducts}
                isModalOpened={isEditModalOpened}
                setIsModalOpened={setIsEditModalOpened}
                categories={categories}
                product={editingProduct}
            />
        </div>
    );
}