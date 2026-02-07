export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
        <p className="mb-8 text-xl text-gray-400">Page not found</p>
        <a
          href="/"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white transition-all hover:from-blue-600 hover:to-purple-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
