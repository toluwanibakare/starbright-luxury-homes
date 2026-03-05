import { motion } from "framer-motion";
import { trustFeatures } from "@/data/mockData";

const TrustSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Why Trust Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-4">Our Verification Process</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Every property goes through a rigorous 4-step verification before listing.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-8 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <div className="w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-xs font-bold" style={{ background: "var(--gradient-brand)", color: "hsl(var(--primary-foreground))" }}>
                {i + 1}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
