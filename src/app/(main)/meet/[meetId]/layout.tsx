import { TimeTableFont } from '../../../../../public/font/timeTableFont';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={TimeTableFont}>{children}</div>;
}
