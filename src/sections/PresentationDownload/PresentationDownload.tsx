import Link from "next/link"
import styles from "./presentationDownload.module.css"
import LineUp from "../../components/DecorLines/LineUp"
import LineDown from "../../components/DecorLines/LineDown"

export default function PresentationDownloadSection() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Скачайте презентацию<br />ЖК Притяжение</div>
            <div className={styles.description}>
                Подробная информация о комплексе, технические характеристики, инфраструктура района и условия рассрочки в одном PDF-файле.
            </div>
            <Link href={'/files/Prityazheniye.pdf'} download>
                <button className={styles.button} >Скачать <span>(35.3 МБайт)</span></button>
            </Link>
        </div>
    )
}