import {
  Rocket,
  FileSearch,
  Shield,
  Image,
  Headphones,
  Clock
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const benefits = [
  {
    icon: Rocket,
    title: "Fast Submission",
    description: "Your app submitted to Google Play within 24-48 hours of receiving all assets."
  },
  {
    icon: FileSearch,
    title: "Metadata Optimization",
    description: "We optimize your app title, description, and keywords for better discoverability."
  },
  {
    icon: Shield,
    title: "Play Policy Checks",
    description: "Pre-submission review to ensure compliance with Google Play policies."
  },
  {
    icon: Image,
    title: "Listing Assets Setup",
    description: "Professional setup of all your screenshots, icons, and promotional graphics."
  },
  {
    icon: Headphones,
    title: "Post-Publish Support",
    description: "48-hour support after publication for any issues or questions."
  },
  {
    icon: Clock,
    title: "Time Saved",
    description: "Skip the developer account setup and focus on building great apps."
  }
];

export function Benefits() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Quanta Mesh</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get your Android app published professionally and hassle-free.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <CardSpotlight
              key={index}
              className="group cursor-default"
            >
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{benefit.title}</h3>
                <p className="text-neutral-300 text-sm">{benefit.description}</p>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
