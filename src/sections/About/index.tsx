"use client"

import Image from "next/image"
import styles from "./about.module.css"
import { useLenis } from "lenis/react"
import { useEffect, useRef } from "react"
interface RenderItem {
    title: string
    description: string
    imageSrc: string
}

const renders: RenderItem[] = [
    {
        title: "О ПРОЕКТЕ",
        description: "Прайм. Притяжение – жилой комплекс бизнес-класса с видом на горы и Духовный центр им. Пророка Исы",
        imageSrc: "/images/renders/8.jpg",
    },
    {
        title: "ЛОКАЦИЯ",
        description: `Школа №53 800М
            Школа №59 600М
            Детсад №16 450М
            650М Духовный центр
            им. Пророка Исы
            Народная аллея 800М
            Стадион 550М`,
        imageSrc: "/images/renders/map.jpg",
    },
]

export default function AboutSection() {

    const lenis = useLenis();
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el)
        }
    }


    useEffect(() => {
        if (!lenis) return
      
        const handleScroll = () => {
          if (!sectionRef.current || !bgRef.current) return
      
          const rect = sectionRef.current.getBoundingClientRect()
          const offset = -rect.top
          bgRef.current.style.transform = `translateY(${offset * 0.3}px)`
      
          cardsRef.current.forEach((card) => {
            const cardRect = card.getBoundingClientRect()
            if (cardRect.top < window.innerHeight * 0.85) {
              card.classList.add(styles.visible)
            } else {
              card.classList.remove(styles.visible)
            }
          })
        }
      
        lenis.on("scroll", handleScroll)
        handleScroll()
        return () => lenis.off("scroll", handleScroll)
      }, [lenis])

    return (


        <div className={styles.container} ref={sectionRef}>
            <div className={styles.card} ref={addToRefs}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={'/images/renders/8.jpg'}
                        alt={'рендер фасада'}
                        fill
                        sizes="1000px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <h2>О ПРОЕКТЕ</h2>
                    <p>Прайм. Притяжение – жилой комплекс бизнес-класса с видом на горы и Духовный центр им. Пророка Исы</p>
                </div>
            </div>


            <div className={`${styles.card} ${styles.location}`} ref={addToRefs}>
                <div className={styles.text}>
                    <h2>ЛОКАЦИЯ</h2>
                    <p><span className={styles.text_destination}>Школа 53</span><span className={styles.text_distance}>800М</span></p>
                    <p><span className={styles.text_destination}>Школа 59</span><span className={styles.text_distance}>600М</span></p>
                    <p><span className={styles.text_destination}>Детсад №16</span><span className={styles.text_distance}>450М</span></p>
                    <p><span className={styles.text_destination}>Духовный центр им. Пророка Исы</span><span className={styles.text_distance}>650М</span></p>
                    <p><span className={styles.text_destination}>Народная аллея</span><span className={styles.text_distance}>800М</span></p>
                    <p><span className={styles.text_destination}>Стадион</span><span className={styles.text_distance}>550М</span></p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src={'/images/renders/map.jpg'}
                        alt={'карта'}
                        fill
                        sizes="1000px"
                        style={{ objectFit: "cover", objectPosition: "bottom" }}
                        priority
                    />
                </div>
            </div>


            <div className={styles.card} ref={addToRefs}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={'/images/renders/center.jpg'}
                        alt={'рендер фасада'}
                        fill
                        sizes="1000px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <h2>ДУХОВНОЕ ОКРУЖЕНИЕ</h2>
                    <p>Смысловой и культурный якорь новой Махачкалы, формирующий вокруг себя среду ценностей: тишину, уважение, размеренный ритм жизни и ощущение внутреннего баланса.</p>
                </div>
            </div>
        </div>
    )
}