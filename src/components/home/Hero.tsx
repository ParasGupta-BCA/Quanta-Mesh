import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(200,95%,55%)]/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Professional App Publishing</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">We Publish Your</span>
            <br />
            <span className="gradient-text glow-text">Android App</span>
            <br />
            <span className="text-foreground">to Google Play</span>
          </h1>

          {/* Price */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-5xl md:text-6xl font-bold gradient-text">$25</span>
            <span className="text-muted-foreground text-lg">one-time fee</span>
          </div>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Skip the $25 developer fee hassle. We handle everything from metadata optimization to Play Store policy compliance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/order" className="group">
                Publish My App
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/services">Learn More</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Zap, text: "24-48h Delivery" },
              { icon: Shield, text: "Policy Compliant" },
              { icon: Sparkles, text: "100% Success Rate" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <item.icon size={18} className="text-primary" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
