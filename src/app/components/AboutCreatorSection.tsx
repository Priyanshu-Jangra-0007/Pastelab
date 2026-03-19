import { Github, Linkedin } from 'lucide-react';

export function AboutCreatorSection() {
  return (
    <section className="bg-gradient-to-b from-zinc-950 via-black to-zinc-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-12">
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium tracking-wide text-cyan-300">
            About the Creator
          </div>

          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Hi, I&apos;m Priyanshu Jangra
          </h2>

          <p className="text-lg leading-relaxed text-gray-300">
            I&apos;m a passionate builder who enjoys creating useful digital experiences that are simple,
            practical, and easy to use. PasteLab reflects my interest in making everyday tools faster and
            more accessible for developers, students, and anyone who wants to share content online without
            friction.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-400">
            I&apos;m always learning, improving, and exploring new ideas through code. You can connect with
            me and explore more of my work through the links below.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://www.linkedin.com/in/priyanshu-a75140318/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-medium text-sky-200 transition-colors hover:bg-sky-400/20 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/Priyanshu-Jangra-0007"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Github className="h-4 w-4" />
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
