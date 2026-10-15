export default function DesktopOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Mobile and tablet message */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center lg:hidden">
        <div className="mb-4 rounded-full bg-amber-100 p-4">
          <span className="text-4xl">💻</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          Device Not Supported
        </h1>

        <p className="mt-3 max-w-sm text-sm text-slate-500">
          This application is designed for desktop computers.
          Please open it on a desktop or laptop with a larger screen.
        </p>

        <p className="mt-6 text-xs text-slate-400">
          Recommended screen width: 1024px or wider
        </p>
      </div>

      {/* Desktop application */}
      <div className="hidden lg:block">
        {children}
      </div>
    </>
  );
}