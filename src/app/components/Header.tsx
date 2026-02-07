import { Link } from 'react-router';
import { FileText, QrCode, Link2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PasteLab
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/qr-generator" 
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Generator</span>
            </Link>
            <Link 
              to="/url-shortener" 
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">URL Shortener</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
