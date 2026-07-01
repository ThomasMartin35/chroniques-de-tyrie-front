export interface NavLinkItem {
  path: string;
  label: string;
  end?: boolean;
}

export const mainNavLinks: NavLinkItem[] = [
  { path: "/", label: "Accueil", end: true },
  { path: "/actualites", label: "Actualités" },
  { path: "/chroniques", label: "Chroniques" },
  { path: "/podcasts", label: "Podcasts" },
  { path: "/guides", label: "Guides" },
  { path: "/a-propos", label: "À propos" },
];