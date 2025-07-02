import { Suspense } from 'react';

import SpinnerFallback from '@/components/SpinnerFallback/SpinnerFallback';
import CatalogClient from '@/components/CatalogClient/CatalogClient';

const Catalog = (): JSX.Element => {
  return (
    <Suspense fallback={<SpinnerFallback />}>
      <CatalogClient />
    </Suspense>
  );
};

export default Catalog;
