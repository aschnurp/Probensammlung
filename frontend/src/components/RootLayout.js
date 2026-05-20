import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const location = usePathname();

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white shadow-lg">
      <nav className="container mx-auto grid grid-cols-3 items-center text-white">
  
  {/* links */}
  <div className="text-xl font-bold">
    v1.1.6
  </div>

  {/* mitte (zentriert) */}
  <div className="text-3xl font-bold text-center">
    Probensammlung
  </div>

  {/* rechts */}
  <div className="flex space-x-4 justify-end">
    <Link
      href="/"
      className={clsx('text-xl font-semibold hover:text-blue-200', {
        underline: location === '/',
      })}
    >
      Home
    </Link>

    <Link
      href="/overview"
      className={clsx('text-xl font-semibold hover:text-blue-200', {
        underline: location === '/overview',
      })}
    >
      Übersicht
    </Link>

    <Link
      href="/help"
      className={clsx('text-xl font-semibold hover:text-blue-200', {
        underline: location === '/help',
      })}
    >
      Hilfe
    </Link>
  </div>

</nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {children}
      </main>
    </>
  );
}
