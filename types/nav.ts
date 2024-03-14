export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  onlyFooter?: boolean
  order?: number // user for footer column order
}
