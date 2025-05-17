import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-8 px-4 bg-indigo-950">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-4 text-white">NEO GAIAM</h3>
            <p className="text-sm text-violet-300 mb-4">Elevating consciousness through cosmic wisdom and sacred geometry.</p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon="instagram" />
              <SocialLink href="#" icon="facebook" />
              <SocialLink href="#" icon="youtube" />
              <SocialLink href="#" icon="telegram" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/courses" label="Courses" />
              <FooterLink href="/services" label="Services" />
              <FooterLink href="/events" label="Events" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/about" label="About Us" />
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/services/coaching" label="Coaching" />
              <FooterLink href="/services/astrologia" label="Astrología" />
              <FooterLink href="/services/diseno-humano" label="Diseño Humano" />
              <FooterLink href="/services/constelaciones" label="Constelaciones" />
              <FooterLink href="/services/sanaciones" label="Sanaciones" />
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400 mt-0.5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-violet-300">info@neogaiam.com</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400 mt-0.5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-violet-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400 mt-0.5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-violet-300">1234 Cosmic Way, Universe City, Planet Earth</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-indigo-800 text-center text-sm text-violet-400">
          <p>&copy; {new Date().getFullYear()} NEO GAIAM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  href: string;
  label: string;
};

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <li>
    <Link href={href} className="text-violet-300 hover:text-white transition">
      {label}
    </Link>
  </li>
);

type SocialLinkProps = {
  href: string;
  icon: "instagram" | "facebook" | "youtube" | "telegram";
};

const SocialLink = ({ href, icon }: SocialLinkProps) => {
  const getIcon = () => {
    switch (icon) {
      case "instagram":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "facebook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      case "youtube":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        );
      case "telegram":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm-2.5-14l7.5 3-7.5 3 1-6zm3 4v4h-1v-4h1z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a href={href} className="text-violet-400 hover:text-white transition" target="_blank" rel="noopener noreferrer">
      {getIcon()}
    </a>
  );
};

export default Footer;
