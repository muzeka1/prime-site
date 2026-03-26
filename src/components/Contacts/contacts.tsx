import Link from "next/link"
import styles from "./contacts.module.css"

export default function Contacts() {
    return (
        <div className={styles.container}>
            <div className={styles.phone}>
                <p>Номер телефона: </p>
                <Link className={styles.link} href={"tel:+79882233333"} target="_blank">+7 988 223-33-33</Link>
            </div>
            <div className={styles.adress}>
                <p>Адрес: </p>
                <Link className={styles.link} target="_blank" href={"https://yandex.ru/maps?whatshere%5Bpoint%5D=47.497837857210186%2C42.975729633378116&whatshere%5Bzoom%5D=19.04515&ll=47.497837857210186%2C42.975729632996945&z=19.04515&si=rashid.askhabov1"}>улица Абубакарова, 26А, Махачкала, Республика Дагестан</Link>
            </div>
            <div className="flex items-center justify-center">
                <div
                    style={{ position: "relative", overflow: "hidden" }}>
                    <a href="https://yandex.ru/maps/28/makhachkala/?utm_medium=mapframe&utm_source=maps"
                        style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>
                        Махачкала</a>
                    <a href="https://yandex.ru/maps/28/makhachkala/?ll=47.497838%2C42.975730&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=47.497838%2C42.975730&whatshere%5Bzoom%5D=19.04515&z=19"
                        style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>
                        Яндекс Карты — транспорт, навигация, поиск мест
                    </a><iframe src="https://yandex.ru/map-widget/v1/?ll=47.497838%2C42.975730&mode=whatshere&whatshere%5Bpoint%5D=47.497838%2C42.975730&whatshere%5Bzoom%5D=19.04515&z=19" width="560" height="400"
                        style={{ position: "relative" }}>
                    </iframe></div>
            </div>
        </div>
    )
}