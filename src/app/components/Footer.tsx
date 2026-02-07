import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">PasteLab</h3>
            <p className="text-sm text-gray-400">
              Paste. Share. Done.<br />
              The simplest way to share text and code online.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 transition-colors hover:text-white">
                  PasteLab
                </Link>
              </li>
              <li>
                <Link to="/qr-generator" className="text-gray-400 transition-colors hover:text-white">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link to="/url-shortener" className="text-gray-400 transition-colors hover:text-white">
                  URL Shortener
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 PasteLab. Share responsibly. All content is temporary and will expire automatically.</p>
        </div>
      </div>
    </footer>
  );
}
