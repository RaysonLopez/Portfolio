import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Mail, ArrowUpRight, Terminal } from 'lucide-react';
import { contact } from '../../data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';
import FloatingTorusKnot from '../three/FloatingTorusKnot';

// SVG de GitHub (no incluido en esta versión de lucide-react)
const GithubIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// SVG de LinkedIn
const LinkedinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LINKS = [
  {
    icon:  <GithubIcon size={22} />,
    label: 'GitHub',
    sub:   'NickRazor',
    href:  contact.github,
    color: 'var(--text-primary)',
  },
  {
    icon:  <LinkedinIcon size={22} />,
    label: 'LinkedIn',
    sub:   'stvrays',
    href:  contact.linkedin,
    color: '#0a66c2',
  },
  {
    icon:  <Mail size={22} />,
    label: 'Email',
    sub:   contact.email,
    href:  `mailto:${contact.email}`,
    color: 'var(--accent-cyan)',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">

            {/* Header with 3D Element */}
            <div className="row align-items-center mb-5 g-4">
              <div className="col-12 col-lg-7">
                <SectionReveal>
                  <SectionTitle
                    label="Contacto"
                    title="Repositorios y Contacto"
                    subtitle="Acceso directo a código, proyectos y perfil profesional."
                  />
                </SectionReveal>
              </div>

              <div className="col-12 col-lg-5 d-flex justify-content-center">
                <SectionReveal delay={0.2}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                      width: 260,
                      padding: '20px',
                      border: '1px solid var(--border-glow)',
                      borderRadius: '16px',
                      background: 'var(--bg-card)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0,
                      width: 40, height: 40,
                      borderTop: '2px solid var(--accent-cyan)',
                      borderLeft: '2px solid var(--accent-cyan)',
                      borderRadius: '16px 0 0 0',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 40, height: 40,
                      borderBottom: '2px solid var(--accent-violet)',
                      borderRight: '2px solid var(--accent-violet)',
                      borderRadius: '0 0 16px 0',
                    }} />

                    <Suspense fallback={<div style={{ height: 200 }} />}>
                      <FloatingTorusKnot height="200px" />
                    </Suspense>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      marginTop: 8,
                      letterSpacing: '0.12em',
                    }}>
                      NET<span style={{ color: 'var(--accent-cyan)' }}>.</span>links
                      <span style={{ color: 'var(--accent-violet)' }}>[*]</span>
                    </div>
                  </motion.div>
                </SectionReveal>
              </div>
            </div>

            {/* Contact cards */}
            <div className="row g-4 mb-5">
              {LINKS.map((link, i) => (
                <div className="col-12 col-md-4" key={link.label}>
                  <SectionReveal delay={i * 0.1}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="surface d-flex flex-column align-items-start"
                      whileHover={{ y: -6, borderColor: 'var(--border-glow-strong)', boxShadow: 'var(--glow-cyan)' }}
                      style={{
                        padding: '28px 24px',
                        textDecoration: 'none',
                        display: 'block',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div className="d-flex align-items-start justify-content-between w-100 mb-3">
                        <div style={{ color: link.color }}>{link.icon}</div>
                        <ArrowUpRight size={16} color="var(--text-muted)" />
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}>
                        {link.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        wordBreak: 'break-all',
                      }}>
                        {link.sub}
                      </div>
                    </motion.a>
                  </SectionReveal>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <SectionReveal delay={0.3}>
              <div style={{
                borderTop: '1px solid var(--border-glow)',
                paddingTop: 32,
                textAlign: 'center',
              }}>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                  <Terminal size={14} color="var(--accent-cyan)" />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                  }}>
                    Rayson Steve Lopez De La Cruz · {new Date().getFullYear()}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  opacity: 0.5,
                }}>
                  Built with React · Three.js · Framer Motion · Bootstrap
                </span>
              </div>
            </SectionReveal>

          </div>
        </div>
      </div>
    </section>
  );
}
