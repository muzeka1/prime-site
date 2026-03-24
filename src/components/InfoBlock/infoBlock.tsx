import Image from 'next/image';
import styles from './infoBlock.module.css';

type Props = {
    title: string;
    description: string;
    image: string;
    imagePosition?: 'left' | 'right';
};

export default function InfoBlock({
    title,
    description,
    image,
    imagePosition = 'right',
}: Props) {
    return (
        <div
            className={`${styles.container} ${imagePosition === 'left' ? styles.reverse : ''
                }`}
        >
            <div className={styles.line_up}></div>
            <div className={styles.text}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.image}>
                <Image src={image} alt={title} fill sizes="1500px" style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
        </div>
    );
}