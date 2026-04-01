import { useEffect } from 'react';
import { Header } from '../../../widgets/header/ui/Header';
import { HomeSection } from '../../../widgets/home-section/ui/HomeSection';
import { AboutSection } from '../../../widgets/about-section/ui/AboutSection';
import { ModulesSection } from '../../../widgets/modules-section/ui/ModulesSection';
import { PatentSection } from '../../../widgets/patent-section/ui/PatentSection';
import { BlogSection } from '../../../widgets/blog-section/ui/BlogSection';
import { ContactsSection } from '../../../widgets/contacts-section/ui/ContactsSection';
import { Footer } from '../../../widgets/footer/ui/Footer';
import { applyDocumentMeta } from '../../../shared/lib/meta';
import { applyCanonical } from '../../../shared/lib/canonical';
import { SITE_URL } from '../../../shared/config/api';

export const LandingPage = () => {
  useEffect(() => {
    applyDocumentMeta({
      title: 'IntelClinic — цифровая медицинская платформа для клиник',
      description:
        'IntelClinic объединяет регистратуру, электронные записи, процессы лечения, аналитику и рабочие инструменты клиники в единую платформу.',
      image: `${SITE_URL}/og-cover.jpg`,
      url: SITE_URL,
    });
    applyCanonical(SITE_URL);
  }, []);

  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <AboutSection />
        <ModulesSection />
        <PatentSection />
        <BlogSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
};
