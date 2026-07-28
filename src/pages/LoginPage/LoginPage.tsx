// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
// React Hook Form (Validation)
import { useForm } from "react-hook-form";
// React Router
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// Zod (Validation)
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { AuthCard } from "../../components/AuthCard";
import { Button } from "../../components/Button";
// Layouts
import { AuthLayout } from "../../layouts/AuthLayout";
// Styles
import "./LoginPage.css";
import { FormInput } from "../../components/Form";
// Services
import { authService } from "../../services/authService";
// Context
import { useAuth } from "../../contexts/AuthContext";

///////////////////
//   Validation  //
///////////////////
const loginSchema = z.object({
  email: z.email({
    message: "Adresse e-mail invalide",
  }),
  password: z.string().min(1, "Le mot de passe est obligatoire"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

///////////////////
//   Component   //
///////////////////
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  /**
   * Access authentication context
   */
  const { login } = useAuth();

  /** State to manage login errors */
  const [loginError, setLoginError] = useState<string | null>(null);

  /**
   * Navigate to a different route
   */
  const navigate = useNavigate();

  /*
   * Access the current location
   * This is useful for displaying messages after redirection
   * For example, after a successful registration, we can redirect to the login page and display a success message.
   */
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  /**
   * Handle form submission
   * @param data - The form data
   * @returns void
   */
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      await login(response.token);
      navigate("/profil");
    } catch {
      setLoginError("Le couple email/mot de passe est incorrect.");
    }
  };

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <AuthLayout>
      <AuthCard
        title="Connexion"
        footer={
          <>
            <p>Pas encore de compte ?</p>
            <NavLink to="/inscription">
              <h6 className="login-page__link">Créer un compte →</h6>
            </NavLink>
          </>
        }
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="login-page__form gap-3"
        >
          {/* TODO: Remplace this with a toast notification instead of redirecting to the login page */}
          {successMessage && (
            <p className="login-page__success">{successMessage}</p>
          )}
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
            error={errors.password?.message}
          />

          <div className="login-page__forgot-password">
            <NavLink to="/mot-de-passe-oublie" className="login-page__link">
              Mot de passe oublié ?
            </NavLink>
          </div>

          {/* TODO: Handle "Remember me" using sessionStorage/localStorage. */}
          <Form.Check
            type="checkbox"
            label="Se souvenir de moi"
            {...register("rememberMe")}
          />

          {/* TODO : Add a toast if an error occurs*/}
          {loginError && <p className="page__error">{loginError}</p>}

          <Button
            type="submit"
            variant="primary"
          >
            Se connecter
          </Button>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;
