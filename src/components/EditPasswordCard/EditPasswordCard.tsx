// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
// Zod (Validation)
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { Button } from "../Button";
import { FormInput } from "../Form";
// Services
import { userService } from "../../services/userService";
// React Router
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// Utils
import { getPasswordErrorMessage } from "../../utils/authErrorMessage";

///////////////////
//   Validation  //
///////////////////
const editPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Le mot de passe actuel est obligatoire"),

    newPassword: z
      .string()
      .min(1, "Le nouveau mot de passe est obligatoire")
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
      ),

    confirmNewPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est obligatoire"),
  })
  .refine(
    (data) => data.newPassword !== data.currentPassword,
    {
      message:
        "Le nouveau mot de passe doit être différent du mot de passe actuel",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmNewPassword"],
    },
  );

///////////////////
//     Types     //
///////////////////
type EditPasswordFormValues = z.infer<typeof editPasswordSchema>;

///////////////////
//   Component   //
///////////////////
function EditPasswordCard() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<EditPasswordFormValues>({
        resolver: zodResolver(editPasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    /**
     * Navigate hook from react-router-dom to programmatically navigate after form submission.
     */
    const navigate = useNavigate();

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: EditPasswordFormValues) => {
        setPasswordError(null);
        setSuccessMessage(null);

        try {
            await userService.updateUserPassword(data);
            reset();
            setSuccessMessage("Votre mot de passe a bien été modifié.");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setPasswordError(
                    getPasswordErrorMessage(error.response?.data?.message),
                );
                return;
            }

            setPasswordError("Une erreur inattendue est survenue.");
        }
    };
    ///////////////////
    //    Render     //
    ///////////////////
    return (
        <section className="edit-profile-card">
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="edit-profile-card__form"
            >
                <FormInput
                    label="Mot de passe actuel"
                    type="password"
                    placeholder="Entrez votre mot de passe actuel"
                    showPasswordToggle
                    field={register("currentPassword")}
                    error={errors.currentPassword?.message}
                />
                <FormInput
                    label="Nouveau mot de passe"
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                    showPasswordToggle
                    field={register("newPassword")}
                    error={errors.newPassword?.message}
                />
                <FormInput
                    label="Confirmer le nouveau mot de passe"
                    type="password"
                    placeholder="Confirmez votre nouveau mot de passe"
                    showPasswordToggle
                    field={register("confirmNewPassword")}
                    error={errors.confirmNewPassword?.message}
                />

                {passwordError && (
                    <p className="page__error" role="alert">
                        {passwordError}
                    </p>
                )}

                {successMessage && (
                    <p className="page__success" role="status">
                        {successMessage}
                    </p>
                )}
                <div className="edit-profile-card__actions">
                    <Button
                        type="button"
                        variant="secondary"
                        isOutline
                        onClick={() => navigate("/profil")}
                    >
                        Annuler
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        Enregistrer
                    </Button>
                </div>
            </Form>
        </section>
    );
}

export default EditPasswordCard;