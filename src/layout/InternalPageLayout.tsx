import React, { ReactNode } from 'react';

interface InternalPageLayoutProps {
  children: ReactNode;
}

export function InternalPageLayout({ children }: InternalPageLayoutProps) {
  return (
    <div style={{
      maxWidth: "1480px",
      margin: "0 auto",
      padding: ".75rem"
    }}>
      {children}
    </div>
  )
}
