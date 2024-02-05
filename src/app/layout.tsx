import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meet Ball',
  description: 'Helps you find when we can meet together',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-dvw h-[100vh] bg-bgColor p-2 overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
