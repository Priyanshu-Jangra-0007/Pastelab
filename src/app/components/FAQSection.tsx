import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export function FAQSection() {
  const faqs = [
    {
      question: 'How do I share text online for free?',
      answer: 'Simply paste your text into the editor above, choose an expiration time, and click "Create Share". You\'ll get a unique link that you can share with anyone. No signup required!'
    },
    {
      question: 'Is my shared text private?',
      answer: 'Your shared text is only accessible to people who have the unique link. However, anyone with the link can view the content, so avoid sharing sensitive or confidential information. PasteLab is designed for temporary text sharing, not secure document storage.'
    },
    {
      question: 'How long does text stay available?',
      answer: 'You can choose the expiration time when creating a share: 10 minutes, 30 minutes, 1 hour, 6 hours, 12 hours, or 1 day. After the expiration time, the content is automatically deleted and cannot be recovered.'
    },
    {
      question: 'Do I need an account?',
      answer: 'No! PasteLab is completely free and requires no registration or login. Just paste and share immediately.'
    },
    {
      question: 'Can I delete a share?',
      answer: 'Shares automatically expire and are deleted based on the expiration time you selected. Currently, manual deletion before expiration is not supported, so choose your expiration time carefully.'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-white/10 bg-white/5 px-6"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-blue-400 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
