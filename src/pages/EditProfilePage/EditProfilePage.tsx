// Components
import { EditProfileInformationCard } from "../../components/EditProfileInformationCard";
import { PageHero } from "../../components/PageHero";
import { SectionTitle } from "../../components/SectionTitle";
// Context
import { useAuth } from "../../contexts/AuthContext";
// Styles
import "./EditProfilePage.css";
import { EditPasswordCard } from "../../components/EditPasswordCard";

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
        <EditProfileInformationCard user={user} />
        <SectionTitle title="Sécurité" level="h6" />
        <EditPasswordCard />
      </section>
    </main>
  );
}

export default EditProfilePage;
