/**
 * Function to get a user-friendly error message for registration errors.
 * @param errorMessage - The error message received from the server.
 * @returns a user-friendly error message.
 */
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

/**
 * Function to get a user-friendly error message for password update errors.
 * @param message - The error message received from the server.
 * @returns A user-friendly error message.
 */
export function getPasswordErrorMessage(message?: string): string {
  switch (message) {
    case "Current password is incorrect":
      return "Le mot de passe actuel est incorrect.";

    case "New password must be different from the current password":
      return "Le nouveau mot de passe doit être différent du mot de passe actuel.";

    case "New password and confirm password do not match":
      return "Les nouveaux mots de passe ne correspondent pas.";

    default:
      return "Impossible de modifier le mot de passe.";
  }
}