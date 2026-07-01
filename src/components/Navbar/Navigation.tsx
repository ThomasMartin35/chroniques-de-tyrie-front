// React Bootstrap components
import Nav from "react-bootstrap/Nav";
// React Router components
import { NavLink } from "react-router-dom";
// Styles
import "./Navbar.css";
// Utils
import { mainNavLinks } from "../../utils/navbarLinks";

///////////////////
//   Component   //
///////////////////

function Navigation() {
  return (
    <Nav className="ms-auto navbar__nav">
      {/* This is the code for the main navigation links, which are visible on all devices. */}
      {mainNavLinks.map((link) => (
        <Nav.Link
          key={link.path}
          className="navbar__link"
          as={NavLink}
          to={link.path}
          end={link.end}
        >
          {link.label}
        </Nav.Link>
      ))}

      {/* This is the code for the mobile action links, which are only visible on mobile devices. */}
      <Nav.Link
        className="navbar__link navbar__mobile-only"
        as={NavLink}
        to="/recherche"
      >
        Rechercher
      </Nav.Link>

      <Nav.Link
        className="navbar__link navbar__mobile-only"
        as={NavLink}
        to="/connexion"
      >
        Connexion
      </Nav.Link>

      <Nav.Link
        className="navbar__link navbar__mobile-only"
        as={NavLink}
        to="/inscription"
      >
        S'inscrire
      </Nav.Link>
    </Nav>
  );
}

export default Navigation;
