import type { ReactNode } from 'react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export default function TreatmentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="legacy-surface">
      <Breadcrumbs />
      {children}
    </div>
  );
}
