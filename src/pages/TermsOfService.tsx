import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Shield, FileText, Scale, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | Quanta Mesh</title>
        <meta name="description" content="Terms of Service for Quanta Mesh Android app publishing services." />
        <link rel="canonical" href="https://www.quantamesh.store/terms-of-service" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] opacity-40"></div>
           <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-[80px] opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
             <Scale size={16} />
             <span>Legal Agreement</span>
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in delay-100">
             Terms of <span className="gradient-text">Service</span>
           </h1>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in delay-200">
             Please read these terms carefully before using our services.
           </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Agreement */}
            <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <FileText className="text-primary" size={20} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">1. Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using the services provided by Quanta Mesh ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                     These terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
             <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-400">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-1">
                  <Shield className="text-purple-500" size={20} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">2. Intellectual Property Rights</h2>
                   <div className="text-muted-foreground space-y-3 leading-relaxed">
                    <p>
                      <strong>Your Content:</strong> You retain all rights to the apps, code, and graphics you submit to us for publishing. We claim no ownership over your intellectual property.
                    </p>
                    <p>
                      <strong>Our Service:</strong> The Quanta Mesh brand, website, and service processes are protected by copyright and other intellectual property laws.
                    </p>
                    <p>
                       By providing your assets, you grant us a temporary license to use, reproduce, modify (for formatting purposes), and distribute these assets solely for the purpose of publishing your application to the Google Play Store as per your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Representations */}
            <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-500">
               <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                   <AlertCircle className="text-blue-500" size={20} />
                </div>
                 <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">3. User Representations</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By submitting an app for publishing, you represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                    <li>You are the owner of the application or have explicit permission from the owner to publish it.</li>
                    <li>The application does not violate any third-party intellectual property rights.</li>
                    <li>The application complies with all Google Play Developer Program Policies.</li>
                    <li>You are not using our service for any illegal or unauthorized purpose.</li>
                    <li>All information provided by you is accurate and complete.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
             <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-600">
                 <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">4. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground leading-relaxed">
                     Our services are provided "as is." We do not guarantee that your app will be accepted by Google Play. The final decision rests solely with Google's review team. While we ensure compliance with standard policies, we cannot control policy changes or specific enforcement actions by Google.
                  </p>
                </div>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-8">
               Last updated: {new Date().toLocaleDateString()}
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
