// React Bootstrap components
import Dropdown from "react-bootstrap/Dropdown";
// Icon Lucide React
import { UserRound } from "lucide-react";
// React Router components
import { Link } from "react-router-dom";
// Components
import { IconButton } from "../IconButton";

///////////////////
//   Component   //
///////////////////

function UserMenu() {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as="div" className="navbar__user-toggle">
        <IconButton ariaLabel="Menu utilisateur">
          <UserRound size={30} />
        </IconButton>
      </Dropdown.Toggle>

      <Dropdown.Menu className="navbar__dropdown">
        <Dropdown.Item as={Link} to="/connexion">
          Connexion
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/inscription">
          Inscription
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenu;
