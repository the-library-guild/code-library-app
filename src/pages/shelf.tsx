import React from 'react';

import { Perm } from 'code-library-perms';
import { useShelf } from '../hooks/use-shelf.hook';
import { ShelfView } from '../screens/shelf';
function ShelfPage() {
  const { loading, error, books } = useShelf();

  return <ShelfView loading={loading} error={error} books={books} />;
}

ShelfPage.permissions = Perm.VIEW_BOOKS;

export default ShelfPage;
