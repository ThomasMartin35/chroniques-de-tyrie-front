// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
// React Hook Form (Validation)
import { useForm } from "react-hook-form";
// React Router
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
// Zod (Validation)
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../validation/auth/passwordSchema";
// Components
import { AuthCard } from "../../components/AuthCard";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Form";
// Layouts
import { AuthLayout } from "../../layouts/AuthLayout";
// Styles
import "./ResetPasswordPage.css";
// Services
import { authService } from "../../services/authService";

///////////////////
//   Validation  //
///////////////////
const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est obligatoire"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

///////////////////
//   Component   //
///////////////////
function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Retrieve the token from the URL query parameters using useSearchParams. The token is required for resetting the password and is typically sent to the user's email. If the token is not present or is empty, the user will not be able to reset their password.
   */
  const [searchParams] = useSearchParams();

  /**
   * useNavigate hook from React Router to programmatically navigate the user to different routes after successful password reset or in case of errors. This is useful for redirecting the user to the login page after they have successfully reset their password.
   */
  const navigate = useNavigate();

  /**
   * Check if the token is present in the URL query parameters. The hasToken variable will be true if the token exists and is not an empty string, and false otherwise. This can be used to conditionally render content or redirect the user if the token is missing.
   */
  const token = searchParams.get("token")?.trim() ?? "";
  const hasToken = token.length > 0;

  /**
   * State to manage success and error messages
   */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setErrorMessage(null);
    if (!token) {
      setErrorMessage("Ce lien de réinitialisation est invalide.");
      return;
    }
    try {
      await authService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      navigate("/connexion", {
        replace: true,
        state: {
          successMessage:
            "Votre mot de passe a été réinitialisé avec succès. " +
            "Vous pouvez maintenant vous connecter.",
        },
      });
    } catch {
      setErrorMessage("Ce lien de réinitialisation est invalide ou a expiré.");
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Réinitialiser mon mot de passe"
        footer={
          <>
            <p>Pas encore de compte ?</p>
            <NavLink to="/inscription">
              <h6 className="reset-password-page__link">Créer un compte →</h6>
            </NavLink>
          </>
        }
      >
        <p>
          Choisissez un nouveau mot de passe pour votre compte. Assurez-vous de
          choisir un mot de passe fort et unique pour protéger votre compte.
        </p>

        {!hasToken && (
          <p className="page__error" role="alert">
            Ce lien de réinitialisation est invalide.
          </p>
        )}
        {/* TODO : Add a toast notification for success and error messages instead of displaying them directly on the page. */}
        {errorMessage && hasToken && (
          <p className="page__error" role="alert">
            {errorMessage}
          </p>
        )}
        {hasToken && (
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="reset-password-page__form gap-3"
          >
            <FormInput
              label="Nouveau mot de passe"
              type="password"
              placeholder="Entrez votre nouveau mot de passe"
              field={register("password")}
              showPasswordToggle
              error={errors.password?.message}
            />
            <FormInput
              label="Confirmer le nouveau mot de passe"
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              field={register("confirmPassword")}
              showPasswordToggle
              error={errors.confirmPassword?.message}
            />
            <div className="reset-password-page__return">
              <NavLink to="/connexion" className="reset-password-page__link">
                Retour à la connexion
              </NavLink>
            </div>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting
                ? "Réinitialisation..."
                : "Réinitialiser le mot de passe"}
            </Button>
          </Form>
        )}
      </AuthCard>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
