// React Router components
import { Link } from "react-router-dom";

///////////////////
//   Component   //
///////////////////

function Logo() {
    return (
        <Link to="/">
            <img
                alt="Logo du site Chroniques de Tyrie"
                src="/src/assets/logos/logo_cdt.png"
                className="navbar__logo"
            />
        </Link>
    );
}

export default Logo;