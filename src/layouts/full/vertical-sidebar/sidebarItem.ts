import { DashboardIcon, BrandChromeIcon, ShieldCheckIcon, BoxIcon, UsersIcon } from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard'
  },
  { divider: true },
  { header: 'Bussiness' },

  {
    title: 'Products',
    icon: BoxIcon,
    to: '/products'
    // type: 'external'
  },
  {
    title: 'Supplier',
    icon: UsersIcon,
    to: '/suppliers'
    // type: 'external'
  },
  { divider: true },
  { header: 'Admin' },
  {
    title: 'Role',
    icon: ShieldCheckIcon,
    to: '/role'
    // type: 'external'
  }
];

export default sidebarItem;
