import Link from "next/link"
import styles from "./presentationDownload.module.css"
import LineUp from "../../components/DecorLines/LineUp"
import LineDown from "../../components/DecorLines/LineDown"

export default function PresentationDownloadSection() {

    const phone = "89882233333";
    const message = "Получить планировки на ЖК ПРИТЯЖЕНИЕ";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    return (
        <div className={styles.container}>
            <div className={styles.title}>Скачайте презентацию<br />ЖК Притяжение</div>
            <div className={styles.description}>
                Подробная информация о комплексе, технические характеристики, инфраструктура района и условия рассрочки в одном PDF-файле.
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <button className={styles.button}>Получить презентацию</button>
            </a>
        </div>
    )
}