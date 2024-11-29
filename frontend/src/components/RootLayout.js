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
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Probensammlung</div>
          <div className="flex space-x-4">
            {/* Updated Link structure without <a> tags */}
            <Link
              href="/"
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/',
              })}
            >
              Home
            </Link>
            <Link
              href="/overview"
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/overview',
              })}
            >
              Übersicht
            </Link>
            <Link
              href="/help"
              className={clsx('text-white font-semibold hover:text-blue-200', {
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
