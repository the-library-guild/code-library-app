import React, { ReactNode } from 'react';

import { StudentsView } from './StudentsView';
import { LibrariansView } from './LibrariansView';

import { AppUser, LIBRARIAN_ROLE } from '../hooks/use-user-info.hook';
interface InternalPageProps {
  children: ReactNode;
  user: AppUser;
}

export function InternalPage({ user, children }: InternalPageProps) {
  switch (user.role) {
    case LIBRARIAN_ROLE:
      return <LibrariansView>{children}</LibrariansView>;
    default:
      return <StudentsView>{children}</StudentsView>;
  }
}
