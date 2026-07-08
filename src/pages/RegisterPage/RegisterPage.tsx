// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
// React Hook Form (Validation)
import { useForm } from "react-hook-form";
// React Router
import { NavLink, useNavigate } from "react-router-dom";
// Zod (Validation)
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { AuthCard } from "../../components/AuthCard";
import { Button } from "../../components/Button";
// Layouts
import { AuthLayout } from "../../layouts/AuthLayout";
// Styles
import "./RegisterPage.css";
import { FormInput } from "../../components/Form";
// Services
import { authService } from "../../services/authService";
// Utils
import { getRegisterErrorMessage } from "../../utils/authErrorMessage";
//Axios
import axios from "axios";

///////////////////
//   Validation  //
///////////////////
const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Le nom d'utilisateur est obligatoire")
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    email: z.email({
      message: "Adresse e-mail invalide",
    }),
    password: z
      .string()
      .min(1, "Le mot de passe est obligatoire")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule",
      )
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule",
      )
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir au moins un caractère spécial",
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est obligatoire"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

///////////////////
//   Component   //
///////////////////
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /** State to manage registration errors */
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );

  /**
   * Navigate to a different route
   */
  const navigate = useNavigate();

  /**
   * Handle form submission
   * @param data - The form data
   * @returns void
   */
  const onSubmit = async (data: RegisterFormValues) => {
    setRegistrationError(null);
    try {
      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      // TODO: Remplace this with a toast notification instead of redirecting to the login page
      navigate("/connexion", {
        state: {
          successMessage:
            "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRegistrationError(
          getRegisterErrorMessage(error.response?.data?.message),
        );
        return;
      }
      setRegistrationError("Une erreur inattendue est survenue.");
    }
  };

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <AuthLayout>
      <AuthCard
        title="Inscription"
        footer={
          <>
            <p>Vous avez déjà un compte ?</p>
            <NavLink to="/connexion">
              <h6 className="register-page__link">Se connecter →</h6>
            </NavLink>
          </>
        }
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="register-page__form gap-3"
        >
          <FormInput
            label="Nom d'utilisateur"
            type="text"
            placeholder="Entrez votre nom d'utilisateur"
            field={register("username")}
            error={errors.username?.message}
          />

          <FormInput
            label="Adresse e-mail"
            type="email"
            placeholder="Entrez votre adresse e-mail"
            field={register("email")}
            error={errors.email?.message}
          />

          <FormInput
            label="Mot de passe"
            type="password"
            placeholder="Entrez votre mot de passe"
            field={register("password")}
            showPasswordToggle
            helperText="Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
            error={errors.password?.message}
          />

          <FormInput
            label="Confirmer le mot de passe"
            type="password"
            placeholder="Confirmez votre mot de passe"
            field={register("confirmPassword")}
            showPasswordToggle
            error={errors.confirmPassword?.message}
          />

          {/* TODO : Add a toast if an error occurs*/}
          {registrationError && (
            <p className="page__error">{registrationError}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="register-page__submit"
          >
            S'inscrire
          </Button>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
}

export default RegisterPage;
