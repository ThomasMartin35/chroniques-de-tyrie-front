// React Router
import { Route, Routes } from "react-router-dom";
// Layouts
import MainLayout from "../layouts/MainLayout";
// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ActualitesPage from "../pages/NewsPage";
import ChroniquesPage from "../pages/ChroniclesPage";
import PodcastsPage from "../pages/PodcastsPage";
import GuidesPage from "../pages/GuidesPage";
import AboutPage from "../pages/AboutPage";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFoundPage";
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage";
// Protected Route
import { ProtectedRoute } from "../components/ProtectedRoute";
// Guest Route
import { GuestRoute } from "../components/GuestRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/connexion"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/inscription"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil/modifier"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/chroniques" element={<ChroniquesPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/recherche" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
