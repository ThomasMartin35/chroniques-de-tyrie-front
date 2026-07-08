// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// React Router
import { NavLink } from "react-router-dom";
// Assets
import logo from "../../assets/logos/logo_cdt.png";
// Utils
import { mainNavLinks } from "../../utils/navbarLinks";
import { socialLinks } from "../../utils/socialLinks";
// Styles
import "./Footer.css";

///////////////////
//   Component   //
///////////////////
function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="g-5">
          <Col xs={12} md={6} lg={3} className="text-center text-lg-start">
            <img
              src={logo}
              alt="Logo Chroniques de Tyrie"
              className="footer__logo"
            />
          </Col>

          <Col xs={12} md={6} lg={3} className="text-center text-lg-start">
            <h5 className="footer__title">Navigation</h5>

            <ul className="footer__list">
              {mainNavLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.end}
                    className="footer__link"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} md={6} lg={3} className="text-center text-lg-start">
            <h5 className="footer__title">Communauté</h5>

            <p className="footer__text">
              Rejoignez-nous sur les réseaux sociaux
            </p>

            <div className="footer__social-icons justify-content-center justify-content-lg-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="footer__icon" size={32} />
                  </a>
                );
              })}
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} className="text-center text-lg-start">
            <h5 className="footer__title">Mentions</h5>

            <ul className="footer__list">
              {/* TODO : Add the following links to the footer for legal and contact information: */}
              <li>
                <NavLink to="/mentions-legales" className="footer__link">
                  Mentions légales
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/politique-confidentialite"
                  className="footer__link"
                >
                  Politique de confidentialité
                </NavLink>
              </li>
              <li>
                <NavLink to="/conditions-utilisation" className="footer__link">
                  Conditions d'utilisation
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="footer__link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer__separator" />

        <p className="footer__copyright text-center">
          © {new Date().getFullYear()} - Créé par
          <a
            href="https://tyclick.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            TyClick - Thomas MARTIN
          </a>
        </p>
        <p className="footer__copyright text-center">
          Fansite communautaire — Site non officiel, non affilié à ArenaNet.
        </p>
        <p className="footer__copyright text-center">
          Tous droits réservés à ArenaNet et NCSoft. Les images, vidéos et
          autres médias sont la propriété de leurs détenteurs respectifs.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
