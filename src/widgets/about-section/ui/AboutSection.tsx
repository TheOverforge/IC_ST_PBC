import { Section } from '../../../shared/ui/section/Section';
import { publicText } from '../../../shared/config/publicText';

const { about } = publicText;

export const AboutSection = () => {
  return (
    <Section id="about" className="about page-section page-section--compact page-section--soft">
      <div className="about__grid">
        <div className="about__content">
          <div className="about__badge">{about.badge}</div>
          <h2 className="about__title">{about.title}</h2>
          <p className="about__description">{about.description}</p>
        </div>

        <div className="about__panel">
          <h3 className="about__panel-title">{about.panelTitle}</h3>
          <ul className="about__list">
            {about.points.map((point) => (
              <li key={point} className="about__list-item">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="about__cards">
        {about.cards.map((card) => (
          <article key={card.title} className="about-card">
            <h3 className="about-card__title">{card.title}</h3>
            <p className="about-card__text">{card.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
};
