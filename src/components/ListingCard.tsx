import { Link } from "react-router-dom";
import { MapPin, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { type Listing, formatPrice } from "@/data/mockData";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

const ListingCard = ({ listing, index = 0 }: ListingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/listings/${listing.slug}`} className="block group">
        <div className="premium-card overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            {listing.verified && (
              <div className="absolute top-3 left-3 verified-badge">
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified
              </div>
            )}
            <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {listing.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-sm text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs">{listing.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold premium-gradient-text">{formatPrice(listing.price)}</span>
              <span className="text-xs text-muted-foreground">{listing.size}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
