// React Bootstrap components
import Dropdown from "react-bootstrap/Dropdown";
// Icon Lucide React
import { UserRound } from "lucide-react";
// React Router components
import { Link, useNavigate } from "react-router-dom";
// Components
import { IconButton } from "../IconButton";
// Context
import { useAuth } from "../../contexts/AuthContext";

///////////////////
//   Component   //
///////////////////

function UserMenu() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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

            <Dropdown.Item
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Déconnexion
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item as={Link} to="/connexion">
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
