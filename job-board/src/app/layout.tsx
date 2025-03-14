import Header from '@/components/layout/header';
import { SessionProvider } from '@/contexts/session-context';
import type { Metadata } from 'next';
import { Fira_Code, Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JobsGO Job Board',
  description:
    'A place where you can find the best Jobs and employ the best talents',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${firaCode.variable} ${montserrat.variable} relative font-montserrat`}
      >
        <SessionProvider>
          <Toaster position='bottom-right' duration={10000} />
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
