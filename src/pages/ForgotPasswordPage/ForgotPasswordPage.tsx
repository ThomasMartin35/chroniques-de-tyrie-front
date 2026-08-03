// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
// React Hook Form (Validation)
import { useForm } from "react-hook-form";
// React Router
import { NavLink } from "react-router-dom";
// Zod (Validation)
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { AuthCard } from "../../components/AuthCard";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Form";
// Layouts
import { AuthLayout } from "../../layouts/AuthLayout";
// Styles
import "./ForgotPasswordPage.css";
// Services
import { authService } from "../../services/authService";

///////////////////
//   Validation  //
///////////////////
const forgotPasswordSchema = z.object({
  email: z.email({
    message: "Adresse e-mail invalide",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

///////////////////
//   Component   //
///////////////////

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * State to manage success and error messages
   */
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Handle form submission for the forgot password functionality.
   * @param data - The form data containing the email address.
   */
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await authService.forgotPassword(data);

      setSuccessMessage(
        "Si un compte correspond à cette adresse, " +
          "un lien de réinitialisation a été envoyé.",
      );
    } catch {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  ///////////////////
  //    Render     //
  ///////////////////

  return (
    <AuthLayout>
      <AuthCard
        title="Mot de passe oublié"
        footer={
          <>
            <p>Pas encore de compte ?</p>
            <NavLink to="/inscription">
              <h6 className="forgot-password-page__link">Créer un compte →</h6>
            </NavLink>
          </>
        }
      >
        <p>
          Saisissez votre adresse e-mail pour recevoir un lien de
          réinitialisation.
        </p>
        {/* TODO : Add a toast notification for success and error messages instead of displaying them directly on the page. */}
        {successMessage && (
          <p className="page__success" role="status">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="page__error" role="alert">
            {errorMessage}
          </p>
        )}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="forgot-password-page__form gap-3"
        >
          <FormInput
            label="Adresse e-mail"
            type="email"
            placeholder="Entrez votre adresse e-mail"
            field={register("email")}
            error={errors.email?.message}
          />
          <div className="forgot-password-page__return">
            <NavLink to="/connexion" className="forgot-password-page__link">
              Retour à la connexion
            </NavLink>
          </div>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
          </Button>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
