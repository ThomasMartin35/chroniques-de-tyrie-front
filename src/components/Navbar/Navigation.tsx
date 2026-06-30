// React Bootstrap components
import Nav from "react-bootstrap/Nav";
// React Router components
import { NavLink } from "react-router-dom";
// Styles
import "./Navbar.css";

///////////////////
//   Component   //
///////////////////

function Navigation() {
  return (
    <Nav className="ms-auto navbar__nav">
      {/* This is the code for the main navigation links, which are visible on all devices. */}
      <Nav.Link as={NavLink} to="/" end className="navbar__link">
        Accueil
      </Nav.Link>

      <Nav.Link as={NavLink} to="/actualites" className="navbar__link">
        Actualités
      </Nav.Link>

      <Nav.Link as={NavLink} to="/chroniques" className="navbar__link">
        Chroniques
      </Nav.Link>

      <Nav.Link as={NavLink} to="/podcasts" className="navbar__link">
        Podcasts
      </Nav.Link>

      <Nav.Link as={NavLink} to="/guides" className="navbar__link">
        Guides
      </Nav.Link>

      <Nav.Link as={NavLink} to="/a-propos" className="navbar__link">
        À propos
      </Nav.Link>

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
