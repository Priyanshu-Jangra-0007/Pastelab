import { Sparkles } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 sm:p-12">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            
            <h2 className="mb-6 text-center text-3xl font-bold text-white sm:text-4xl">
              Share Text, Code, and Documents Instantly
            </h2>
            
            <p className="text-center text-lg leading-relaxed text-gray-300">
              PasteLab is the fastest way to share text online. No signup, no hassle—just paste your 
              content and get a link you can share anywhere. Perfect for developers, writers, students, 
              and teams who need quick, temporary text sharing.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-blue-400">∞</div>
                <p className="text-sm text-gray-400">Unlimited Shares</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-purple-400">0</div>
                <p className="text-sm text-gray-400">Cost (100% Free)</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-pink-400">10s</div>
                <p className="text-sm text-gray-400">To Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
