export function getRegisterErrorMessage(errorMessage?: string): string {
  switch (errorMessage) {
    case "Email already in use":
      return "Cette adresse e-mail est déjà utilisée.";

    case "Username already in use":
      return "Ce nom d'utilisateur est déjà utilisé.";

    default:
      return "Impossible de créer le compte.";
  }
}