// Components
import { EditProfileCard } from "../../components/EditProfileCard";
import { PageHero } from "../../components/PageHero";
import { SectionTitle } from "../../components/SectionTitle";
// Context
import { useAuth } from "../../contexts/AuthContext";
// Styles
import "./EditProfilePage.css";

///////////////////
//   Component   //
///////////////////
function EditProfilePage() {
  /**
   * Access authentication context to get the current user information.
   */
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  ///////////////////
  //    Render     //
  ///////////////////

  return (
    <main className="edit-profile-page">
      <PageHero title="Modifier mon profil" />

      <section className="container-page container-page--wide page-section">
        <SectionTitle title="Informations personnelles" level="h6" />
        <EditProfileCard user={user} />
      </section>
    </main>
  );
}

export default EditProfilePage;
