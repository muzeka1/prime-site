'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './header.module.css';
import { useLenis } from 'lenis/react';
import Modal from '../../components/Modal/modal';
import RequestForm from '../../components/RequestForm/requestForm';
import Contacts from '../../components/Contacts/contacts';
import AboutSK from '../../components/AboutSK/aboutSK';
import Image from 'next/image';

export default function Header() {
  const bgRef = useRef<HTMLVideoElement>(null)
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis();
  const [requestFormIsOpen, setRequestFormIsOpen] = useState(false)
  const [contactsIsOpen, setContactsIsOpen] = useState(false)
  const [aboutSKIsOpen, setAboutSKIsOpen] = useState(false)
  const [isOpenNavMenu, setIsOpenNavMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0)
  const [isRequestButtonActive, setIsRequestButtonActive] = useState(false)

  // const scrollToSection = (id: string) => {
  //   const el = document.getElementById(id);

  //   if (el && lenis) {
  //     lenis.scrollTo(el.offsetTop, {
  //       duration: 1.2,
  //     });
  //   }
  // };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (el && lenis) {
      lenis.scrollTo(el, {
        duration: 1.2,
      });
    }
  };


  const scrollToTop = () => {
    lenis?.scrollTo(0)
  }

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  useEffect(() => {
    if (!lenis) return

    if (isOpenNavMenu) {
      lenis.stop()
      return
    }

    lenis.start()

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const viewHeight = window.innerHeight;
      if (scroll > viewHeight) {
        setIsRequestButtonActive(true)
      } else {
        setIsRequestButtonActive(false)
      }


      const opacity = scroll / viewHeight < 1 ? 1 - (scroll / viewHeight) * 4 + 0.2 : 1;

      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scroll * 0.8}px)`
      }

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${scroll * -0.8}px)`
        titleRef.current.style.opacity = `${opacity}`
      }

    }

    lenis.on("scroll", handleScroll)
    return () => {
      lenis.off("scroll", handleScroll)
    }
  }, [lenis, isOpenNavMenu])

  return (
    <div className={styles.container} ref={container}>
      <video
        ref={bgRef}
        key={windowWidth < 800 ? "mobile" : "desktop"}
        className={styles.image}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={windowWidth < 800
          ? "/video/background9x16.mp4"
          : "/video/background16x9.mp4"}>
      </video>
      <div className={styles.hero_text_container}>
        <div className={styles.hero_text} ref={titleRef}>
          <h1>
            ЖК Притяжение
          </h1>
        </div>
      </div>
      <button onClick={() => setRequestFormIsOpen(true)} className={`${styles.navButton} ${styles.requestButton}`}>Оставить заявку</button>
      <div className={styles.nav_bar_container}>
        <div className={styles.nav_bar}>
          <Link href="/" className={styles.logo}>
            ПРАЙМ
          </Link>

          <nav className={styles.navPanel}>
            <button onClick={() => scrollToTop()} className={styles.navButton}>Главная</button>
            <button onClick={() => scrollToSection("aboutSK")} className={styles.navButton}>О компании</button>
            <button onClick={() => scrollToSection("apartments")} className={styles.navButton}>Квартиры</button>
            <button onClick={() => setContactsIsOpen(true)} className={styles.navButton}>Контакты</button>
          </nav>


          <button onClick={() => setRequestFormIsOpen(true)} className={`${styles.navButton} ${styles.navRequestButton} ${isRequestButtonActive ? styles.requestButtonActive : ""}`}>
            Оставить заявку
          </button>



          <div className={styles.burgerButton}>
            <button onClick={() => setIsOpenNavMenu(!isOpenNavMenu)} className={styles.button}>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>

            {windowWidth <= 1000 && (
              <div className={`${styles.burgerMenu} ${isOpenNavMenu ? styles.burgerMenuActive : ""}`}>
                <button className={styles.closeBurgerMenuButton} onClick={() => setIsOpenNavMenu(false)}>
                  <Image src='/images/close_white.svg' alt='закрыть кнопка' width={30} height={30}></Image>
                </button>
                <button onClick={() => {
                  scrollToTop()
                  setIsOpenNavMenu(false)
                }} className={styles.burgerMenuButton}>Главная</button>
                <button onClick={() => {
                  setIsOpenNavMenu(false)
                  scrollToSection("aboutSK")
                }}
                  className={styles.burgerMenuButton}
                >О компании</button>

                <button
                  onClick={() => {
                    setIsOpenNavMenu(false)
                    scrollToSection("apartments")
                  }}
                  className={styles.burgerMenuButton}>
                  Квартиры</button>
                <button onClick={() => {
                  setIsOpenNavMenu(false)
                  setContactsIsOpen(true)
                }}
                  className={styles.burgerMenuButton}
                >Контакты</button>

                <button onClick={() => {
                  setIsOpenNavMenu(false);
                  setRequestFormIsOpen(true);
                }}
                  className={styles.burgerMenuButton}
                >Оставить заявку
                </button>
                <Link className={styles.phoneLink} href={"tel:+79882233333"} target="_blank">+7 988 223-33-33</Link>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/prime.development__?igsh=ZHl6eDViNjljZnlq" target="_blank">
                    <svg width={50} height={50} className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor"></path> <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor"></path> </g></svg>
                  </a>
                  <a href="https://t.me/sk_prime_development" target="_blank">
                    <svg width={50} height={50} className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="currentColor"></path> </g></svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      <div className={styles.arrowDown}>
        <Image src="/images/arrowDown.svg" alt="стрелка вниз" width={64} height={64} />
      </div>
      <Modal isOpen={requestFormIsOpen} onClose={() => setRequestFormIsOpen(false)}>
        <RequestForm></RequestForm>
      </Modal>
      <Modal isOpen={contactsIsOpen} onClose={() => setContactsIsOpen(false)}>
        <Contacts></Contacts>
      </Modal>
      <Modal isOpen={aboutSKIsOpen} onClose={() => setAboutSKIsOpen(false)}>
        <AboutSK></AboutSK>
      </Modal>
    </div>
  )
}