import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Copy, Download, Eye, Clock, Loader2, AlertCircle, QrCode as QrCodeIcon } from 'lucide-react';
import { getPaste, downloadAsFile, getTimeRemaining, formatDate, PasteData } from '../utils/pasteUtils';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'motion/react';

export function ShareView() {
  const { code } = useParams<{ code: string }>();
  const [paste, setPaste] = useState<PasteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/share/${code}`;

  useEffect(() => {
    const fetchPaste = async () => {
      if (!code) {
        setError('Invalid share code');
        setLoading(false);
        return;
      }

      try {
        const data = await getPaste(code);
        if (!data) {
          setError('This share has expired or does not exist');
        } else {
          setPaste(data);
        }
      } catch (err) {
        console.error('Error fetching paste:', err);
        setError('Failed to load content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyContent = async () => {
    if (!paste) return;
    try {
      await navigator.clipboard.writeText(paste.content);
      toast.success('Content copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  const handleDownload = (format: 'txt' | 'md' | 'json') => {
    if (!paste) return;

    let content = paste.content;
    let filename = `paste-${code}.${format}`;
    let type = 'text/plain';

    if (format === 'json') {
      content = JSON.stringify({ content: paste.content, createdAt: paste.createdAt }, null, 2);
      type = 'application/json';
    } else if (format === 'md') {
      type = 'text/markdown';
    }

    downloadAsFile(content, filename, type);
    toast.success(`Downloaded as ${format.toUpperCase()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-gray-400">Loading share...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !paste) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-white">Share Not Found</h1>
            <p className="mb-8 text-gray-400">{error}</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                Create New Share
              </Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeRemainingText = getTimeRemaining(paste.expiresAt);
  const expiresDate = new Date(paste.expiresAt);
  const now = new Date();
  const timeRemainingMs = expiresDate.getTime() - now.getTime();
  const hoursRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Header />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Header Info */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">Shared Content</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {paste.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Expires in {hoursRemaining}h {minutesRemaining}m
                </span>
              </div>
            </div>
          </div>

          {/* Share Link Card */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <label className="mb-2 block text-sm font-medium text-gray-400">Share Link</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  onClick={() => setShowQR(!showQR)}
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <QrCodeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* QR Code */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 flex justify-center"
              >
                <div className="rounded-xl bg-white p-4">
                  <QRCodeSVG value={shareUrl} size={200} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Download Options */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              onClick={handleCopyContent}
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Content
            </Button>
            <Button
              onClick={() => handleDownload('txt')}
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              .txt
            </Button>
            <Button
              onClick={() => handleDownload('md')}
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              .md
            </Button>
            <Button
              onClick={() => handleDownload('json')}
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              .json
            </Button>
          </div>

          {/* Content Display */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            {paste.syntaxHighlighting ? (
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  fontSize: '14px'
                }}
                wrapLongLines
              >
                {paste.content}
              </SyntaxHighlighter>
            ) : (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {paste.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Create New Button */}
          <div className="mt-8 text-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                Create New Share
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}