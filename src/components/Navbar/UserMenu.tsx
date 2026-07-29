// React Bootstrap components
import Dropdown from "react-bootstrap/Dropdown";
// Icon Lucide React
import { UserRound } from "lucide-react";
// React Router components
import { Link, useLocation } from "react-router-dom";
// Components
import { IconButton } from "../IconButton";
// Context
import { useAuth } from "../../contexts/AuthContext";

///////////////////
//   Component   //
///////////////////

function UserMenu() {
  /**
   * The useAuth hook is used to access the authentication context of the application. It provides information about the current authentication state, such as whether the user is authenticated and functions to log in or log out. In this case, it is used to determine if the user is logged in and to handle the logout process when the user clicks the logout link.
   */
  const { isAuthenticated, logout } = useAuth();

  /**
   * The useLocation hook from react-router-dom is used to access the current location object, which contains information about the current URL. This can be useful for determining where the user is in the application and can be used to manage navigation state, such as redirecting users after login or logout.
   */
  const location = useLocation();

  /**
   * The handleLogout function is responsible for logging the user out of the application. It calls the logout function from the authentication context to clear the user's session and then uses the navigate function to redirect the user to the home page ("/"). This ensures that after logging out, the user is taken back to a safe starting point in the application.
   */
  const handleLogout = async () => {
    await logout();
  };

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as="div" className="navbar__user-toggle">
        <IconButton ariaLabel="Menu utilisateur">
          <UserRound size={30} />
        </IconButton>
      </Dropdown.Toggle>

      <Dropdown.Menu className="navbar__dropdown">
        {isAuthenticated ? (
          <>
            <Dropdown.Item as={Link} to="/profil">
              Mon profil
            </Dropdown.Item>

            <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item as={Link} to="/connexion" state={{ from: location }}>
              Connexion
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/inscription">
              Inscription
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenu;
