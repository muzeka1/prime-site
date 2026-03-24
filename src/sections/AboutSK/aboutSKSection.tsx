import styles from "./aboutSKSection.module.css"
import AboutSK from "../../components/AboutSK/aboutSK"
import { forwardRef } from "react"

const AboutSKSection = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className={styles.container}><AboutSK/></section>
    )
})

AboutSKSection.displayName = "AboutSKSection"

export default AboutSKSection