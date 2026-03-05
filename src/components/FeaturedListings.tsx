import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { listings } from "@/data/mockData";
import ListingCard from "./ListingCard";

const FeaturedListings = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Curated Selection</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Featured Listings</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Hand-picked, verified properties across Lagos and beyond.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {listings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/listings" className="premium-btn-outline inline-flex items-center gap-2">
            View All Listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
