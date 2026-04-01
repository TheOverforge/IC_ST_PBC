import { Section } from '../../../shared/ui/section/Section';
import { ContactForm } from '../../../features/send-contact-form/ui/ContactForm';
import { publicText } from '../../../shared/config/publicText';

const { contacts } = publicText;

export const ContactsSection = () => {
  return (
    <Section id="contacts" className="contacts page-section page-section--compact page-section--footer-gap">
      <div className="contacts__grid">
        <div className="contacts__content">
          <div className="contacts__badge">{contacts.badge}</div>
          <h2 className="contacts__title">{contacts.title}</h2>
          <p className="contacts__description">{contacts.description}</p>

          <div className="contacts__info">
            <div className="contacts__info-card">
              <span className="contacts__info-label">Email</span>
              <a className="contacts__info-value" href="mailto:intel.clinic@yandex.ru">
                intel.clinic@yandex.ru
              </a>
            </div>

            <div className="contacts__info-card">
              <span className="contacts__info-label">Телефон</span>
              <a className="contacts__info-value" href="tel:+79252671743">
                +7 (925) 267-17-43
              </a>
            </div>

            <div className="contacts__info-card">
              <span className="contacts__info-label">{contacts.formatLabel}</span>
              <span className="contacts__info-value">{contacts.format}</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
};
