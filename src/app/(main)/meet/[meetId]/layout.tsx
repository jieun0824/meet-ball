import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-montserrat',
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={montserrat.className}>{children}</div>;
}
