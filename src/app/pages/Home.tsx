import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PasteEditor } from '../components/PasteEditor';
import { IntroSection } from '../components/IntroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { UseCasesSection } from '../components/UseCasesSection';
import { FAQSection } from '../components/FAQSection';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
              Share Text Instantly
            </h1>
            <p className="mb-12 text-xl text-gray-400 sm:text-2xl">
              A free online notepad to instantly share text and code. Paste below to generate a shareable link in seconds.
            </p>

            <PasteEditor />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <IntroSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Features */}
      <FeaturesSection />

      {/* Use Cases */}
      <UseCasesSection />

      {/* FAQ */}
      <FAQSection />

      <Footer />
    </div>
  );
}