import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  { image: hero1, headline: "Verified Properties, Real Confidence", sub: "Only thoroughly verified land and properties make it to our platform." },
  { image: hero2, headline: "Find Land & Homes You Can Trust", sub: "Every listing is inspected, documented, and ready for secure purchase." },
  { image: hero3, headline: "Premium Living, Zero Compromise", sub: "Discover luxury apartments and homes in Nigeria's most sought-after locations." },
  { image: hero4, headline: "Only Verified Listings, No Stories", sub: "We eliminate fraud so you can invest with complete peace of mind." },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].headline}
            className="w-full h-full object-cover animate-zoom-slow"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center container-premium px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: "hsl(var(--primary-foreground) / 0.7)" }}
            >
              Starbright Real Estate
            </motion.p>
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              {slides[current].headline}
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "hsl(var(--primary-foreground) / 0.8)" }}
            >
              {slides[current].sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/listings" className="premium-btn-primary flex items-center gap-2">
                <Search className="w-4 h-4" />
                Browse Listings
              </Link>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-btn-whatsapp flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Request Inspection
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-3 border border-border/30 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <select className="hero-search-input">
                <option>All Locations</option>
                <option>Lekki, Lagos</option>
                <option>Ikoyi, Lagos</option>
                <option>Victoria Island</option>
                <option>Ajah, Lagos</option>
              </select>
              <select className="hero-search-input">
                <option>All Categories</option>
                <option>Land</option>
                <option>Houses</option>
                <option>Commercial</option>
              </select>
              <input type="text" placeholder="Min Price" className="hero-search-input" />
              <input type="text" placeholder="Max Price" className="hero-search-input" />
              <Link
                to="/listings"
                className="premium-btn-primary flex items-center justify-center gap-2 text-xs !rounded-lg"
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card/40"
        style={{ color: "hsl(var(--primary-foreground))" }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card/40"
        style={{ color: "hsl(var(--primary-foreground))" }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-primary" : "w-4 bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
