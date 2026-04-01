import logoHorizontal from '../../../shared/assets/images/logo/logo-horizontal.png';
import { Container } from '../../../shared/ui/container/Container';
import { publicText } from '../../../shared/config/publicText';

const { footer } = publicText;

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={logoHorizontal} alt="IntelClinic AI" className="footer__logo-img" />
            </div>
            <p className="footer__text">{footer.description}</p>
          </div>

          <nav className="footer__nav">
            <a href="/#home">{footer.nav.home}</a>
            <a href="/#about">{footer.nav.about}</a>
            <a href="/#modules">{footer.nav.modules}</a>
            <a href="/#blog">{footer.nav.blog}</a>
            <a href="/#contacts">{footer.nav.contacts}</a>
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">© 2025 ООО «Интел-Клиника»</div>

          <div className="footer__legal">
            <span className="footer__legal-item"><b>ОГРН</b> 1254400003076</span>
            <span className="footer__legal-sep" />
            <span className="footer__legal-item"><b>ИНН</b> 4400025769</span>
            <span className="footer__legal-sep" />
            <span className="footer__legal-item"><b>КПП</b> 440001001</span>
            <span className="footer__legal-sep" />
            <span className="footer__legal-item">157200, Костромская обл., г. Галич, ул. Иванова, д. 2</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
