import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { RefreshCw, CheckCircle, XCircle, DollarSign } from "lucide-react";

export default function RefundPolicy() {
    return (
        <Layout>
            <Helmet>
                <title>Refund Policy | Quanta Mesh</title>
                <meta name="description" content="Refund Policy for Quanta Mesh app publishing services." />
                <link rel="canonical" href="https://www.quantamesh.store/refund-policy" />
            </Helmet>

            {/* Hero Section */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute bottom-[20%] right-[30%] w-[300px] h-[300px] bg-red-500/20 rounded-full blur-[80px] opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6 animate-fade-in">
                        <DollarSign size={16} />
                        <span>Money Back Guarantee</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in delay-100">
                        Refund <span className="gradient-text">Policy</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in delay-200">
                        We want you to be completely satisfied with our service.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Eligibility */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-300">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-1">
                                    <CheckCircle className="text-green-500" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">1. Full Refund Eligibility</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        You are eligible for a 100% refund of the service fee if:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                                        <li>We fail to submit your application to the Google Play Store within 72 hours of receiving all necessary assets and information from you (excluding delays caused by you or Google's system outages).</li>
                                        <li>We are unable to process your order for any technical reason on our end.</li>
                                        <li>You request a cancellation within 2 hours of placing the order, provided work has not yet commenced.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Non-Refundable */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-400">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                                    <XCircle className="text-red-500" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">2. Non-Refundable Circumstances</h2>
                                    <div className="text-muted-foreground space-y-3 leading-relaxed">
                                        <p>
                                            Refunds are <strong>NOT</strong> provided in the following scenarios:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-2">
                                            <li><strong>Policy Violation Rejection:</strong> If Google rejects your app due to a violation of their Developer Program Policies (e.g., malware, copyright infringement, deceptive behavior, inappropriate content) that was present in the assets or code you provided.</li>
                                            <li><strong>Change of Mind:</strong> If you decide not to publish the app after our team has already started working on the submission.</li>
                                            <li><strong>Google Account Issues:</strong> If your Google Play Console account is terminated or suspended by Google for reasons unrelated to our specific service actions.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rejection Handling */}
                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-500">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                                    <RefreshCw className="text-blue-500" size={20} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold">3. Rejection & Resubmission Support</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        If your app is rejected by Google for a fixable issue (e.g., metadata description, screenshot sizes, content rating discrepancy):
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                                        <li>We provide <strong>free re-submission support</strong>. We will work with you to correct the issue and resubmit the app at no extra cost.</li>
                                        <li>We treat a rejection as a step in the process, not a failure, and will guide you on what needs to be changed in your app or assets.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in delay-600">
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold">4. How to Request a Refund</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    To request a refund, please email us at <a href="mailto:parasgupta4494@gmail.com" className="text-primary hover:underline">parasgupta4494@gmail.com</a> with your Order ID and the reason for the request. We aim to review and process valid refund requests within 3-5 business days.
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
