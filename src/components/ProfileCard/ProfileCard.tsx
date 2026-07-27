// Components
import { RoleBadge } from "../Badge/RoleBadge";
// Types
import type { UserProfileResponse } from "../../types/user";
// Styles
import "./ProfileCard.css";
// Lucide Icons
import { Clock, Mail, User } from "lucide-react";

///////////////////
//     Props     //
///////////////////
interface ProfileCardProps {
  user: UserProfileResponse;
}

///////////////////
//   Component   //
///////////////////
function ProfileCard({ user }: ProfileCardProps) {
  return (
    <section className="profile-card">
      <div className="profile-card__avatar">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={`Avatar de ${user.username}`} />
        ) : (
          <span>{user.username.charAt(0).toUpperCase()}</span>
        )}
      </div>

      <div className="profile-card__content">
        <div className="profile-card__header">
          <h4>{user.username}</h4>
          <RoleBadge role={user.role} />
        </div>

        <div className="profile-card__info">
          <Clock size={25} className="profile-card__icon" />
          <div>
            <p className="profile-card__icon-text">Inscrit(e) depuis</p>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="profile-card__info">
          <Mail size={25} className="profile-card__icon" />
          <div>
            <p className="profile-card__icon-text">Email</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-card__info">
          <User size={25} className="profile-card__icon" />
          <div>
            <p className="profile-card__icon-text">Biographie</p>
            {user.biography ? (
              <p>{user.biography}</p>
            ) : (
              <p>Aucune biographie</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
