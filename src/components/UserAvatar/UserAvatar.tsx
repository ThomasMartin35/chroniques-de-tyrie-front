// React
import { useState } from "react";

/////////////////////
//      Props      //
/////////////////////
interface UserAvatarProps {
  username: string;
  avatarUrl: string | null;
  className?: string;
  alt?: string;
}

///////////////////
//   Component   //
///////////////////
function UserAvatar({ username, avatarUrl, className, alt }: UserAvatarProps) {
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);

  /**
   * Compute the URL of the avatar image to display, falling back to null if the image has failed to load.
   */
  const displayedAvatarUrl =
    avatarUrl && avatarUrl !== failedAvatarUrl ? avatarUrl : null;

  /**
   * Compute the initial character to display when the avatar image is not available.
   */
  const initial = username.trim().charAt(0).toUpperCase() || "?";

  /**
   * Compute the CSS classes for the avatar container based on the provided className prop.
   */
  const avatarClasses = ["user-avatar", className].filter(Boolean).join(" ");

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <div className={avatarClasses}>
      {displayedAvatarUrl ? (
        <img
          src={displayedAvatarUrl}
          alt={alt ?? `Avatar de ${username}`}
          onError={() => setFailedAvatarUrl(displayedAvatarUrl)}
        />
      ) : (
        <span role="img" aria-label={`Avatar par défaut de ${username}`}>
          {initial}
        </span>
      )}
    </div>
  );
}

export default UserAvatar;
