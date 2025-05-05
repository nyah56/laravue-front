import { DashboardIcon, BrandChromeIcon, BuildingWarehouseIcon, BoxIcon, UsersIcon } from 'vue-tabler-icons';

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
    title: 'Default',
    icon: DashboardIcon,
    to: '/dashboard/default'
  },
  { divider: true },
  { header: 'Products' },
  { divider: true },
  {
    title: 'Sample Page',
    icon: BrandChromeIcon,
    to: '/starter'
  },
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
  }
];

export default sidebarItem;
