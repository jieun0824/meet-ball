export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <div className="pb-8 px-20">{children}</div>
    </div>
  );
}
