// React Bootstrap components
import Nav from "react-bootstrap/Nav";
// React Router components
import { NavLink, useNavigate } from "react-router-dom";
// Context
import { useAuth } from "../../contexts/AuthContext";
// Styles
import "./Navbar.css";
// Utils
import { mainNavLinks } from "../../utils/navbarLinks";

//////////////////
//  Component   //
//////////////////
function Navigation() {
  /**
   * This function is used to navigate to a different route in the application. It is provided by the useNavigate hook from react-router-dom. When called with a path, it will change the current route to that path, allowing for programmatic navigation within the app.
   */
  const navigate = useNavigate();

  /**
   * The useAuth hook is used to access the authentication context of the application. It provides information about the current authentication state, such as whether the user is authenticated and functions to log in or log out. In this case, it is used to determine if the user is logged in and to handle the logout process when the user clicks the logout link.
   */
  const { isAuthenticated, logout } = useAuth();

  /**
   * The handleLogout function is responsible for logging the user out of the application. It calls the logout function from the authentication context to clear the user's session and then uses the navigate function to redirect the user to the home page ("/"). This ensures that after logging out, the user is taken back to a safe starting point in the application.
   */
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };


  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <Nav className="ms-auto navbar__nav">
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

      <Nav.Link
        className="navbar__link navbar__mobile-only"
        as={NavLink}
        to="/recherche"
      >
        Rechercher
      </Nav.Link>

      {isAuthenticated ? (
        <>
          <Nav.Link
            className="navbar__link navbar__mobile-only"
            as={NavLink}
            to="/profil"
          >
            Mon profil
          </Nav.Link>

          <Nav.Link
            className="navbar__link navbar__mobile-only"
            onClick={handleLogout}
          >
            Déconnexion
          </Nav.Link>
        </>
      ) : (
        <>
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
        </>
      )}
    </Nav>
  );
}

export default Navigation;
