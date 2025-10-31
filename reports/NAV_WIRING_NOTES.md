# Navigation Wiring Notes

- `components/layout/sticky-header.tsx`
  - Imported `primary` menu data from `@/config/navigation.mirrored` and derived the component's `navigationItems` from it.
  - Dropdown configuration now maps submenu entries directly from the shared config; no other structural changes.
- `components/layout/footer.tsx`
  - Imported `footer` menu data from `@/config/navigation.mirrored` and derived quick links, treatment links, and legal links from the shared config.
  - Bottom legal link list now iterates over the config-driven data; existing layout and animations remain untouched.
