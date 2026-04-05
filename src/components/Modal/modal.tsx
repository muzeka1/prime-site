"use client";

import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./modal.module.css"
import { useLenis } from "lenis/react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const lenis = useLenis()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!lenis) return;

        if (isOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }

        return () => {
            lenis.start();
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);

        };
    }, [isOpen, onClose, lenis]);

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isOpen ? styles.open : ''}`}
            onClick={() => {
                onClose();
            }}
        >
            <div className={styles.window} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className={styles.button}
                >
                    <Image src='/images/close.svg' alt="иконка закрыть" width={24} height={24}></Image>
                </button>

                {children}
            </div>

        </div>
    );
}