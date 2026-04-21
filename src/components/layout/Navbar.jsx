import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Inicio',     href: '#hero' },
  { label: 'Sobre Mí',  href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Stack',     href: '#skills' },
  { label: 'Educación', href: '#education' },
  { label: 'Contacto',  href: '#contact' },
];

export default function Navbar() {
  const [active, setActive]       = useState('');
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detectar sección activa
      const sections = NAV_ITEMS.map(n => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        background: scrolled
          ? 'rgba(5, 10, 15, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glow)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-3">
          {/* Logo */}
          <a href="#hero" className="d-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
            <Terminal size={20} color="var(--accent-cyan)" />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.08em',
            }}>
              Rycks-Fullstack<span style={{ color: 'var(--text-muted)' }}>_</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {NAV_ITEMS.map(({ label, href }) => {
              const id = href.slice(1);
              return (
                <a
                  key={id}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: active === id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                  onMouseLeave={e => e.target.style.color = active === id ? 'var(--accent-cyan)' : 'var(--text-muted)'}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0, right: 0,
                        height: 1,
                        background: 'var(--accent-cyan)',
                        boxShadow: '0 0 8px var(--accent-cyan)',
                      }}
                    />
                  )}
                  {label}
                </a>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="d-md-none"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-cyan)', padding: 4 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(5, 10, 15, 0.97)',
              borderTop: '1px solid var(--border-glow)',
              overflow: 'hidden',
            }}
          >
            <div className="container py-3 d-flex flex-column gap-3">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'var(--text-dim)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ color: 'var(--accent-cyan)' }}>{'>'}</span> {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
