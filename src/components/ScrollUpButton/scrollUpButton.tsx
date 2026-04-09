"use client"

import { useState, useEffect } from "react";
import styles from "./scrollUpButton.module.css"
import Image from "next/image";
import { useLenis } from "lenis/react";

export default function ScrollToTopButton() {

  const [visible, setVisible] = useState(false);
  const lenis = useLenis()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    lenis?.scrollTo(0, {
        lerp: 0.05
    })
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className={styles.button}
      >
        <Image src={"/images/arrowUp.svg"} alt="стрелка вверх" width={32} height={32}></Image>
      </button>
    )
  );
}

