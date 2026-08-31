import { useEffect, useRef, useState, type ChangeEvent } from "react";

import type { UserProfileResponse } from "../../types/user";

import "./AvatarUploader.css";
import { Button } from "../Button";
import { userService } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

//////////////////////
//    Constants     //
//////////////////////
// Maximum file size in bytes (5 MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// Accepted image types for the avatar uploader
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/////////////////////
//      Props      //
/////////////////////
interface AvatarUploaderProps {
  user: UserProfileResponse;
}

///////////////////
//   Component   //
///////////////////
function AvatarUploader({ user }: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasAvatar = Boolean(user.avatarUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isProcessing = isUploading || isDeleting;

  /**
   * Access the authentication context to refresh the user profile after updating.
   */
  const { refreshUser } = useAuth();

  /**
   * Validate the selected image and create its local preview.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrorMessage(
        "Type de fichier invalide. Veuillez sélectionner une image JPEG, PNG ou WebP.",
      );
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "Le fichier est trop volumineux. La taille maximale est de 5 Mo.",
      );
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  /**
   * Reset the selected file and clear the preview and error messages.
   */
  const handleFileReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * A function to handle the file upload process. It checks if a file is selected, attempts to upload it using the userService, and refreshes the user profile upon success.
   * If an error occurs during the upload, it sets an appropriate error message.
   */
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Aucun fichier sélectionné.");
      return;
    }
    try {
      setErrorMessage(null);
      setIsUploading(true);
      await userService.uploadAvatar(selectedFile);
      await refreshUser();
      handleFileReset();
      setSuccessMessage("Avatar mis à jour avec succès !");
    } catch {
      setErrorMessage(
        "Une erreur est survenue lors de l’importation de l’avatar. Veuillez réessayer.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle the deletion of the current user's avatar. It attempts to delete the avatar using the userService, refreshes the user profile upon success, and manages the relevant UI states and messages.
   */
  const handleAvatarDelete = async () => {
    try {
      setIsDeleting(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      await userService.deleteAvatar();
      await refreshUser();
      handleFileReset();
      setIsDeleteConfirmationVisible(false);
      setSuccessMessage("Avatar supprimé avec succès !");
    } catch {
      setErrorMessage(
        "Une erreur est survenue lors de la suppression de l’avatar.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Release the temporary preview URL when it changes or the component unmounts.
   */
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <div className="avatar-uploader">
      <div className="avatar-uploader__preview">
        {previewUrl || user.avatarUrl ? (
          <img
            src={previewUrl ?? user.avatarUrl ?? ""}
            alt={
              previewUrl
                ? "Aperçu du nouvel avatar"
                : `Avatar de ${user.username}`
            }
          />
        ) : (
          <span>{user.username.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="avatar-uploader__input"
        onChange={handleFileChange}
        disabled={isProcessing}
      />
      {!selectedFile && !isDeleteConfirmationVisible && (
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          isOutline
        >
          {hasAvatar ? "Changer d’avatar" : "Ajouter un avatar"}
        </Button>
      )}
      {selectedFile && (
        <div className="avatar-uploader__confirmation">
          {hasAvatar ? (
            <>
              <p>Vous êtes sur le point de modifier votre avatar.</p>
              <p className="avatar-uploader__warning">
                Votre avatar actuel sera remplacé.
              </p>
            </>
          ) : (
            <>
              <p>Vous êtes sur le point d’ajouter un avatar.</p>
              <p className="avatar-uploader__warning">
                Vérifiez l’aperçu avant de confirmer.
              </p>
            </>
          )}
          <div className="avatar-uploader__actions">
            <Button
              type="button"
              variant="secondary"
              onClick={handleFileReset}
              disabled={isUploading}
              isOutline
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleFileUpload}
              disabled={isUploading}
            >
              {isUploading ? "Importation…" : "Confirmer"}
            </Button>
          </div>
        </div>
      )}
      <p className="avatar-uploader__help">
        Formats acceptés : JPEG, PNG, WebP. Taille maximale : 5 Mo.
      </p>
      {/* TODO: Replace inline feedback with toast notifications. */}
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
      {user.avatarUrl && !selectedFile && !isDeleteConfirmationVisible && (
        <button
          type="button"
          className="avatar-uploader__delete"
          onClick={() => {
            setErrorMessage(null);
            setSuccessMessage(null);
            setIsDeleteConfirmationVisible(true);
          }}
          disabled={isProcessing}
        >
          Supprimer mon avatar
        </button>
      )}
      {isDeleteConfirmationVisible && (
        <div className="avatar-uploader__confirmation">
          <p>Voulez-vous vraiment supprimer votre avatar ?</p>
          <p className="avatar-uploader__warning">
            Cette action est irréversible.
          </p>

          <div className="avatar-uploader__actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDeleteConfirmationVisible(false)}
              disabled={isDeleting}
              isOutline
            >
              Conserver
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleAvatarDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression…" : "Supprimer"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarUploader;
