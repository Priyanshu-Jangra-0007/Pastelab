import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Header />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-white">Privacy Policy</h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">Overview</h2>
              <p>
                PasteLab is a simple text-sharing service that requires no account or personal information.
                We are committed to protecting your privacy and being transparent about our data practices.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">Data We Collect</h2>
              <p className="mb-2">When you create a share, we store:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>The text content you paste</li>
                <li>Creation timestamp</li>
                <li>Expiration timestamp</li>
                <li>View count</li>
                <li>A unique share code</li>
              </ul>
              <p className="mt-3">
                We do NOT collect any personal information such as your name, email, IP address, or device information.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">How We Use Your Data</h2>
              <p>
                The content you share is stored temporarily to enable the sharing functionality. Your content is:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Accessible only via the unique share link</li>
                <li>Automatically deleted after the expiration time you selected</li>
                <li>Not indexed, analyzed, or used for any other purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">Data Security</h2>
              <p>
                While we take reasonable measures to secure your data, please note that PasteLab is designed for
                temporary, non-sensitive content sharing. Do not share:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Passwords or authentication credentials</li>
                <li>Private keys or tokens</li>
                <li>Personal identifying information</li>
                <li>Confidential business documents</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">Cookies</h2>
              <p>
                PasteLab does not use cookies or tracking technologies. We respect your privacy and your browsing
                experience is not tracked.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page
                with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-white">Contact</h2>
              <p>
                If you have questions about this privacy policy or our data practices, please create an issue
                on our GitHub repository or contact us through the appropriate channels.
              </p>
            </section>

            <div className="mt-8 text-sm text-gray-500">
              Last updated: February 7, 2026
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
