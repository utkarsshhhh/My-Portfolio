import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const navLinks = [
    { href: '#about', label: 'About', icon: 'ph-user' },
    { href: '#projects', label: 'Projects', icon: 'ph-kanban' },
    { href: '#contact', label: 'Contact', icon: 'ph-paper-plane-tilt' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Determine active section
      let currentSection = '#home';
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          currentSection = `#${section.id}`;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu on link click
  };
  
  const NavLink: React.FC<{ link: typeof navLinks[0]; isMobile?: boolean }> = ({ link, isMobile }) => {
    const isActive = activeSection === link.href;
    return (
      <a
        href={link.href}
        onClick={(e) => handleLinkClick(e, link.href)}
        className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 group flex items-center gap-2 ${
          isActive ? 'text-white' : 'text-[#D8ECF8] hover:text-white'
        } ${isMobile ? 'py-3 text-lg' : ''}`}
      >
        <i className={`ph-bold ${link.icon}`}></i>
        <span>{link.label}</span>
        {!isMobile && (
          <span className={`absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#D8ECF8] transition-transform duration-300 origin-center transform ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
        )}
      </a>
    );
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-black/40 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-2xl font-bold tracking-widest uppercase transition-colors hover:text-white">
          UA
        </a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </nav>
        <button
          className="md:hidden z-50 text-3xl text-[#D8ECF8]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <i className={`ph-bold ${isMenuOpen ? 'ph-x' : 'ph-list'}`}></i>
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/40 backdrop-blur-lg transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} isMobile />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;