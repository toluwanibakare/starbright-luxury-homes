import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

const Categories = () => {
  return (
    <section className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Browse By Type</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">Property Categories</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Link to={`/listings?category=${cat.value}`} className="block group">
                <div className="premium-card p-10 text-center">
                  <span className="text-5xl mb-5 block">{cat.icon}</span>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{cat.label}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} verified listings</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
