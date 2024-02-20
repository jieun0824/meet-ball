import { Montserrat } from 'next/font/google';

const cls = (...className: string[]) => {
  return className.join(' ');
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-montserrat',
});

export const TimeTableFont = cls(montserrat.className);
