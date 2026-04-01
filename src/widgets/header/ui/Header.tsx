import { useEffect, useState } from 'react';
import { Container } from '../../../shared/ui/container/Container';
import { useActiveSection } from '../../../features/track-active-section/model/useActiveSection';
import logoHorizontal from '../../../shared/assets/images/logo/logo-horizontal.png';
import { publicText } from '../../../shared/config/publicText';

const navItems = [
  { label: publicText.nav.home, href: '/#home', id: 'home' },
  { label: publicText.nav.about, href: '/#about', id: 'about' },
  { label: publicText.nav.modules, href: '/#modules', id: 'modules' },
  { label: publicText.nav.blog, href: '/#blog', id: 'blog' },
  { label: publicText.nav.contacts, href: '/#contacts', id: 'contacts' },
];

export const Header = () => {
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <Container className="header__container">
          <a className="header__logo" href="/" onClick={handleCloseMenu}>
            <img className="header__logo-horizontal" src={logoHorizontal} alt="IntelClinic AI" />
          </a>

          <nav className="header__nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`header__link ${activeSection === item.id ? 'header__link--active' : ''}`}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <a className="header__cta" href="/#contacts">
              {publicText.nav.cta}
            </a>

            <button
              className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
              type="button"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={handleToggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </Container>
      </header>

      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? 'mobile-menu-backdrop--visible' : ''}`}
        onClick={handleCloseMenu}
      />

      <aside className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__glow mobile-menu__glow--top" />
        <div className="mobile-menu__glow mobile-menu__glow--bottom" />

        <div className="mobile-menu__head">
          <a className="mobile-menu__logo" href="/" onClick={handleCloseMenu}>
            <img className="header__logo-horizontal" src={logoHorizontal} alt="IntelClinic AI" />
          </a>

          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            onClick={handleCloseMenu}
          >
            <span />
            <span />
          </button>
        </div>

        <div className="mobile-menu__body">
          <nav className="mobile-menu__nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`mobile-menu__link ${activeSection === item.id ? 'mobile-menu__link--active' : ''}`}
                href={item.href}
                onClick={handleCloseMenu}
              >
                <span>{item.label}</span>
                <span className="mobile-menu__link-arrow">↗</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu__meta">
            <div className="mobile-menu__meta-card">
              <span className="mobile-menu__meta-label">Email</span>
              <a href="mailto:intel.clinic@yandex.ru">intel.clinic@yandex.ru</a>
            </div>

            <div className="mobile-menu__meta-card">
              <span className="mobile-menu__meta-label">Телефон</span>
              <a href="tel:+79252671743">+7 925 267 1743</a>
            </div>
          </div>
        </div>

        <a className="mobile-menu__cta" href="/#contacts" onClick={handleCloseMenu}>
          {publicText.nav.cta}
        </a>
      </aside>
    </>
  );
};
