import { MenuType, RouteInfo } from './bootstrap-navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Angular2 Bootstrap4 Navbar', menuType: MenuType.BRAND },
  { path: '', title: 'Home', menuType: MenuType.LEFT },
  { path: 'about', title: 'About', menuType: MenuType.RIGHT },
  { path: 'contact', title: 'Contact Us', menuType: MenuType.RIGHT }
];
