import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does the publishing process take?",
    answer: "Once we receive all your assets (APK/AAB, screenshots, icons, and app details), we typically submit your app within 24-48 hours. Google's review process usually takes an additional 1-7 days."
  },
  {
    question: "What do I need to provide?",
    answer: "You'll need to provide: your app file (APK or AAB), app icon (512x512 PNG), feature graphic (1024x500), at least 2 screenshots per device type, app title, short and full descriptions, privacy policy URL, and your contact information."
  },
  {
    question: "Is my app guaranteed to be approved?",
    answer: "While we ensure your submission meets all Google Play requirements and policies, final approval is at Google's discretion. We perform thorough policy checks before submission and offer free re-submission if rejected for fixable issues."
  },
  {
    question: "Why don't I just create my own developer account?",
    answer: "Creating a Google Play Developer account requires a $25 one-time fee plus identity verification. Our service lets you publish at the same price point while we handle all the technical setup, policy compliance, and optimization for you."
  },
  {
    question: "Will I have access to the Play Console?",
    answer: "Your app will be published under our developer account. We provide you with analytics and performance data. For full console access, consider our premium tier which includes transfer to your own account after 6 months."
  },
  {
    question: "What if Google rejects my app?",
    answer: "We review every app for policy compliance before submission. If Google rejects your app for issues we can fix (metadata, screenshots, etc.), we'll resubmit for free. If the rejection is due to app content or functionality issues, we'll provide guidance on what needs to change."
  }
];

export function FAQ() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our app publishing service.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
