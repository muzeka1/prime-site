"use client"

import { useEffect, useRef } from "react"
import styles from "./InfoSection.module.css"
import { useLenis } from "lenis/react"

const cardsInfo = [
  {
    title: "Локация будущего",
    text: "Начало формирования нового района — ценность территории только начинает раскрываться.",
  },
  {
    title: "Виды",
    text: "С одной стороны — горы, с другой — Духовный центр им. Пророка Исы и аллея. Такие видовые характеристики не теряют ценность со временем.",
  },
  {
    title: "Тишина и внутренний баланс",
    text: "Соседство с духовным центром формирует спокойную, уважительную среду без хаоса и лишнего шума.",
  },
  {
    title: "Закрытый двор без машин",
    text: "Полностью разделяется пространство для транспорта и благоустройства, создавая безопасную зону для детей и обеспечивая комфорт для родителей.",
  },
  {
    title: "Премиальная архитектура",
    text: "Современный арт-деко в нью-йоркской стилистике — дом выглядит статусно сегодня и не устареет завтра.",
  },
  {
    title: "Панорамные окна и воздух",
    text: "Максимум света, ощущение простора и потолки до 3,2 метра формируют другое качество жизни.",
  },
  {
    title: "Благоустройство как в частном клубе",
    text: "Более 8 000 м² двора с зонами для всех возрастов, прогулок, спорта и отдыха — без необходимости выходить за территорию.",
  },
  {
    title: "Продуманная парковочная инфраструктура",
    text: "250 машиномест, наземный и полуподземный паркинг, включая электрозарядки — комфорт без компромиссов.",
  },
  {
    title: "Надёжность застройщика",
    text: "Собственные производственные мощности, лаборатория и контроль качества — гарантия того, что дом строится «для себя».",
  },
]

export default function InfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const offset = -rect.top

      bgRef.current.style.transform = `translateY(${offset * 0.5}px)`

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
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  return (
    <>
    <div ref={sectionRef} className={styles.container}>
      <div ref={bgRef} className={styles.background} />

      <div className={styles.cards}>
        {cardsInfo.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
            className={styles.card}
          >
            <h3><span>{"0"+String(i+1)}</span>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}