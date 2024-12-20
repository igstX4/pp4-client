import React, { useState, useEffect } from 'react'
import s from './detailed-product.module.scss'
import { CopyIcon, AttentionIcon, Commission } from '../../../svgs'
import { Arrow } from '../../../svgs'
import axios from '../../../core/axios'
import { baseImageUrl } from '../../../core/axios'

const DetailedProductModal = ({setIsRulesModalOpened, isModalOpened, setIsModalOpened}) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            if (isModalOpened) {
                setLoading(true)
                try {
                    const response = await axios.get(`/products/${isModalOpened}`)
                    setProduct(response.data)
                } catch (error) {
                    console.error('Ошибка при загрузке продукта:', error)
                } finally {
                    setLoading(false)
                }
            } else {
                setProduct(null)
            }
        }
        fetchProduct()
    }, [isModalOpened])
    // console.log(product.categoryName)
    const copy = async () => {
        await navigator.clipboard.writeText('Ваня Мальцевидзе Джуниор');
    }
    return (
        <div className={`${s.detailedProductWrapper} ${isModalOpened ? s.active : ''}`} onClick={() => setIsModalOpened(null)}>
            <div className={s.content} onClick={e => e.stopPropagation()}>
                <div className={s.cross} onClick={() => setIsModalOpened(null)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={51}
                        height={52}
                        viewBox="0 0 51 52"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.06697 2.01616C2.48959 0.593532 4.79612 0.593532 6.21875 2.01616L25.5 21.2974L44.7813 2.01616C46.2039 0.593532 48.5104 0.593532 49.933 2.01616C51.3557 3.43878 51.3557 5.74531 49.933 7.16793L30.6518 26.4492L49.933 45.7304C51.3557 47.1531 51.3557 49.4596 49.933 50.8822C48.5104 52.3048 46.2039 52.3048 44.7813 50.8822L25.5 31.601L6.21875 50.8822C4.79612 52.3048 2.48959 52.3048 1.06697 50.8822C-0.355656 49.4596 -0.355656 47.1531 1.06697 45.7304L20.3482 26.4492L1.06697 7.16793C-0.355656 5.74531 -0.355656 3.43878 1.06697 2.01616Z"
                            fill="#BC071C"
                        />
                    </svg>
                </div>
                {loading ? (
                    <div className={s.loading}>
                        <div className={s.spinner}></div>
                        <p>Загрузка...</p>
                    </div>
                ) : product ? (
                    <>
                        <div className={s.div1}>
                            <div className={s.slide}>
                                <div className={s.top}>
                                    <img src={`${product.img}`} alt={product.name} />
                                </div>
                                <div className={s.middle}>
                                    <h3>{product.name}</h3>
                                </div>
                                <div className={s.bottom}>
                                    <div className={s.left}>
                                        <h3>Характеристики предмета:</h3>
                                        <div className={s.bottomInfo}>
                                            <p className={s.first}>{product.categoryName}</p>
                                        </div>
                                    </div>
                                    <div className={s.right}>
                                        <ul>
                                            {product.descriptionModal.split('\n').map((line, index) => (
                                                <li key={index}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={s.info}>
                                <div className={s.infoItem}>
                                    <h3>Арендатор</h3>
                                    <p className={s.desk}>Мальцевдизе</p>
                                </div>
                                <div className={s.infoItem}>
                                    <h3>Статус предмета</h3>
                                    <div className={s.status}>
                                        <div className={`${s.light} ${!product.freeDate ? s.free : ''}`}></div>
                                        <p>{product.freeDate ? `Освободится ${new Date(product.freeDate).toLocaleString('ru')}` : 'Свободен'}</p>
                                    </div>
                                </div>
                                <div className={s.infoItem}>
                                    <h3>Комиссионный предмет:</h3>
                                    <div className={`${s.commission} ${product.isCommission ? s.active : ''}`}>
                                        <Commission />
                                    </div>
                                </div>
                            </div>
                            <div className={s.hr}></div>

                            <div className={s.bottomBtns}>
                                <button onClick={copy} className={s.copyBtn}><CopyIcon /> Скопировать имя PP4</button>
                                <div className={s.link}>
                                    <AttentionIcon />
                                    <div style={{cursor: 'pointer'}} onClick={() => setIsRulesModalOpened(true)}>
                                        <h6>Правила аренды</h6>
                                        <p>Ознакомиться с правилами!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.rightDiv}>
                            <h2 className={s.desktopTitle}>{product.name}</h2>
                            <h2 className={s.mobileTitle}>{product.name}</h2>
                            <h3>Цена Аренды = Теста (время реальное):</h3>
                            <div className={s.prices}>
                                <p>{product.price}</p>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default DetailedProductModal
