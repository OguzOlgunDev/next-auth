export interface NavLink {
  label: string;
  href: string;
}

export const navLinksPrivite: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Profile", href: "/profile" },
  { label: "Dashboard", href: "/dashboard" },
];

export const navLinksPublic: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
