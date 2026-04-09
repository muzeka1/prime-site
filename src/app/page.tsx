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
  const touchStartY = useRef(0);

  const setSectionRef = useCallback((el: SectionEl, index: number) => {
    if (!el) return;
    sectionsRef.current[index] = el;
  }, []);

  const getViewportHeight = useCallback(() => window.innerHeight, []);

  const getSlideNumFromUrl = useCallback(() => {
    const url = new URL(window.location.href);
    const value = Number(url.searchParams.get('slideNum'));

    if (!Number.isFinite(value) || value < 1) return 0;

    const normalizedIndex = value - 1;
    const lastIndex = sectionsRef.current.length - 1;

    if (normalizedIndex > lastIndex) return Math.max(0, lastIndex);

    return normalizedIndex;
  }, []);

  const isTallSection = useCallback((section: HTMLElement) => {
    return section.offsetHeight > getViewportHeight();
  }, [getViewportHeight]);

  const canSnapDown = useCallback((section: HTMLElement) => {
    if (!isTallSection(section)) return true;

    const rect = section.getBoundingClientRect();
    return rect.bottom <= getViewportHeight() + EDGE_TOLERANCE;
  }, [getViewportHeight, isTallSection]);

  const canSnapUp = useCallback((section: HTMLElement) => {
    if (!isTallSection(section)) return true;

    const rect = section.getBoundingClientRect();
    return rect.top >= -EDGE_TOLERANCE;
  }, [isTallSection]);

  const getCurrentSectionIndex = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;

    for (let i = 0; i < sectionsRef.current.length; i++) {
      const section = sectionsRef.current[i];
      if (!section) continue;

      const rect = section.getBoundingClientRect();

      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        return i;
      }
    }

    let closestIndex = 0;
    let minDistance = Infinity;

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

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

  useEffect(() => {
    if (!lenis) return;

    const syncCurrentIndex = () => {
      currentIndex.current = getCurrentSectionIndex();
    };

    const trySnapByDirection = (direction: ScrollDirection) => {
      syncCurrentIndex();

      const index = currentIndex.current;
      const currentSection = sectionsRef.current[index];

      if (!currentSection) return;

      if (direction === 'down') {
        if (canSnapDown(currentSection)) {
          goToSection(index + 1, 'start');
        }
      }

      if (direction === 'up') {
        if (canSnapUp(currentSection)) {
          goToSection(index - 1, 'end');
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      if (e.deltaY > 0) {
        trySnapByDirection('down');
      } else {
        trySnapByDirection('up');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSnapping.current) return;

      const endY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - endY;

      if (Math.abs(diff) < TOUCH_THRESHOLD) return;

      if (diff > 0) {
        trySnapByDirection('down');
      } else {
        trySnapByDirection('up');
      }
    };

    const handleLenisScroll = () => {
      if (isSnapping.current) return;
      currentIndex.current = getCurrentSectionIndex();
    };

    lenis.on('scroll', handleLenisScroll);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      lenis.off('scroll', handleLenisScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lenis, getCurrentSectionIndex, canSnapDown, canSnapUp, goToSection]);

  useEffect(() => {
    if (!lenis) return;
    if (!sectionsRef.current.length) return;

    const initialIndex = getSlideNumFromUrl();
    const target = sectionsRef.current[initialIndex];

    if (!target) return;

    requestAnimationFrame(() => {
      lenis.scrollTo(target.offsetTop, {
        immediate: true,
        duration: SNAP_DURATION,
        force: true,
        lerp: 0.02,
      });

      currentIndex.current = initialIndex;
    });
  }, [lenis, getSlideNumFromUrl]);

  useEffect(() => {
    if (!lenis) return;

    const handlePopState = () => {
      const index = getSlideNumFromUrl();
      const target = sectionsRef.current[index];

      if (!target) return;

      isSnapping.current = true;

      lenis.scrollTo(target.offsetTop, {
        duration: SNAP_DURATION,
        lerp: 0.02,
        lock: true,
        force: true,
        onComplete: () => {
          currentIndex.current = index;
          isSnapping.current = false;
        },
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [lenis, getSlideNumFromUrl]);

  return (
    <>
      <ReactLenis root options={{ lerp: 0.05, syncTouch: true }} />

      <main className={styles.main}>
        <PhoneButton/>
        <ScrollToTopButton/>
        <section
          // ref={(el) => setSectionRef(el, 0)}
        >
          
          <Header aboutSKSectionRef={aboutSKSectionRef}></Header></section>
        <section
          // ref={(el) => setSectionRef(el, 1)}
        >
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
          <ApartmentsBlock />
          <AboutSKSection ref={aboutSKSectionRef} />
          <FooterSection/>
          
        </section>
      </main>
    </>

  );
}
