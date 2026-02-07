import { Code2, FileText, MessageSquare, BookOpen, Smartphone, Shield } from 'lucide-react';

export function UseCasesSection() {
  const useCases = [
    {
      icon: Code2,
      title: 'Code Snippet Sharing',
      description: 'Share code examples, error logs, or scripts with your team'
    },
    {
      icon: FileText,
      title: 'Notes & Drafts',
      description: 'Quick drafts, meeting notes, or temporary text storage'
    },
    {
      icon: MessageSquare,
      title: 'Long-form Text Sharing',
      description: 'Share lengthy messages that exceed character limits'
    },
    {
      icon: BookOpen,
      title: 'Instructions & Guides',
      description: 'Share step-by-step guides or documentation'
    },
    {
      icon: Smartphone,
      title: 'Clipboard Sync Between Devices',
      description: 'Easily transfer text between your phone and computer'
    },
    {
      icon: Shield,
      title: 'Temporary Secure Text Sharing',
      description: 'Share sensitive info that auto-expires after a set time'
    }
  ];

  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Common Use Cases
          </h2>
          <p className="mb-12 text-lg text-gray-400">
            PasteLab is perfect for developers, writers, students, and anyone who needs to share text quickly
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-white/10 bg-black/20 p-6 transition-all hover:border-blue-500/30 hover:bg-black/40"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
