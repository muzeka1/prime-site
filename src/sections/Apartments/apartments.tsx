import Image from 'next/image';
import styles from './apartments.module.css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from "swiper/modules";

const images = [
    "/images/apartments/ap1.png",
    "/images/apartments/ap2.png",
    "/images/apartments/ap3.png",
    "/images/apartments/ap4.png",
    "/images/apartments/ap5.png",
    "/images/apartments/ap6.png"
]

export default function ApartmentsBlock() {

    const [isActive, setIsActive] = useState<boolean>(false)

    const close = () => setIsActive(false);


    return (
        <div
            className={styles.container}
        >
            <div className={styles.line_up}></div>
            <div className={styles.text}>
                <h2 className={styles.title}>ПЛАН ТИПОВОГО ЭТАЖА</h2>
                <p className={styles.description}>На этаже представлено 6 различных планировок. Такое разнообразие форматов позволяет выбрать оптимальное решение под разные сценарии жизни — от компактных пространств до более просторных квартир с функциональным зонированием.</p>
                <button className={styles.button} onClick={() => setIsActive(true)}><p>Просмотреть квартиры</p></button>
            </div>
            <div className={styles.image}>
                <Image src='/images/apartments/block.jpg' alt="план блока" fill sizes='1000px' style={{ objectFit: "contain", objectPosition: "center" }}/>
            </div>
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
                                    <Image
                                        fill
                                        src={src}
                                        alt="планировки квартир"
                                        className={styles.popupImage}
                                        sizes='2000px'
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
}