import { Link, NavLink } from 'react-router';
import { QrCode, SquarePen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from './ui/utils';
import lightModeLogo from '../../../img/light_mode.png';
import darkModeLogo from '../../../img/dark_mode.png';

const navItems = [
  {
    to: '/',
    label: 'Share Text',
    icon: SquarePen,
    end: true,
  },
  {
    to: '/qr-generator',
    label: 'QR Generator',
    icon: QrCode,
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo + Tool Nav */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center">
              <img
                src={lightModeLogo}
                alt="PasteLab"
                className="block h-8 w-auto dark:hidden sm:h-9"
              />
              <img
                src={darkModeLogo}
                alt="PasteLab"
                className="hidden h-8 w-auto dark:block sm:h-9"
              />
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white',
                      isActive && 'border-blue-500/40 bg-white/10 text-white',
                    )
                  }
                  aria-label={label}
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
