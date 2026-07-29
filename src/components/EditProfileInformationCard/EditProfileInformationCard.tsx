// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
import { useForm, useWatch } from "react-hook-form";
// Zod (Validation)
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { Button } from "../Button";
import { FormInput } from "../Form";
import FormTextarea from "../Form/FormTextArea";
// Types
import type { UserProfileResponse } from "../../types/user";
// Context
import { useAuth } from "../../contexts/AuthContext";
// Styles
import "./EditProfileInformationCard.css";
// Services
import { userService } from "../../services/userService";
// React Router
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// Utils
import { getRegisterErrorMessage } from "../../utils/authErrorMessage";

///////////////////
//   Validation  //
///////////////////
const editProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Le pseudo doit contenir au moins 3 caractères"),
  biography: z
    .string()
    .trim()
    .max(500, "La biographie ne peut pas dépasser 500 caractères"),
});

///////////////////
//     Types     //
///////////////////
type EditProfileFormValues = z.infer<typeof editProfileSchema>;

///////////////////
//     Props     //
///////////////////
interface EditProfileInformationCardProps {
  user: UserProfileResponse;
}

///////////////////
//   Component   //
///////////////////
function EditProfileInformationCard({ user }: EditProfileInformationCardProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user.username,
      biography: user.biography ?? "",
    },
  });

  /**
   * Navigate hook from react-router-dom to programmatically navigate after form submission.
   */
  const navigate = useNavigate();

  /**
   * Access the authentication context to refresh the user profile after updating.
   */
  const { refreshUser } = useAuth();

  /**
   * Watch the biography field to get its current value. This is useful for displaying the current value of the biography in the form, and for any other logic that may depend on the biography's value.
   */
  const biographyValue = useWatch({ control, name: "biography" }) ?? "";

  /**
   * State to manage profile update errors. This state will hold any error messages that occur during the profile update process, allowing them to be displayed to the user.
   */
  const [profileError, setProfileError] = useState<string | null>(null);

  /**
   * Function to handle form submission for editing the user profile.
   * @param data - The form data containing the updated username and biography.
   */
  const onSubmit = async (data: EditProfileFormValues) => {
    setProfileError(null);
    try {
      await userService.updateUserProfile(data);
      await refreshUser();
      // TODO : Add a toast/badge notification instead of redirecting to the profile page
      navigate("/profil");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setProfileError(getRegisterErrorMessage(error.response?.data?.message));
        return;
      }
      setProfileError("Une erreur inattendue est survenue.");
    }
  };

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <section className="edit-profile-card">
      <div className="edit-profile-card__header">
        <div className="profile-card__avatar">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={`Avatar de ${user.username}`} />
          ) : (
            <span>{user.username.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </div>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="edit-profile-card__form"
      >
        <FormInput
          label="Pseudo"
          type="text"
          placeholder="Entrez votre pseudo"
          field={register("username")}
          error={errors.username?.message}
        />

        <FormTextarea
          label="Biographie"
          rows={5}
          placeholder="Présentez-vous en quelques mots"
          field={register("biography")}
          error={errors.biography?.message}
        />
        <p className="edit-profile-card__counter">
          {biographyValue.length} / 500 caractères
        </p>

        {profileError && <p className="page__error">{profileError}</p>}
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

export default EditProfileInformationCard;
