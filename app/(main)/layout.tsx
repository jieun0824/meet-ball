import Header from './_component/header';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-screen min-h-dvh">
      <Header />
      <main className="flex flex-col items-center justify-center h-full max-w-7xl w-full px-4">
        {children}
      </main>
    </div>
  );
}
