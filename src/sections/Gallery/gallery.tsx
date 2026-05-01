"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./gallery.module.css";

import "swiper/css";
import "swiper/css/navigation";
import { useLenis } from "lenis/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

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
    const titleRef = useRef<HTMLHeadingElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null)
    const lenis = useLenis()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!lenis) return

        if (isOpen) {
            lenis.stop()
            return
        }

        lenis.start()

        const handleScroll = () => {
            if (!sectionRef.current || !titleRef.current) return

            const rect = sectionRef.current.getBoundingClientRect();
            const offset = rect.top - window.innerHeight;
            const safeOffset = Math.max(Math.abs(offset), 1);
            const scale = window.innerHeight / safeOffset;
            titleRef.current.style.transform = `scale(${scale * 1.5})`
        }

        lenis.on("scroll", handleScroll)
        handleScroll()
        return () => lenis.off("scroll", handleScroll)
    }, [lenis, isOpen]);

    return (
        <div className={styles.container} ref={sectionRef}>
            <h2 ref={titleRef} className={styles.title}>
                Галерея
            </h2>

            <PhotoProvider
                onVisibleChange={(visible) => {
                    setIsOpen(visible);
                }}>
                <div className={styles.galleryGrid}>
                    {images.map((img, i) => (
                        <PhotoView key={i} src={img}>
                            <img
                                src={imagesResized[i]}
                                alt=""
                                className={styles.image}
                                loading="lazy"
                            />
                        </PhotoView>
                    ))}
                </div>
            </PhotoProvider>
        </div>
    );
}