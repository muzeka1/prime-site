import Link from "next/link"
import styles from "./footer.module.css"
import { useLenis } from "lenis/react"
import Modal from "../../components/Modal/modal"
import { useState } from "react"
import RequestForm from "../../components/RequestForm/requestForm"

export default function FooterSection() {

    const lenis = useLenis()
    const [isOpen, setIsOpen] = useState(false)

    function scrollTop() {
        lenis?.scrollTo(0)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logoBlock}>
                <button onClick={() => scrollTop()} className={styles.logo}>
                    ПРАЙМ
                </button>
                <button className={styles.requestButton} onClick={()=> setIsOpen(true)}>Оставить заявку</button>
            </div>
            <div className={styles.contacts}>
                <Link target="_blank" href="mailto:skprime.mhk@mail.ru" className={styles.email}>skprime.mhk@mail.ru</Link>
                <Link target="_blank" href="tel:+79882233333" className={styles.phone}>+7 988 223-33-33</Link>
                <Link target="_blank"
                    href="https://yandex.ru/maps?whatshere%5Bpoint%5D=47.497837857210186%2C42.975729633378116&whatshere%5Bzoom%5D=19.04515&ll=47.497837857210186%2C42.975729632996945&z=19.04515&si=rashid.askhabov1"
                    className={styles.adress}
                >
                    улица Абубакарова, 26А<br /> Махачкала, Республика Дагестан
                </Link>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <RequestForm></RequestForm>
            </Modal>
        </div>
    )
}