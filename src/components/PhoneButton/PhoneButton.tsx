import Link from "next/link"
import styles from "./phoneButton.module.css"
import Image from "next/image"

export default function PhoneButton() {
    return (
        <button className={styles.button}>
            <Link className={styles.link} href={"tel:+79882233333"} target="_blank">
                <Image src="/images/icons/phone.svg" alt='телефон' width={32} height={32} className={styles.icon}></Image>
            </Link>
        </button>
    )
}