import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function URLShortener() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Header />

      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-white">URL Shortener</h1>
          <p className="mb-8 text-xl text-gray-400">
            URL shortening functionality coming soon. For now, use PasteLab to share text and code
            with unique, shareable links.
          </p>
          <a
            href="/"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white transition-all hover:from-blue-600 hover:to-purple-700"
          >
            Go to PasteLab
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
