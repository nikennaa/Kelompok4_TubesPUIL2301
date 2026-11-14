// Menu utama website. Dipakai bersama oleh Navbar (menu) dan Footer (Quick Links),
// jadi menambah/mengubah menu cukup di satu tempat ini.
// `match` = nama route yang membuat menu berstatus aktif di Navbar.
export const navLinks = [
  { label: 'Home', to: { name: 'home' }, match: ['home'] },
  { label: 'About Team', to: { name: 'about' }, match: ['about'] },
  { label: 'Projects Showcase', to: { name: 'projects' }, match: ['projects', 'project-detail'] },
  { label: 'Contact', to: { name: 'contact' }, match: ['contact'] },
]
