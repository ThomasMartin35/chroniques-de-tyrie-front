// Components
import { Button } from "../../components/Button";
import { PageHero } from "../../components/PageHero";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { SectionTitle } from "../../components/SectionTitle";
// Context
import { useAuth } from "../../contexts/AuthContext";
// Router
import { useNavigate } from "react-router-dom";
// Styles
import "./ProfilePage.css";

///////////////////
//   Component   //
///////////////////

function ProfilePage() {
  /**
   * Access authentication context to get the current user information.
   */
  const { user } = useAuth();

  /**
   * To navigate on the profile edit page when the user clicks on the "Modifier mon profil" button.
   */
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="profile-page">
        <PageHero title="Mon profil" />
        <section className="container-page page-section">
          <p>Chargement du profil...</p>
        </section>
      </main>
    );
  }

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <main className="profile-page">
      <PageHero title="Mon profil" />

      <section className="container-page container-page--wide page-section">
        <div className="section-grid">
          <section className="section-grid__item--8">
            <SectionTitle title="Informations personnelles" level="h6" />
            <ProfileCard user={user} />
            <div className="profile-page__actions">
              <Button
                onClick={() => navigate("/profil/modifier")}
                variant="primary"
              >
                Modifier mon profil
              </Button>
            </div>
          </section>

          <section className="section-grid__item--4">
            <SectionTitle title="Statistiques" level="h6" />
            <p>Statistiques à venir...</p>
          </section>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
