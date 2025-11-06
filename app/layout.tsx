import { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import AuthProvider from './providers/AuthProvider';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Property Pulse',
    template: '%s | Property Pulse',
  },
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = (await cookies()).get('session')?.value;

  const initialAuth = session
    ? {
        isLoggedIn: true,
        user: { id: 'user_id', name: 'User Name', email: 'user@example.com' },
      }
    : { isLoggedIn: false, user: null };

  return (
    <html>
      <body>
        <AuthProvider initialAuth={initialAuth}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
