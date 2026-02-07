import { Code, Smartphone, Zap, Lock, Download, Clock } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Code,
      title: 'Markdown Formatting',
      description: 'Full support for markdown syntax with live preview'
    },
    {
      icon: Zap,
      title: 'Syntax Highlighting',
      description: 'Support for 20+ programming languages with beautiful themes'
    },
    {
      icon: Lock,
      title: 'No Account Required',
      description: 'Start sharing immediately without signup or login'
    },
    {
      icon: Smartphone,
      title: 'Works on All Devices',
      description: 'Fully responsive design for desktop, tablet, and mobile'
    },
    {
      icon: Download,
      title: 'Download Options',
      description: 'Export your content as .txt, .md, or .json files'
    },
    {
      icon: Clock,
      title: 'Flexible Expiration',
      description: 'Choose from 10 minutes to 1 day expiration times'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Why Use PasteLab?
          </h2>
          <p className="mb-12 text-lg text-gray-400">
            A powerful yet simple tool for sharing text and code with anyone, anywhere
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-blue-500/50 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-400 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
