import { ListItemButtonProps, StackProps } from "@mui/material";

export type BarProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export type NavItem = {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
};

export type NavItemProps = NavItem & ListItemButtonProps;

export type NavListProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  children?: NavListProps[];
};

export type NavSectionType = {
  subheader: string;
  items: NavListProps[];
};
export interface NavSectionProps extends StackProps {
  data: NavSectionType[];
}
export const NAV = {
  W_BASE: 260,
  W_FULL: 280,
  W_FULL_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_FULL_ITEM_SUB: 36,
  //
  H_FULL_ITEM_HORIZONTAL: 32,
};
