import React, { useState, useEffect } from 'react'
import s from './Catalog.module.scss'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Arrow, ArrowLeft, ArrowRight } from '../../svgs'
import axios from '../../core/axios'
import { Element } from 'react-scroll'
import { Link, animateScroll as scroll, scroller } from "react-scroll"

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
    const handleClickScroll = (to) => {
        scroller.scrollTo(to, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -100,
        });
      }
    
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
    const [showAll, setShowAll] = useState(false)
    const scrollContainerRef = React.useRef(null)
    const catalogRef = React.useRef(null)
    
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

    const handleWheel = (e) => {
        if (!showAll && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const isScrollable = container.scrollWidth > container.clientWidth;
            
            if (isScrollable) {
                e.preventDefault();
                const scrollSpeed = 7;
                const delta = e.deltaY * scrollSpeed;
                
                container.scrollTo({
                    left: container.scrollLeft + delta,
                    behavior: 'smooth'
                });
            }
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [showAll]);

    useEffect(() => {
        if (scrollContainerRef.current && !showAll) {
            const scrollContainer = scrollContainerRef.current;
            const centerPosition = (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
            scrollContainer.scrollLeft = centerPosition;
        }
    }, [products, activeCategory, showAll]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollContainerRef.current && !showAll) {
                const scrollContainer = scrollContainerRef.current;
                const centerPosition = (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
                scrollContainer.scrollLeft = centerPosition;
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = activeCategory
        ? products.filter(product => product.category?._id === activeCategory && product.isVisible)
        : products.filter(product => product.isVisible)

    const handleClickScrollToButton = () => {
        scroller.scrollTo('showAllButton', {
            duration: 1500,
            smooth: true,
            offset: -250
        });
    };

    const handleClickScrollToTop = () => {
        scroller.scrollTo('catalogTop', {
            duration: 1500,
            smooth: true,
            offset: 100
        });
    };

    return (
        <Element name='catalog'>
            <div className={s.Catalog} ref={catalogRef}>
                <Element name='catalogTop'>
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
                </Element>

                <div 
                    className={`${s.productsContainer} ${showAll ? s.showAll : ''}`} 
                    ref={scrollContainerRef}
                    onWheel={handleWheel}
                >
                    {filteredProducts.length > 0 ? (
                        <>
                            {filteredProducts.map(product => (
                                <Slide
                                    key={product._id}
                                    product={product}
                                    setIsModalOpened={setIsModalOpened}
                                />
                            ))}
                        </>
                    ) : (
                        <div className={s.noProducts}>
                            <p>Ничего не найдено</p>
                        </div>
                    )}
                </div>
                
                <Element name='showAllButton'>
                    <button 
                        className={s.showAllButton} 
                        onClick={() => {
                            if (showAll) {
                                setTimeout(handleClickScrollToTop, 100);
                            }
                            setShowAll(!showAll);
                        }}
                    >
                        {showAll ? 'Скрыть' : 'Показать все'}
                    </button>
                </Element>

                {showAll && (
                    <button 
                        className={s.scrollTopButton}
                        onClick={handleClickScrollToButton}
                    >
                        <ArrowRight />
                    </button>
                )}
            </div>
        </Element>
    )
}

export default Catalog
