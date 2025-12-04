import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Quanta Mesh - Publish Your Android App to Google Play | $25</title>
        <meta name="description" content="Professional Android app publishing service. We publish your app to Google Play Console for just $25. Fast submission, metadata optimization, and policy compliance included." />
        <meta name="keywords" content="android app publishing, google play console, app store submission, publish android app, app publishing service" />
        <link rel="canonical" href="https://quantamesh.com" />
      </Helmet>
      
      <Hero />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTA />
    </Layout>
  );
};

export default Index;
