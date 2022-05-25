import React from 'react';

import { Perm } from 'code-library-perms';
import { useShelf } from '@/hooks/use-shelf.hook';
import { ShelfView } from '@/components/ShelfView';
function ShelfLoader() {
  const { loading, error, books } = useShelf();

  return <ShelfView loading={loading} error={error} books={books} />;
}

ShelfLoader.permissions = Perm.VIEW_BOOKS;

export default ShelfLoader;
