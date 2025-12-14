import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- Context for Terminal Animation Coordination ---
export const TerminalContext = React.createContext<{
  isTerminalComplete: boolean;
  setTerminalComplete: (val: boolean) => void;
}>({
  isTerminalComplete: false,
  setTerminalComplete: () => {},
});

// --- Background Component ---
const Background: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Dark overlay base - Lighter on non-home pages */}
      <div className={`absolute inset-0 z-0 transition-colors duration-700 ${isHome ? 'bg-[#050505]' : 'bg-[#0e0e0e]'}`}></div>
      
      {/* 
         Replaced 'blur' filter with radial-gradient for smoother, non-pixelated transitions.
         Centered by parent flex container, then animated with wander.
      */}
      
      {/* Main Green Light - Soft Radial Gradient */}
      <div className="absolute w-[80vw] h-[80vw] md:w-[1000px] md:h-[1000px] bg-[radial-gradient(circle,rgba(76,175,80,0.1)_0%,rgba(0,0,0,0)_70%)] animate-wander"></div>
      
      {/* Secondary Cool Light - Soft Radial Gradient - Offset animation */}
      <div className="absolute w-[90vw] h-[90vw] md:w-[1200px] md:h-[1200px] bg-[radial-gradient(circle,rgba(30,41,59,0.15)_0%,rgba(0,0,0,0)_70%)] animate-wander-slow" style={{ animationDelay: '-7s' }}></div>
    </div>
  );
};

// --- Logo Component ---
const AnimatedLogo: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link 
      to="/" 
      className="relative font-mono font-bold text-xl tracking-tight group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-terminal-dim transition-colors group-hover:text-white">[</span>
      <span className="mx-2 text-white relative">
        <span className={`absolute inset-0 text-terminal-green opacity-0 ${hovered ? 'animate-glitch opacity-100' : ''}`} aria-hidden="true">kCn</span>
        <span className="relative">kCn</span>
      </span>
      <span className="text-terminal-dim transition-colors group-hover:text-white">]</span>
    </Link>
  );
};

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home", icon: "fas fa-home" },
    { to: "/projects", label: "Projects", icon: "fas fa-folder-open" },
    { to: "/about", label: "About", icon: "fas fa-user" },
  ];

  const externalLinks = [
    { href: "https://kcn3333.github.io/homelab/", label: "Homelab", icon: "fas fa-server" },
  ];

  const NavItem = ({ to, label, icon, isExternal = false }: { to: string; label: string; icon: string; isExternal?: boolean }) => {
    const isActive = location.pathname === to;
    
    // Cleaner, more open nav item style with icons
    const baseClasses = `relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2
      ${isActive ? 'text-white' : 'text-terminal-dim hover:text-terminal-green'}`;

    if (isExternal) {
      return (
        <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          <i className={icon}></i>
          {label} <i className="fas fa-external-link-alt text-[10px] align-top opacity-50 ml-0.5"></i>
        </a>
      );
    }

    return (
      <Link to={to} className={baseClasses}>
        <i className={`${icon} ${isActive ? 'text-terminal-green' : ''} transition-colors`}></i>
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center">
          
          <AnimatedLogo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} {...link} />
            ))}
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            {externalLinks.map((link) => (
              <NavItem key={link.label} to={link.href} label={link.label} icon={link.icon} isExternal />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-24 left-6 right-6 glass rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.to 
                  ? 'bg-white/5 text-white' 
                  : 'text-terminal-dim hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`${link.icon} w-5 text-center`}></i>
              {link.label}
            </Link>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-terminal-dim hover:text-white hover:bg-white/5"
            >
              <i className={`${link.icon} w-5 text-center`}></i>
              {link.label}
              <i className="fas fa-external-link-alt text-xs opacity-50 ml-auto"></i>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// --- Footer Component ---
const Footer: React.FC = () => {
  const [ip, setIp] = useState<string>('fetching...');
  const { isTerminalComplete } = useContext(TerminalContext);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        if (data && data.ip) setIp(data.ip);
        else setIp('unknown');
      })
      .catch(() => setIp('offline'));
  }, []);

  return (
    <footer className="mt-auto py-12 text-sm text-terminal-dim">
      <div className="max-w-6xl mx-auto px-6 border-t border-white/5 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Left: Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-6 text-xl">
             <a href="mailto:cnk333@email.cz" className="text-terminal-dim hover:text-terminal-green transition-colors" title="Email">
               <i className="fas fa-envelope"></i>
             </a>
             <a href="https://github.com/kCn3333" target="_blank" rel="noopener noreferrer" className="text-terminal-dim hover:text-terminal-green transition-colors" title="GitHub">
               <i className="fab fa-github"></i>
             </a>
          </div>

          {/* Center: Copyright & Slogan */}
          <div className="text-center font-mono text-xs flex flex-col items-center">
            <div className="text-[10px] text-terminal-dim opacity-70 italic mb-1">built with coffee, passion and curiosity...</div>
            <span className="text-white/40 font-medium tracking-wide">kCn &copy; {new Date().getFullYear()}</span>
          </div>
          
          {/* Right: Status & IP */}
          <div className={`flex flex-col items-center md:items-end font-mono text-xs transition-opacity duration-1000 space-y-1 ${isTerminalComplete ? 'opacity-60' : 'opacity-0'}`}>
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></div>
                   <span>Online</span>
                 </div>
                 <div>Client IP: {ip}</div>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

// --- Main Layout ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTerminalComplete, setTerminalComplete] = useState(false);

  return (
    <TerminalContext.Provider value={{ isTerminalComplete, setTerminalComplete }}>
      <div className="min-h-screen flex flex-col relative font-sans selection:bg-terminal-green/30 selection:text-white">
        <Background />
        <Navbar />
        
        {/* Added pt-32 to account for fixed navbar */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 z-10 pt-32 pb-12 animate-[fade-in_0.5s_ease-out]">
          {children}
        </main>
        
        <Footer />
      </div>
    </TerminalContext.Provider>
  );
};

export default Layout;