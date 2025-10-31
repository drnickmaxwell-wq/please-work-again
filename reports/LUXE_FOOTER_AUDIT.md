# Luxe Footer Audit

- New files present:
  - components/layout/footer/Footer.tsx ✅
  - components/layout/footer/FooterRibbon.tsx ✅
  - components/layout/footer/footer.css ✅
  - app/preview/footer-luxe/page.tsx ✅

- Toggle:
  - NEXT_PUBLIC_FOOTER=navy → uses new footer
  - otherwise → LegacyFooter

- A11y:
  - Focus ring on inputs ✅
  - Link contrast on navy ≥ 4.5:1 (spot-check) ✅
