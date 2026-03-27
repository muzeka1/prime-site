'use client'

import Link from 'next/link'
import { RefObject, useEffect, useRef, useState } from 'react'
import styles from './header.module.css';
import { useLenis } from 'lenis/react';
import Modal from '../../components/Modal/modal';
import RequestForm from '../../components/RequestForm/requestForm';
import Contacts from '../../components/Contacts/contacts';
import AboutSK from '../../components/AboutSK/aboutSK';
import Image from 'next/image';

interface HeaderProps {
  aboutSKSectionRef: RefObject<HTMLElement | null>
}

export default function Header({ aboutSKSectionRef }: HeaderProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis();
  const [requestFormIsOpen, setRequestFormIsOpen] = useState(false)
  const [contactsIsOpen, setContactsIsOpen] = useState(false)
  const [aboutSKIsOpen, setAboutSKIsOpen] = useState(false)
  const [isOpenNavMenu, setIsOpenNavMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0)

  const scrollToTop = () => {
    lenis?.scrollTo(0)
  }

  const scrollToAboutSK = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (aboutSKSectionRef?.current && lenis) {
      lenis.scrollTo(aboutSKSectionRef.current, {
        duration: 0.8,
        easing: (t) => t,
      });
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!lenis) return
    const handleScroll = ({ scroll }: { scroll: number }) => {
      const viewHeight = window.innerHeight;

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
  }, [lenis])

  return (
    <div className={styles.container} ref={container}>

      <div className={styles.image} ref={bgRef}></div>
      <div className={styles.hero_text_container}>
        <div className={styles.hero_text} ref={titleRef}>
          <h1>ЖК Притяжение
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
            <button onClick={()=> scrollToTop()} className={styles.navButton}>Главная</button>
            <button onClick={(e) => scrollToAboutSK(e)} className={styles.navButton}>О компании</button>
            <button onClick={() => setContactsIsOpen(true)} className={styles.navButton}>Контакты</button>
          </nav>

          <div className={styles.burgerButton}>
            <button onClick={() => setIsOpenNavMenu(!isOpenNavMenu)} className={styles.button}>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>

            {windowWidth <= 650 && (
              <div className={`${styles.burgerMenu} ${isOpenNavMenu ? styles.burgerMenuActive : ""}`}>
                <button className={styles.closeBurgerMenuButton} onClick={() => setIsOpenNavMenu(false)}>
                  <Image src='/images/close_white.svg' alt='закрыть кнопка' width={30} height={30}></Image>
                </button>
                <button onClick={() => {
                  scrollToTop()
                  setIsOpenNavMenu(false)
                }} className={styles.burgerMenuButton}>Главная</button>
                <button onClick={(e) => {
                  setIsOpenNavMenu(false)
                  scrollToAboutSK(e)
                }}
                  className={styles.burgerMenuButton}
                >О компании</button>

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