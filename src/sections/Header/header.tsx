'use client'

import Link from 'next/link'
import { RefObject, useEffect, useRef, useState } from 'react'
import styles from './header.module.css';
import { useLenis } from 'lenis/react';
import Modal from '../../components/Modal/modal';
import RequestForm from '../../components/RequestForm/requestForm';
import Contacts from '../../components/Contacts/contacts';
import AboutSK from '../../components/AboutSK/aboutSK';

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
      <div className={styles.nav_bar_container}>
        <div className={styles.nav_bar}>
          <Link href="/" className={styles.logo}>
            ПРАЙМ
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className={styles.navButton}>Главная</Link>
            <button onClick={(e) => scrollToAboutSK(e)} className={styles.navButton}>О компании</button>
            <button onClick={() => setContactsIsOpen(true)} className={styles.navButton}>Контакты</button>
          </nav>

          <div className="hidden md:block">
            <button onClick={() => setRequestFormIsOpen(true)} className={styles.navButton}>Оставить заявку</button>
          </div>
          <MobileMenu />
        </div>
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

function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className={styles.button}>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {open && (
        <div className="absolute right-4 top-full mt-2 bg-primary text-text_light rounded-md p-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)}>Главная</Link>
          <Link href="/about" onClick={() => setOpen(false)}>О компании</Link>
          <Link href="/projects/pritjagenie" onClick={() => setOpen(false)}>ЖК</Link>
          <Link href="/calculator" onClick={() => setOpen(false)}>Рассрочка</Link>
          <Link href="/contacts" onClick={() => setOpen(false)}>Контакты</Link>
          <button>Оставить заявку</button>
        </div>
      )}
    </div>
  )
}