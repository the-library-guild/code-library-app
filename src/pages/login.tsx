import React from 'react';

import { SignIn } from "../components/SignIn";

import { SignInPageLayout } from "../layout/SignInPageLayout";

export default function Page() {
  return (
    <SignInPageLayout>
      <SignIn />
    </SignInPageLayout>
  );
}
