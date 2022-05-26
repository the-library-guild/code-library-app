import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { LoginScreen } from '@/components/LoginScreen';

export default function LoginPage() {
  const { replace, query } = useRouter();

  useEffect(() => {
    if (query.error === undefined) return;

    replace('/login', undefined, { shallow: true });
  }, [query, replace]);

  return <LoginScreen error={query.error} />;
}
