import { useReveal } from '../../../shared/lib/useReveal';
import registryImage from '../../../shared/assets/images/modules/registry.jpg';
import outpatientImage from '../../../shared/assets/images/modules/ambulatory-card.jpg';
import historyImage from '../../../shared/assets/images/modules/case-history.jpg';
import analyticsImage from '../../../shared/assets/images/modules/statistics.jpg';
import treatmentImage from '../../../shared/assets/images/modules/treatment-workflow.jpg';

type ModuleItem = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
  featured?: boolean;
};

const moduleList: ModuleItem[] = [
  {
    id: 'registry',
    title: 'Регистратура',
    label: 'Регистратура',
    description:
      'Маршрутизация пациентов, быстрый поиск, запись на приём и front-desk процессы в едином цифровом интерфейсе.',
    image: registryImage,
    featured: true,
  },
  {
    id: 'outpatient',
    title: 'Амбулаторная карта',
    label: 'Записи',
    description:
      'Структурированные данные пациента, история визитов и медицинский контекст в удобной клинической форме.',
    image: outpatientImage,
  },
  {
    id: 'history',
    title: 'История болезни',
    label: 'Клиника',
    description:
      'Планы лечения, статусы, заметки и долгосрочное наблюдение по каждому клиническому случаю.',
    image: historyImage,
  },
  {
    id: 'analytics',
    title: 'Статистика',
    label: 'Аналитика',
    description:
      'Показатели эффективности, графики и операционный мониторинг для управления клиникой.',
    image: analyticsImage,
  },
  {
    id: 'treatment',
    title: 'Процесс лечения',
    label: 'Процессы',
    description:
      'Пошаговые протоколы лечения и контроль клинических процессов для врачей и администраторов.',
    image: treatmentImage,
  },
];

const featured = moduleList.find((item) => item.featured);
const regular = moduleList.filter((item) => !item.featured);

export const ModulesSection = () => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`page-section page-section--compact reveal${isVisible ? ' is-visible' : ''}`}
      id="modules"
    >
      <div className="section-shell">
        <div className="section-head">
          <div style={{ display: 'grid', gap: 14 }}>
            <span className="section-badge">Ключевые модули</span>
            <h2 className="section-title">
              Модули системы для каждого медицинского процесса
            </h2>
          </div>

          <p className="section-text">
            Платформа построена как модульная экосистема: каждый блок решает
            конкретную задачу клиники и работает как часть единого интерфейса.
          </p>
        </div>

        <div className="modules-mosaic">
          {featured ? (
            <article className="module-card module-card--featured">
              <div className="module-card__media">
                <img src={featured.image} alt={featured.title} />
              </div>

              <div style={{ display: 'grid', gap: 10 }}>
                <span className="module-card__tag">{featured.label}</span>
                <h3 className="module-card__title">{featured.title}</h3>
                <p className="module-card__text">{featured.description}</p>
              </div>

              <div className="module-card__footer">
                <a href="#contacts" className="button button--secondary">
                  Обсудить внедрение
                </a>
              </div>
            </article>
          ) : null}

          {regular[0] ? (
            <article className="module-card module-card--2">
              <div className="module-card__media">
                <img src={regular[0].image} alt={regular[0].title} />
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <span className="module-card__tag">{regular[0].label}</span>
                <h3 className="module-card__title">{regular[0].title}</h3>
                <p className="module-card__text">{regular[0].description}</p>
              </div>
            </article>
          ) : null}

          {regular[1] ? (
            <article className="module-card module-card--3">
              <div className="module-card__media">
                <img src={regular[1].image} alt={regular[1].title} />
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <span className="module-card__tag">{regular[1].label}</span>
                <h3 className="module-card__title">{regular[1].title}</h3>
                <p className="module-card__text">{regular[1].description}</p>
              </div>
            </article>
          ) : null}

          {regular[2] ? (
            <article className="module-card module-card--4">
              <div className="module-card__media">
                <img src={regular[2].image} alt={regular[2].title} />
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <span className="module-card__tag">{regular[2].label}</span>
                <h3 className="module-card__title">{regular[2].title}</h3>
                <p className="module-card__text">{regular[2].description}</p>
              </div>
            </article>
          ) : null}

          {regular[3] ? (
            <article className="module-card module-card--5">
              <div className="module-card__media">
                <img src={regular[3].image} alt={regular[3].title} />
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <span className="module-card__tag">{regular[3].label}</span>
                <h3 className="module-card__title">{regular[3].title}</h3>
                <p className="module-card__text">{regular[3].description}</p>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
};
