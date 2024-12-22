import React, { useState, useEffect } from 'react'
import s from './Catalog.module.scss'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Arrow, ArrowLeft, ArrowRight } from '../../svgs'
import axios from '../../core/axios'
import { Element } from 'react-scroll'
import { baseImageUrl } from '../../core/axios'

const Slide = ({ product, setIsModalOpened }) => {
    const firstPriceLine = product.price.split('\n')[0];
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(false);
    };

    const handleMouseMove = () => {
        setIsDragging(true);
    };

    const handleClick = () => {
        if (!isDragging) {
            setIsModalOpened(product._id);
        }
    };

    return (
        <div 
            className={s.slide}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            <div className={s.top}>
                <h3>{product.name}</h3>
                <div className={s.imgDiv}>
                    <img
                        src={`${product.img}`}
                        alt={product.name}
                        style={{ maxHeight: '305px' }}
                    />
                </div>
            </div>
            <div className={s.middle}>
                <div className={s.status}>
                    <div className={`${s.light} ${!product.freeDate ? s.free : ''}`}></div>
                    <p>{product.freeDate ? `Освободится ${new Date(product.freeDate).toLocaleString('ru')}` : 'Свободен'}</p>
                </div>
            </div>
            <div className={s.bottom}>
                <div className={s.left}>
                    <h3>Минимальная срок теста</h3>
                    <div style={{marginBottom: '15px'}} className={s.bottomInfo}>
                        <p className={s.first}>{firstPriceLine}</p>
                    </div>
                </div>
                <div className={s.right}>
                    <ul>
                        {product.descriptionMain.split('\n').map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                    <Arrow />
                </div>
            </div>
        </div>
    )
}

const Catalog = ({ setIsModalOpened }) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const sliderRef = React.useRef(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get('/products'),
                    axios.get('/categories')
                ])
                setProducts(productsRes.data)
                setCategories(categoriesRes.data)
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error)
            }
        }
        fetchData()
    }, [])

    const filteredProducts = activeCategory
        ? products.filter(product => product.category?._id === activeCategory && product.isVisible)
        : products.filter(product => product.isVisible)

    const next = () => {
        sliderRef.current.slickNext()
    }

    const previous = () => {
        sliderRef.current.slickPrev()
    }

    const settings = {
        className: "slider variable-width",
        dots: filteredProducts.length <= 8,
        infinite: filteredProducts.length > 1,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: filteredProducts.length > 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: filteredProducts.length <= 8
                }
            }
        ]
    }

    return (
        <Element name='catalog'>
            <div className={s.Catalog}>
                <div className={s.heading}>
                    <h2>Асортимент</h2>
                    <h1>Каждый найдет снасть для себя!</h1>
                    <div className={`${s.categoryChoose}`}>
                        <div
                            className={`${s.categoryChooseItem} ${!activeCategory ? s.categoryChooseItem_active : ''}`}
                            onClick={() => setActiveCategory(null)}
                        >
                            <p>Все</p>
                        </div>
                        {categories.map(category => (
                            <div
                                key={category._id}
                                className={`${s.categoryChooseItem} ${activeCategory === category._id ? s.categoryChooseItem_active : ''}`}
                                onClick={() => setActiveCategory(category._id)}
                            >
                                <p>{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={s.sliderContainer}>
                    {filteredProducts.length > 0 ? (
                        <>
                            <Slider ref={sliderRef} {...settings}>
                                {filteredProducts.map(product => (
                                    <Slide
                                        key={product._id}
                                        product={product}
                                        setIsModalOpened={setIsModalOpened}
                                    />
                                ))}
                            </Slider>
                            {filteredProducts.length > 1 && (
                                <div className={s.navigationButtons}>
                                    <button onClick={previous} className={s.navButton}><ArrowLeft /></button>
                                    <button onClick={next} className={s.navButton}><ArrowRight /></button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={s.noProducts}>
                            <p>Ничего не найдено</p>
                        </div>
                    )}
                </div>
            </div>
        </Element>
    )
}

export default Catalog
