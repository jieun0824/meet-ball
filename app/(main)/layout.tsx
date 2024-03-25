import Header from './_component/header';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-screen min-h-dvh flex flex-col items-center">
      <Header />
      <main className="flex flex-col items-center justify-center h-full w-full px-4 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
