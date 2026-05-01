"use client"

import Header from "../sections/Header/header";
import InfoSection from "../sections/InfoSection/infoSection";
import { ReactLenis, useLenis } from 'lenis/react'
import AboutSection from "../sections/About/about";
import NumbersSection from "../sections/Numbers/numbers";
import GallerySection from "../sections/Gallery/gallery";
import InfoBlock from "../components/InfoBlock/infoBlock";
import ApartmentsBlock from "../sections/Apartments/apartments";
import ScrollToTopButton from "../components/ScrollUpButton/scrollUpButton";

import styles from "./page.module.css";
import { useCallback, useEffect, useRef } from "react";
import AboutSKSection from "../sections/AboutSK/aboutSKSection";
import FooterSection from "../sections/Footer/footer";
import MainInfoSection from "../sections/MainInfo/MainInfo";
import PresentationDownloadSection from "../sections/PresentationDownload/PresentationDownload";
import GeneralInfoSection from "../sections/GeneralInfo/GeneralInfo";
import PhoneButton from "../components/PhoneButton/PhoneButton";

type SectionEl = HTMLElement | null;
type SnapAlign = 'start' | 'end';
type ScrollDirection = 'down' | 'up';

const WHEEL_THRESHOLD = 4;
const TOUCH_THRESHOLD = 10;
const EDGE_TOLERANCE = 50;
const SNAP_DURATION = 2;
const SNAP_COOLDOWN = 100;


export default function Home() {

  const lenis = useLenis();

  const sectionsRef = useRef<HTMLElement[]>([]);
  const aboutSKSectionRef = useRef<HTMLElement | null>(null)
  const currentIndex = useRef(0);
  const isSnapping = useRef(false);
  const lastSnapAt = useRef(0);


  const canTriggerSnap = useCallback(() => {
    const now = performance.now();

    if (isSnapping.current) return false;
    if (now - lastSnapAt.current < SNAP_COOLDOWN) return false;

    return true;
  }, []);

  const getSectionSnapPosition = useCallback((
    section: HTMLElement,
    align: SnapAlign
  ) => {
    const sectionTop = section.offsetTop;

    if (align === 'start') {
      return sectionTop;
    }

    if (section.offsetHeight <= window.innerHeight) {
      return sectionTop;
    }

    return Math.max(
      0,
      section.offsetTop + section.offsetHeight - window.innerHeight
    );
  }, []);

  const goToSection = useCallback((
    index: number,
    align: SnapAlign = 'start'
  ) => {
    if (!lenis) return;
    if (!canTriggerSnap()) return;
    if (index < 0 || index >= sectionsRef.current.length) return;

    const target = sectionsRef.current[index];
    if (!target) return;

    const targetY = getSectionSnapPosition(target, align);

    isSnapping.current = true;
    lastSnapAt.current = performance.now();

    lenis.scrollTo(targetY, {
      duration: SNAP_DURATION,
      lock: true,
      force: true,
      lerp: 0.03,
      onComplete: () => {
        currentIndex.current = index;

        requestAnimationFrame(() => {
          isSnapping.current = false;
        });
      },
    });
  }, [canTriggerSnap, getSectionSnapPosition, lenis]);

  return (
    <>
      <ReactLenis root options={{ lerp: 0.05, syncTouch: true }} />

      <main className={styles.main}>
        <PhoneButton/>
        <ScrollToTopButton/>
        <section>
          <Header aboutSKSectionRef={aboutSKSectionRef}></Header></section>
        <section>
          <GeneralInfoSection/>
          <MainInfoSection/>
          <PresentationDownloadSection/>
          <AboutSection></AboutSection>
          <NumbersSection></NumbersSection>
          <InfoSection></InfoSection>
          <InfoBlock
            title="Авторская Архитектура"
            description="Нью-Йоркский стиль в современном переосмыслении и адаптации. Сочетание силы, геометрии, вертикальных ритмов и ощущение уверенного городского масштаба."
            image="/images/renders/7_crop.jpg"
            imagePosition="left"
          />
          <InfoBlock
            title="ПРОЕКТ МОСТА"
            description="Проектом предусмотрено строительство отдельного моста, который станет важным элементом инфраструктуры жилого комплекса. Мост обеспечит дополнительную связь территории проекта с окружающей городской средой и повысит удобство передвижения для жителей. Реализация моста направлена на улучшение транспортной и пешеходной доступности, а также на формирование целостной и продуманной инфраструктуры района."
            image="/images/renders/18_crop.jpg"
            imagePosition="right"
          />
          <GallerySection />
          <ApartmentsBlock/>
          <AboutSKSection />
          <FooterSection/>
          
        </section>
      </main>
    </>

  );
}
