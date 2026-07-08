export function getUserRoleLabel(role: string): string {
  switch (role) {
    case "ROLE_ADMIN":
      return "Admin";
    case "ROLE_EDITOR":
      return "Éditeur";
    case "ROLE_CHRONICLER":
      return "Chroniqueur";
    case "ROLE_MEMBER":
      return "Membre";
    default:
      return "Utilisateur";
  }
}
