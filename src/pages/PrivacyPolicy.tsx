import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Lock, Eye, Database, Globe } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <Layout>
            <Helmet>
                <title>Privacy Policy | Quanta Mesh</title>
                <meta name="description" content="Privacy Policy for Quanta Mesh - How we handle your data." />
                <link rel="canonical" href="https://www.quantamesh.store/privacy-policy" />
            </Helmet>

            {/* Hero Section */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[80px] opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium mb-6 animate-fade-in">
                        <Lock size={16} />
                        <span>Data Protection</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in delay-100">
                        Privacy <span className="gradient-text">Policy</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in delay-200">
                        We value your trust and are committed to protecting your personal information.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Information Collection */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-300">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <Database className="text-primary" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">1. Information We Collect</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We collect information necessary to provide our app publishing services, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                                        <li><strong>Personal Information:</strong> Name, email address, and contact details provided during the order process.</li>
                                        <li><strong>App Data:</strong> APK/AAB files, graphics, descriptions, and other metadata required for the Google Play Store listing.</li>
                                        <li><strong>Payment Information:</strong> Processed securely by our payment providers (Stripe/PayPal). We do not store your credit card details on our servers.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Use of Information */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-400">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                                    <Eye className="text-blue-500" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">2. How We Use Your Information</h2>
                                    <div className="text-muted-foreground space-y-3 leading-relaxed">
                                        <p>
                                            We use the collected information solely for:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-2">
                                            <li>Processing and fulfilling your app publishing order.</li>
                                            <li>Communicating with you regarding the status of your submission.</li>
                                            <li>Providing customer support and troubleshooting.</li>
                                            <li>Complying with legal obligations.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Security */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-500">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                                    <Lock className="text-red-500" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">3. Data Security & Retention</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We implement industry-standard security measures to protect your data. Your app files and assets are stored securely and are only accessed by authorized personnel involved in the publishing process.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>File Retention:</strong> We delete your APK/AAB files and associated visual assets from our local systems 30 days after the order is completed, unless you request otherwise for future updates.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Third Party Services */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-600">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 mt-1">
                                    <Globe className="text-orange-500" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">4. Third-Party Sharing</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We do not sell, trade, or rent your personal identification information to others. We share your app data only with:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                                        <li><strong>Google:</strong> As required to publish your app on the Google Play Store.</li>
                                        <li><strong>Service Providers:</strong> Trusted third parties who assist us in operating our website (e.g., payment processors, email services), provided they agree to keep this information confidential.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-700">
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold">5. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:parasgupta4494@gmail.com" className="text-primary hover:underline">parasgupta4494@gmail.com</a>
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
