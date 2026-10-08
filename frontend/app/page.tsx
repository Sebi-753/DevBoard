import { getMe } from "@/lib/server-data-services";
import CTA from "@/ui/landingPageSections/CTA";
import Features from "@/ui/landingPageSections/Features";
import Footer from "@/ui/landingPageSections/Footer";
import Hero from "@/ui/landingPageSections/Hero";
import HowItWorks from "@/ui/landingPageSections/HowItWorks";
import Navbar from "@/ui/layoutComponents/Navbar";

export default async function Home() {
  const user = await getMe();

  return (
    <section>
      <Navbar user={user} />

      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </section>
  );
}
