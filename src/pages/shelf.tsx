import React from 'react';

import { Perm } from 'code-library-perms';
import { useShelf } from '@/hooks/use-shelf.hook';
import { ShelfScreen } from '@/components/ShelfScreen';
function ShelfPage() {
  const { loading, error, books } = useShelf();

  return <ShelfScreen loading={loading} error={error} books={books} />;
}

ShelfPage.title = 'Shelf';
ShelfPage.permissions = Perm.VIEW_BOOKS;

export default ShelfPage;
