"use client"

import { useEffect, useRef } from "react";
import styles from "./numbers.module.css"
import { useLenis } from "lenis/react";


export default function Numbers() {

  const containerRef = useRef<HTMLDivElement>(null)
  const row1 = useRef<HTMLDivElement>(null)
  const row2 = useRef<HTMLDivElement>(null)
  const row3 = useRef<HTMLDivElement>(null)
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return

    const handleScroll = ({ scroll }: { scroll: number }) => {

      const rect = containerRef.current!.getBoundingClientRect()

      const containerTop = scroll + rect.top

      const value = (scroll - containerTop)*0.7

      if (row1.current) {
        row1.current.style.transform = `translateX(${value}px)`
      }
      if (row2.current) {
        row2.current.style.transform = `translateX(${value<0 ? Math.abs(value) : "-" + value}px)`
      }
      if (row3.current) {
        row3.current.style.transform = `translateX(${value}px)`
      }

    }

    lenis.on("scroll", handleScroll)

    return () => {
      lenis.off("scroll", handleScroll)
    }
  }, [lenis])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.row + " " + styles.row_type1} ref={row1}>
        <div className={styles.item + " " + styles.item_floors}>
          <h3>3</h3>
          <p>Корпуса разной этажности 18, 16 и 16 этажей</p>
        </div>

        <div className={styles.item + " " + styles.item_parking}>
          <h3>250</h3>
          <p>Машиномест. 190 подземных и 60 наземных, 5% оборудованы электрозарядками.</p>
        </div>
      </div>

      <div className={styles.row + " " + styles.row_type2} ref={row2}>
        <div className={styles.item + " " + styles.item_area}>
          <h3>8 000 <span className={styles.title_span}>м²</span></h3>
          <p>Площадь благоустройства</p>
        </div>

        <div className={styles.item + " " + styles.item_apartments}>
          <h3>6</h3>
          <p>Типов планировок</p>
        </div>
      </div>

      <div className={styles.row + " " + styles.row_type1} ref={row3}>
        <div className={styles.item + " " + styles.item_height}>
          <h3>3,2 <span className={styles.title_span}>м</span></h3>
          <p>Высота потолков в квартирах, максимум света и ощущение простора </p>
        </div>

        <div className={styles.item + " " + styles.item_distance}>
          <h3>600 <span className={styles.title_span}>м</span></h3>
          <p>До Духовного центра им. Пророка Исы</p>
        </div>
      </div>

    </div>
  )
}