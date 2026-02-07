import { CheckCircle2 } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Paste your content',
      description: 'Write or paste your text, code, or markdown into the editor'
    },
    {
      number: '2',
      title: 'Get a unique link',
      description: 'Click "Create Share" to generate your shareable URL instantly'
    },
    {
      number: '3',
      title: 'Share anywhere',
      description: 'Copy the link and share it via email, chat, or social media'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Share Text in Three Simple Steps
          </h2>
          <p className="mb-12 text-lg text-gray-400">
            No complicated setup. No account required. Just paste and share.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[60%] top-12 hidden h-0.5 w-[80%] bg-gradient-to-r from-blue-500/50 to-transparent md:block" />
                )}
                
                {/* Step Number */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-lg shadow-blue-500/30">
                  {step.number}
                </div>

                {/* Step Content */}
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
