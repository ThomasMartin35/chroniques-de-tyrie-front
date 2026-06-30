import { Route, Routes } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import ActualitesPage from '../pages/NewsPage'
import ChroniquesPage from '../pages/ChroniclesPage'
import PodcastsPage from '../pages/PodcastsPage'
import GuidesPage from '../pages/GuidesPage'
import AboutPage from '../pages/AboutPage'
import SearchPage from '../pages/SearchPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/chroniques" element={<ChroniquesPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/recherche" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes