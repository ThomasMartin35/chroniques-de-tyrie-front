// React Bootstrap components
import Container from "react-bootstrap/Container";
import NavbarBootstrap from "react-bootstrap/Navbar";
// Styles
import "./Navbar.css";
// Components
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchButton from "./SearchButton";
import UserMenu from "./UserMenu";

///////////////////
//   Component   //
///////////////////

function Navbar() {
  return (
    <NavbarBootstrap expand="lg" className="navbar">
      <Container className="navbar__container">
        <Logo />

        <NavbarBootstrap.Toggle aria-controls="main-navbar-nav" />

        <NavbarBootstrap.Collapse
          id="main-navbar-nav"
          className="navbar__collapse"
        >
          <Navigation />

          <div className="navbar__actions">
            <SearchButton />
            <UserMenu />
          </div>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}

export default Navbar;
