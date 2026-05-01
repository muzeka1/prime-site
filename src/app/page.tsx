"use client"

import Header from "../sections/Header/header";
import InfoSection from "../sections/InfoSection/infoSection";
import AboutSection from "../sections/About/about";
import NumbersSection from "../sections/Numbers/numbers";
import GallerySection from "../sections/Gallery/gallery";
import InfoBlock from "../components/InfoBlock/infoBlock";
import ApartmentsBlock from "../sections/Apartments/apartments";
import ScrollToTopButton from "../components/ScrollUpButton/scrollUpButton";

import styles from "./page.module.css";
import AboutSKSection from "../sections/AboutSK/aboutSKSection";
import FooterSection from "../sections/Footer/footer";
import MainInfoSection from "../sections/MainInfo/MainInfo";
import PresentationDownloadSection from "../sections/PresentationDownload/PresentationDownload";
import GeneralInfoSection from "../sections/GeneralInfo/GeneralInfo";
import PhoneButton from "../components/PhoneButton/PhoneButton";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <PhoneButton/>
        <ScrollToTopButton/>
        <section>
          <Header></Header></section>
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
