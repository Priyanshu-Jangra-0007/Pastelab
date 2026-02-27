import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { ShareView } from './pages/ShareView';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { QRGenerator } from './pages/QRGenerator';
import { URLShortener } from './pages/URLShortener';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/privacy',
    Component: PrivacyPolicy,
  },
  {
    path: '/qr-generator',
    Component: QRGenerator,
  },
  {
    path: '/url-shortener',
    Component: URLShortener,
  },
  {
    path: '/:code',
    Component: ShareView,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);