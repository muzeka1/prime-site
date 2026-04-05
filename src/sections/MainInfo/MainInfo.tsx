import Image from "next/image"
import styles from "./mainInfo.module.css"
import { useLenis } from "lenis/react"
import { useEffect, useRef, useState } from "react"
import { off } from "process"

export default function MainInfoSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement[]>([])
    const [windowWidth, setWindowWidth] = useState(0)

    const iconSize = windowWidth < 600 ? 30 : 60

    const lenis = useLenis()

    const addCardToRef = (item: HTMLDivElement | null) => {
        if (item) cardsRef.current.push(item)
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
    
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (!lenis) return

        const handleScroll = () => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            cardsRef.current.forEach((card) => {
                const isVisible = rect.top < window.innerHeight * 0.8

                if (isVisible) {
                    card.classList.add(styles.visible)
                } else {
                    card.classList.remove(styles.visible)
                }
            })
        }

        lenis.on("scroll", handleScroll)
        return () => lenis.off("scroll", handleScroll)
    }, [lenis])

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.cardsContainer}>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/construction-site.svg" alt="иконка стройки" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Сдача</h3>
                        <p className={styles.cardText}>IV кв. 2030</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/buildings.svg" alt="иконка зданий" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Класс</h3>
                        <p className={styles.cardText}>Бизнес</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/card.svg" alt="иконка карты" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Рассрочка</h3>
                        <p className={styles.cardText}>Доступна</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/money.svg" alt="иконка денег" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Взнос</h3>
                        <p className={styles.cardText}>От 10%</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/wall.svg" alt="иконка стены" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Технология</h3>
                        <p className={styles.cardText}>Монолит</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/measure.svg" alt="иконка линейки" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Площади</h3>
                        <p className={styles.cardText}>35–120 м²</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/graph.svg" alt="иконка графика" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Доходность</h3>
                        <p className={styles.cardText}>До 12%</p>
                    </div>
                </div>
                <div className={styles.card} ref={(item) => addCardToRef(item)}>
                    <Image src="/images/icons/building-floor.svg" alt="иконка здания" width={iconSize} height={iconSize} />
                    <div className={styles.cardTextBlock}>
                        <h3 className={styles.cardTitle}>Этажность</h3>
                        <p className={styles.cardText}>16 и 18</p>
                    </div>
                </div>
            </div>
        </div>
    )
}