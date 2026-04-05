import { useState } from "react"
import LineDown from "../../components/DecorLines/LineDown"
import LineUp from "../../components/DecorLines/LineUp"
import styles from "./generalInfo.module.css"
import Modal from "../../components/Modal/modal";
import RequestForm from "../../components/RequestForm/requestForm";

export default function GeneralInfoSection() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Квартиры от застройщика в ЖК «Притяжение» от 114 000 ₽/м² — рассрочка до 60 месяцев без банков и процентов
                </h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>— Одобрено Минстроем</li>
                    <li className={styles.listItem}>—  Собственное производство ЖБИ</li>
                    <li className={styles.listItem}>—  На рынке с 1967 года</li>
                    <li className={styles.listItem}>—  80 объектов уже сдано</li>
                </ul>

                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => setIsOpen(true)}>Получить планировки и цены</button>
                    <p className={styles.description}>Подберем квартиру под ваш бюджет<br />и рассчитаем удобный вариант оплаты</p>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}><RequestForm></RequestForm></Modal>
        </>
    )
}