// Icon Lucide React
import { Search } from "lucide-react";
// Components
import { IconButton } from "../IconButton";
// React Router components
import { useNavigate } from "react-router-dom";

///////////////////
//   Component   //
///////////////////

function SearchButton() {
  const navigate = useNavigate();

  return (
    <IconButton ariaLabel="Rechercher" onClick={() => navigate("/recherche")}>
      <Search size={30} />
    </IconButton>
  );
}

export default SearchButton;
