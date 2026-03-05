import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/starbright_logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-premium section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Starbright Real Estate" className="h-14 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Nigeria's trusted platform for verified land and property listings. We ensure every property is inspected and documented.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/listings", label: "Listings" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm text-background/60 hover:text-background transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Categories</h4>
            <div className="space-y-3">
              {["Land", "Houses", "Commercial Properties"].map((cat) => (
                <Link key={cat} to="/listings" className="block text-sm text-background/60 hover:text-background transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-background/60">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@starbrightproperties.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-xs text-background/40">
          © {new Date().getFullYear()} Starbright Real Estate & Properties. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
