import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
      isScrolled ? "bg-indigo-950/90 backdrop-blur-md py-2" : "bg-indigo-950/50 backdrop-blur-sm py-3"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-montserrat font-bold tracking-wider text-white flex items-center">
          <span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">NEO GAIAM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" label="Home" currentPath={location} onClick={closeMenu} />
          <NavLink href="/courses" label="Courses" currentPath={location} onClick={closeMenu} />
          <NavLink href="/services" label="Services" currentPath={location} onClick={closeMenu} />
          <NavLink href="/membership" label="Membresía" currentPath={location} onClick={closeMenu} />
          <NavLink href="/about" label="About" currentPath={location} onClick={closeMenu} />
          <NavLink href="/blog" label="Blog" currentPath={location} onClick={closeMenu} />
          <NavLink href="/contact" label="Contact" currentPath={location} onClick={closeMenu} />
          <Link href="/login" className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white">
            Login
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 w-full">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <NavLink href="/" label="Home" currentPath={location} onClick={closeMenu} />
            <NavLink href="/courses" label="Courses" currentPath={location} onClick={closeMenu} />
            <NavLink href="/services" label="Services" currentPath={location} onClick={closeMenu} />
            <NavLink href="/membership" label="Membresía" currentPath={location} onClick={closeMenu} />
            <NavLink href="/about" label="About" currentPath={location} onClick={closeMenu} />
            <NavLink href="/blog" label="Blog" currentPath={location} onClick={closeMenu} />
            <NavLink href="/contact" label="Contact" currentPath={location} onClick={closeMenu} />
            <Link href="/login" className="py-2 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-center text-white">
              Login
            </Link>
            <div className="flex justify-center mt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

type NavLinkProps = {
  href: string;
  label: string;
  currentPath: string;
  onClick: () => void;
};

const NavLink = ({ href, label, currentPath, onClick }: NavLinkProps) => {
  const isActive = currentPath === href || 
    (href !== "/" && currentPath.startsWith(href));
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`${
        isActive 
          ? "text-[#8a4fff] font-medium" 
          : "text-white hover:text-[#ffc83d]"
      } transition py-2 md:py-0`}
    >
      {label}
    </Link>
  );
};

export default Header;
