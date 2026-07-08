// React Bootstrap
import Badge from "react-bootstrap/Badge";
// Utils
import { getUserRoleLabel } from "../../../utils/userRole";
// Styles
import "./RoleBadge.css";

///////////////////
//     Props     //
///////////////////
interface RoleBadgeProps {
  role: string;
}

///////////////////
//   Component   //
///////////////////
function RoleBadge({ role }: RoleBadgeProps) {
  const roleClass = `role-badge role-badge--${role.toLowerCase()}`;

  ///////////////////
  //    Render     //
  ///////////////////
  return <Badge className={roleClass}>{getUserRoleLabel(role)}</Badge>;
}

export default RoleBadge;
