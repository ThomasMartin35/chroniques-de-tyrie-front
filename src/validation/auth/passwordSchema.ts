import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(1, "Le mot de passe est obligatoire")
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(100, "Le mot de passe ne peut pas dépasser 100 caractères")
  .regex(
    /[A-Z]/,
    "Le mot de passe doit contenir au moins une lettre majuscule",
  )
  .regex(
    /[a-z]/,
    "Le mot de passe doit contenir au moins une lettre minuscule",
  )
  .regex(
    /[0-9]/,
    "Le mot de passe doit contenir au moins un chiffre",
  )
  .regex(
    /[^A-Za-z0-9]/,
    "Le mot de passe doit contenir au moins un caractère spécial",
  );