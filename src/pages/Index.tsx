import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedListings />
      <Categories />
      <TrustSection />
      <Testimonials />
      <CTABand />
      <Footer />
    </div>
  );
};

export default Index;
