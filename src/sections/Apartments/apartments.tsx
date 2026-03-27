import Image from 'next/image';
import styles from './apartments.module.css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from "swiper/modules";
import Link from 'next/link';

const images = [
    "/images/apartments/apartments/ap1.jpg",
    "/images/apartments/apartments/ap2.jpg",
    "/images/apartments/apartments/ap3.jpg",
    "/images/apartments/apartments/ap4.jpg",
    "/images/apartments/apartments/ap5.jpg",
    "/images/apartments/apartments/ap6.jpg"
]

const imagesResized = [
    "/images/apartments/apartments_resized/ap1.jpg",
    "/images/apartments/apartments_resized/ap2.jpg",
    "/images/apartments/apartments_resized/ap3.jpg",
    "/images/apartments/apartments_resized/ap4.jpg",
    "/images/apartments/apartments_resized/ap5.jpg",
    "/images/apartments/apartments_resized/ap6.jpg"
]

export default function ApartmentsBlock() {

    const [isActive, setIsActive] = useState<boolean>(false)

    const close = () => setIsActive(false);


    return (
        <div
            className={styles.container}
        >
            <div className={styles.line_up}></div>
            <div className={styles.line_down}></div>
            <div className={styles.text}>
                <h2 className={styles.title}>ПЛАН ТИПОВОГО ЭТАЖА</h2>
                <p className={styles.description}>На этаже представлено 6 различных планировок. Такое разнообразие форматов позволяет выбрать оптимальное решение под разные сценарии жизни — от компактных пространств до более просторных квартир с функциональным зонированием.</p>
                <button className={styles.button} onClick={() => setIsActive(true)}><p>Просмотреть квартиры</p></button>
            </div>
            <Link href={'/images/apartments/apartments/block.png'} target='_blank' className={styles.image}>
                <Image src='/images/apartments/apartments_resized/block.png' alt="план блока" fill sizes='1000px' style={{ objectFit: "contain", objectPosition: "center" }} />
            </Link>
            {isActive && (
                <div className={styles.popup} onClick={close}>
                    <button className={styles.closeButton} onClick={close}>
                        <div className={styles.lineUp}></div>
                        <div className={styles.lineDown}></div>
                    </button>
                    <div
                        className={styles.sliderWrap}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Swiper
                            modules={[Navigation, Keyboard]}
                            navigation
                            keyboard
                            initialSlide={0}
                            spaceBetween={30}
                            slidesPerView={1}
                            className={styles.swiper}
                        >
                            {images.map((src, i) => (
                                <SwiperSlide key={i} className={styles.swiperSlide}>
                                    <Link href={src} target='_blank'>
                                        <Image
                                            fill
                                            src={imagesResized[i]}
                                            alt="планировки квартир"
                                            className={styles.popupImage}
                                            sizes='1000px'
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
}