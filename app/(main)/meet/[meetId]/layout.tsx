export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="pb-8 w-full">{children}</div>;
}
