import Link from "next/link"
import styles from "./presentationDownload.module.css"
import LineUp from "../../components/DecorLines/LineUp"
import LineDown from "../../components/DecorLines/LineDown"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal/modal"
import RequestForm from "../../components/RequestForm/requestForm"

export default function PresentationDownloadSection() {

    const [isOpen, setIsOpen] = useState(false);

    const phone = "79882233333";
    const message = "Получить планировки на ЖК ПРИТЯЖЕНИЕ";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    return (
        <div className={styles.container}>
            <div className={styles.title}>Скачайте презентацию<br />ЖК Притяжение</div>
            <div className={styles.description}>
                Подробная информация о комплексе, технические характеристики, инфраструктура района и условия рассрочки в одном PDF-файле.
            </div>
            <button className={styles.button} onClick={() => setIsOpen(true)}>Получить презентацию</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}><RequestForm /></Modal>
        </div>
    )
}