import { Sparkles } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-cyan-50 py-16 dark:from-black dark:via-zinc-950 dark:to-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white/95 to-sky-50 p-8 shadow-[0_24px_80px_-40px_rgba(2,132,199,0.5)] sm:p-12 dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:shadow-none">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>

            <h2 className="mb-6 text-center text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              Share Text, Code, and Documents Instantly
            </h2>

            <p className="text-center text-lg leading-relaxed text-slate-600 dark:text-gray-300">
              PasteLab is the fastest way to share text online. No signup, no hassle - just paste your
              content and get a link you can share anywhere. Perfect for developers, writers, students,
              and teams who need quick, temporary text sharing.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-blue-500 dark:text-blue-400">&infin;</div>
                <p className="text-sm text-slate-500 dark:text-gray-400">Unlimited Shares</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-violet-500 dark:text-purple-400">0</div>
                <p className="text-sm text-slate-500 dark:text-gray-400">Cost (100% Free)</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-rose-500 dark:text-pink-400">10s</div>
                <p className="text-sm text-slate-500 dark:text-gray-400">To Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
