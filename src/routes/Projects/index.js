import React from 'react';
import { Outlet } from 'react-router';
import { AuthProvider } from './AuthContext';

export default function Projects() {
  return (
    <section className="p-3">
      <AuthProvider>
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </section>
  );
}
/// splitwise/redirect?code=eXuvGafqTmh1TXTPrAdy&state=6ca0d570-50fb-42be-95eb-a7b02d6cf79d
