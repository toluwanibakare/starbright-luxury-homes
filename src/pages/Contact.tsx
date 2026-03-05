import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-12 section-padding !pb-8" style={{ background: "var(--gradient-subtle)" }}>
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">Get in Touch</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-4">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you. Reach out anytime.</p>
          </motion.div>
        </div>
      </div>

      <div className="container-premium section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="hero-search-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Phone</label>
                  <input type="tel" placeholder="+234..." className="hero-search-input w-full" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Email</label>
                <input type="email" placeholder="you@example.com" className="hero-search-input w-full" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Subject</label>
                <select className="hero-search-input w-full">
                  <option>General Enquiry</option>
                  <option>Schedule Inspection</option>
                  <option>List My Property</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Message</label>
                <textarea rows={5} placeholder="Tell us how we can help..." className="hero-search-input w-full resize-none" />
              </div>
              <button type="submit" className="premium-btn-primary w-full sm:w-auto">Send Message</button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Phone", value: "+234 800 000 0000" },
                  { icon: Mail, label: "Email", value: "hello@starbrightproperties.com" },
                  { icon: MapPin, label: "Office", value: "Lagos, Nigeria" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--gradient-brand)" }}>
                      <item.icon className="w-4 h-4" style={{ color: "hsl(var(--primary-foreground))" }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-6">
              <h3 className="font-bold text-foreground mb-3">Prefer WhatsApp?</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with us directly for faster responses.</p>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-btn-whatsapp inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
