"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./gallery.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useLenis } from "lenis/react";
import Link from "next/link";

const images = [
    "/images/renders/1.jpg",
    "/images/renders/2.jpg",
    "/images/renders/3.jpg",
    "/images/renders/4.jpg",
    "/images/renders/5.jpg",
    "/images/renders/7.jpg",
    "/images/renders/8.jpg",
    "/images/renders/9.jpg",
    "/images/renders/10.jpg",
    "/images/renders/11.jpg",
    "/images/renders/12.jpg",
    "/images/renders/13.png",
    "/images/renders/15.png",
    "/images/renders/16.png",
    "/images/renders/17.png",
];

const imagesResized = [
    "/images/renders/renders_resized/1.jpg",
    "/images/renders/renders_resized/2.jpg",
    "/images/renders/renders_resized/3.jpg",
    "/images/renders/renders_resized/4.jpg",
    "/images/renders/renders_resized/5.jpg",
    "/images/renders/renders_resized/7.jpg",
    "/images/renders/renders_resized/8.jpg",
    "/images/renders/renders_resized/9.jpg",
    "/images/renders/renders_resized/10.jpg",
    "/images/renders/renders_resized/11.jpg",
    "/images/renders/renders_resized/12.jpg",
    "/images/renders/renders_resized/13.png",
    "/images/renders/renders_resized/15.png",
    "/images/renders/renders_resized/16.png",
    "/images/renders/renders_resized/17.png",
]

export default function GallerySection() {
    const [active, setActive] = useState<number | null>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null)
    const lenis = useLenis()

    const close = () => setActive(null);

    useEffect(() => {
        if (!lenis) return

        const handleScroll = () => {
            if (!sectionRef.current || !titleRef.current) return

            const rect = sectionRef.current.getBoundingClientRect();
            const offset = rect.top - window.innerHeight;
            const scale = window.innerHeight / Math.abs(offset);
            titleRef.current.style.transform = `scale(${scale*1.5})`
        }

        lenis.on("scroll", handleScroll)
        handleScroll()
        return () => lenis.off("scroll", handleScroll)
    }, [lenis]);

    return (
        <div className={styles.container} ref={sectionRef}>
            <h2 ref={titleRef} className={styles.title}>
                Галерея
            </h2>

            <div className={styles.grid}>
                {images.map((src, i) => (
                    <div
                        key={i}
                        className={styles.card}
                        onClick={() => setActive(i)}
                    >
                        <Image className={styles.cardImage} src={imagesResized[i]} alt="фото жилого комплекса" fill sizes="700px" />
                    </div>
                ))}
            </div>

            {active !== null && (
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
                            initialSlide={active}
                            spaceBetween={30}
                            slidesPerView={1}
                            className={styles.swiper}
                        >
                            {images.map((src, i) => (
                                <SwiperSlide key={i} className={styles.swiperSlide}>
                                    <Link target="_blank" href={src} className={styles.imageLink}>
                                        <Image
                                            fill
                                            src={src}
                                            alt="фото жилого комплекса"
                                            className={styles.popupImage}
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