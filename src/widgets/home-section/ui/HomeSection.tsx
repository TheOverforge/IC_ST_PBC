import { Section } from '../../../shared/ui/section/Section';
import heroImage from '../../../shared/assets/images/hero/authorization.jpg';
import { publicText } from '../../../shared/config/publicText';

const { hero } = publicText;

export const HomeSection = () => {
  return (
    <Section id="home" className="hero page-section page-section--hero">
      <div className="hero__content">
        <div className="hero__badge">{hero.badge}</div>

        <h1 className="hero__title">{hero.title}</h1>

        <p className="hero__description">{hero.description}</p>

        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href="/#contacts">
            {hero.primaryCta}
          </a>
          <a className="hero__button hero__button--secondary" href="/#modules">
            {hero.secondaryCta}
          </a>
        </div>

        <ul className="hero__stats">
          <li className="hero__stat">
            <span className="hero__stat-value">{hero.stats.modules.value}</span>
            <span className="hero__stat-label">{hero.stats.modules.label}</span>
          </li>
          <li className="hero__stat">
            <span className="hero__stat-value">{hero.stats.access.value}</span>
            <span className="hero__stat-label">{hero.stats.access.label}</span>
          </li>
          <li className="hero__stat">
            <span className="hero__stat-value">{hero.stats.ai.value}</span>
            <span className="hero__stat-label">{hero.stats.ai.label}</span>
          </li>
        </ul>
      </div>

      <div className="hero-visual">
        <div className="hero-visual__inner">
          <img src={heroImage} alt="Интерфейс IntelClinic" />
        </div>
      </div>
    </Section>
  );
};
