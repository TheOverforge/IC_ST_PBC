import { Section } from '../../../shared/ui/section/Section';

export const PatentSection = () => {
  return (
    <Section id="patent" className="patent page-section page-section--compact">
      <div className="patent__inner">
        <div className="patent__content">
          <div className="about__badge">Интеллектуальная собственность</div>
          <h2 className="patent__title">
            Свидетельство о регистрации<br />программы для ЭВМ
          </h2>
          <p className="patent__description">
            Платформа IntelClinic защищена свидетельством о государственной
            регистрации программы для ЭВМ. Система модулей для каждого
            медицинского процесса разработана и запатентована нашей командой.
          </p>
        </div>

        <div className="patent__image-wrap">
          <img
            className="patent__image"
            src="/patent.png"
            alt="Свидетельство о регистрации программы для ЭВМ — IntelClinic"
          />
        </div>
      </div>
    </Section>
  );
};
