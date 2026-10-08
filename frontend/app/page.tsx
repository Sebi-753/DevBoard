import Navbar from "./ui/layoutComponents/Navbar";
import CTA from "./ui/landingPageSections/CTA";
import Features from "./ui/landingPageSections/Features";
import Hero from "./ui/landingPageSections/Hero";
import HowItWorks from "./ui/landingPageSections/HowItWorks";
import Footer from "./ui/landingPageSections/Footer";

export default function Home() {
  return (
    <section className="">
      <Navbar />

      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </section>
  );
}
