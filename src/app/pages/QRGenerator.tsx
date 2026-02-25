import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Download, Link2, Palette, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../components/ui/utils';

const DEFAULT_FOREGROUND = '#000000';
const DEFAULT_BACKGROUND = '#ffffff';

const colorPresets = [
  { foreground: '#000000', background: '#ffffff' },
  { foreground: '#0f172a', background: '#e2e8f0' },
  { foreground: '#155e75', background: '#ecfeff' },
  { foreground: '#14532d', background: '#dcfce7' },
  { foreground: '#6d28d9', background: '#f5f3ff' },
  { foreground: '#991b1b', background: '#fef2f2' },
  { foreground: '#4c1d95', background: '#ede9fe' },
  { foreground: '#9a3412', background: '#fff7ed' },
];

function isValidHexColor(value: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

function normalizeUrl(rawValue: string) {
  const trimmed = rawValue.trim();
  if (!trimmed) return null;

  const value = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(value);
    if (!url.hostname) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function QRGenerator() {
  const [searchParams] = useSearchParams();
  const urlFromQuery = searchParams.get('url');
  const [urlInput, setUrlInput] = useState(urlFromQuery ?? '');
  const [foregroundColor, setForegroundColor] = useState(DEFAULT_FOREGROUND);
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_BACKGROUND);

  useEffect(() => {
    if (urlFromQuery) {
      setUrlInput(urlFromQuery);
    }
  }, [urlFromQuery]);

  const normalizedUrl = useMemo(() => normalizeUrl(urlInput), [urlInput]);
  const resolvedForeground = isValidHexColor(foregroundColor) ? foregroundColor : DEFAULT_FOREGROUND;
  const resolvedBackground = isValidHexColor(backgroundColor) ? backgroundColor : DEFAULT_BACKGROUND;
  const canGenerate = Boolean(normalizedUrl);

  const handleCopyUrl = async () => {
    if (!normalizedUrl) {
      toast.error('Enter a valid URL first');
      return;
    }

    try {
      await navigator.clipboard.writeText(normalizedUrl);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleDownload = () => {
    if (!normalizedUrl) {
      toast.error('Enter a valid URL first');
      return;
    }

    const svgElement = document.getElementById('qr-generator-svg') as SVGSVGElement | null;
    if (!svgElement) {
      toast.error('QR code is not ready yet');
      return;
    }

    const serializedSvg = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([serializedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const size = 720;
      const padding = 68;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(blobUrl);
        toast.error('Failed to prepare image download');
        return;
      }

      context.fillStyle = resolvedBackground;
      context.fillRect(0, 0, size, size);
      context.drawImage(image, padding, padding, size - padding * 2, size - padding * 2);
      URL.revokeObjectURL(blobUrl);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'pastelab-qr.png';
      link.click();
      toast.success('QR code downloaded');
    };

    image.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      toast.error('Failed to generate downloadable image');
    };

    image.src = blobUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Header />

      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">QR Code Generator</h1>
            <p className="text-lg text-gray-400">
              Create beautiful QR codes instantly from any URL, then copy or download them for sharing.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                  <Link2 className="h-5 w-5" />
                  Enter URL
                </h2>
                <Input
                  value={urlInput}
                  onChange={(event) => setUrlInput(event.target.value)}
                  placeholder="example.com"
                  className="h-11 border-white/10 bg-black/40 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/20"
                />
                <p className="mt-2 text-sm text-gray-400">Missing protocol is auto-fixed to `https://`.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    onClick={handleCopyUrl}
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                    disabled={!canGenerate}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                    disabled={!canGenerate}
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </Button>
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                  <Palette className="h-5 w-5" />
                  Customize Colors
                </h2>

                <p className="mb-3 text-sm text-gray-400">Quick Presets</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {colorPresets.map((preset) => {
                    const isActive =
                      preset.foreground.toLowerCase() === resolvedForeground.toLowerCase() &&
                      preset.background.toLowerCase() === resolvedBackground.toLowerCase();

                    return (
                      <button
                        key={`${preset.foreground}-${preset.background}`}
                        type="button"
                        onClick={() => {
                          setForegroundColor(preset.foreground);
                          setBackgroundColor(preset.background);
                        }}
                        className={cn(
                          'h-8 w-8 rounded-full border border-white/20 transition-transform hover:scale-105',
                          isActive && 'ring-2 ring-blue-400 ring-offset-2 ring-offset-zinc-950',
                        )}
                        style={{
                          background: `linear-gradient(135deg, ${preset.foreground} 50%, ${preset.background} 50%)`,
                        }}
                        aria-label={`Foreground ${preset.foreground}, background ${preset.background}`}
                        title={`${preset.foreground} / ${preset.background}`}
                      />
                    );
                  })}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">Foreground</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={resolvedForeground}
                        onChange={(event) => setForegroundColor(event.target.value)}
                        className="h-10 w-12 cursor-pointer border-white/10 bg-black/40 p-1"
                      />
                      <Input
                        type="text"
                        value={foregroundColor}
                        onChange={(event) => setForegroundColor(event.target.value)}
                        placeholder="#000000"
                        className="h-10 border-white/10 bg-black/40 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">Background</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={resolvedBackground}
                        onChange={(event) => setBackgroundColor(event.target.value)}
                        className="h-10 w-12 cursor-pointer border-white/10 bg-black/40 p-1"
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(event) => setBackgroundColor(event.target.value)}
                        placeholder="#ffffff"
                        className="h-10 border-white/10 bg-black/40 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-center text-gray-400">
                Need a share link first?{' '}
                <Link to="/" className="text-blue-400 hover:underline">
                  Create one on PasteLab
                </Link>
                .
              </section>
            </div>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Preview</h2>
              <div className="mt-4 flex min-h-[430px] items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-6">
                {normalizedUrl ? (
                  <div className="rounded-2xl p-4 shadow-xl" style={{ backgroundColor: resolvedBackground }}>
                    <QRCodeSVG
                      id="qr-generator-svg"
                      value={normalizedUrl}
                      size={280}
                      level="H"
                      includeMargin
                      fgColor={resolvedForeground}
                      bgColor={resolvedBackground}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="mx-auto h-16 w-16 text-gray-500" />
                    <p className="mt-4 text-gray-400">Enter a URL to generate QR code</p>
                  </div>
                )}
              </div>
              {normalizedUrl ? (
                <p className="mt-4 break-all text-sm text-gray-400">{normalizedUrl}</p>
              ) : null}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
