
import styles from './apartments.module.css';
import { useEffect, useRef, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useLenis } from 'lenis/react';
import Image from 'next/image';

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
    const contentRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [maxHeight, setMaxHeight] = useState(320);
    const [expanded, setExpanded] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return

        if (isOpen) {
            lenis.stop()
            return
        }

        if (expanded && contentRef.current) {
            setMaxHeight(contentRef.current.scrollHeight);
        }

        lenis.start()

        const handleScroll = () => {
            return
        }

        lenis.on("scroll", handleScroll)
        handleScroll()
        return () => lenis.off("scroll", handleScroll)
    }, [lenis, isOpen, expanded]);


    return (
        <div
            id="apartments"
            className={styles.container}
        >
            <div className={styles.previewBlock}>
                <div className={styles.line_up}></div>
                <div className={styles.line_down}></div>
                <div className={styles.text}>
                    <h2 className={styles.title}>ПЛАН ТИПОВОГО ЭТАЖА</h2>
                    <p className={styles.description}>На этаже представлено 6 различных планировок. Такое разнообразие форматов позволяет выбрать оптимальное решение под разные сценарии жизни — от компактных пространств до более просторных квартир с функциональным зонированием.</p>
                </div>
                <PhotoProvider
                    onVisibleChange={(visible) => {
                        setIsOpen(visible);
                    }}>
                    <PhotoView key={'appartments_block'} src={'/images/apartments/apartments/block.png'}>
                        <img
                            src={'/images/apartments/apartments_resized/block.png'}
                            alt=""
                            className={styles.image}
                            loading="lazy"
                        />
                    </PhotoView>
                </PhotoProvider>
            </div>

            <div className={styles.apartmentsBlock}
                ref={contentRef}
                style={{
                    height: expanded ? maxHeight : 320,
                    overflow: 'hidden',
                    transition: 'height 0.4s ease',
                }}
            >
                <PhotoProvider
                    onVisibleChange={(visible) => {
                        setIsOpen(visible);
                    }}>
                    <div className={styles.apartments}>
                        {images.map((img, i) => (
                            <PhotoView key={i} src={img}>
                                <img
                                    src={imagesResized[i]}
                                    alt=""
                                    className={styles.apartmentsImage}
                                    loading="lazy"
                                />
                            </PhotoView>
                        ))}
                    </div>
                </PhotoProvider>
            </div>
            <button className={styles.buttonShowFull} onClick={() => {
                setExpanded((prev) => !prev)
            }}>
                <div className={styles.arrowContainer} style={{transform: expanded ? "rotate(180deg)" : "rotate(0deg)"}}>
                    <Image className={styles.arrow} src={"/images/arrowDown.svg"} alt="" width={42} height={42} />
                </div>
            </button>
        </div>
    );
}