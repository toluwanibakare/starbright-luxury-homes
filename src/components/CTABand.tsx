import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTABand = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
      <div className="absolute inset-0 bg-foreground/20" />
      <div className="relative z-10 container-premium px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" style={{ color: "hsl(var(--primary-foreground))" }}>
            Ready to Find Your Property?
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "hsl(var(--primary-foreground) / 0.8)" }}>
            Book a free inspection today. Our team will guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-btn-whatsapp flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Book Inspection on WhatsApp
            </a>
            <Link to="/contact" className="premium-btn-outline !border-primary-foreground/30 !text-primary-foreground hover:!border-primary-foreground flex items-center gap-2">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABand;
