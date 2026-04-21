import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { personal } from '../../data/portfolio';
import NetworkGlobe from '../three/NetworkGlobe';

// Efecto typewriter
function TypeWriter({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <span style={{
        animation: 'typeCursor 1s step-end infinite',
        color: 'var(--accent-cyan)',
        fontWeight: 300,
      }}>|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="container h-100">
        <div className="row align-items-center" style={{ minHeight: '100vh' }}>

          {/* ── TEXT ── */}
          <div className="col-12 col-lg-6 order-2 order-lg-1" style={{ paddingTop: '80px', paddingBottom: '40px' }}>

            {/* Prefix label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.2em',
              }}>
                {'< '} IT.engineer {'/>'}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginTop: 16,
                marginBottom: 4,
                background: 'linear-gradient(135deg, #e2e8f0 30%, var(--accent-cyan) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Rayson Steve
              <br />
              Lopez De La Cruz
            </motion.h1>

            {/* Typewriter headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                color: 'var(--accent-cyan)',
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              <TypeWriter text={personal.headline} speed={45} />
            </motion.div>

            {/* Short description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                color: 'var(--text-dim)',
                fontSize: '1rem',
                lineHeight: 1.8,
                maxWidth: 480,
                marginBottom: 36,
              }}
            >
              {personal.shortDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="d-flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <a href="#projects" className="btn-glow btn-glow-solid">
                Ver Proyectos
              </a>
              <a href="#contact" className="btn-glow">
                Contacto
              </a>
            </motion.div>

            {/* Status dot */}
            <motion.div
              className="d-flex align-items-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span style={{
                width: 8, height: 8,
                background: '#10b981',
                borderRadius: '50%',
                animation: 'pulseGlow 2s ease-in-out infinite',
                boxShadow: '0 0 8px #10b981',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}>
                Disponible · Ecuador · ESPE
              </span>
            </motion.div>
          </div>

          {/* ── 3D GLOBE ── */}
          <div className="col-12 col-lg-6 order-1 order-lg-2 d-flex justify-content-center"
            style={{ height: 'clamp(300px, 50vw, 520px)', paddingTop: '80px' }}
          >
            <motion.div
              style={{ width: '100%', height: '100%' }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              <Suspense fallback={<div />}>
                <NetworkGlobe />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.15em',
        }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="var(--accent-cyan)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
