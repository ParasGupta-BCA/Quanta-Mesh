import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Indie Developer",
    content: "Got my app published in just 36 hours! The team was super responsive and handled everything professionally. Highly recommend!",
    rating: 5,
    avatar: "AC"
  },
  {
    name: "Sarah Johnson",
    role: "Startup Founder",
    content: "As a first-time app developer, I was overwhelmed by the Play Store requirements. Quanta Mesh made it effortless. Worth every penny!",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Mike Rodriguez",
    role: "Freelance Developer",
    content: "I've published 3 apps through them now. Consistent quality, fast delivery, and great communication throughout the process.",
    rating: 5,
    avatar: "MR"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about their experience with Quanta Mesh.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 relative"
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-primary/20 absolute top-4 right-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(290,95%,55%)] flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
