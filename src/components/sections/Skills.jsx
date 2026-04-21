import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Network, Code2, Database, Shield, PenTool } from 'lucide-react';
import { skills } from '../../data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';
import FloatingCube from '../three/FloatingCube';

// ── Ícono circular individual ──────────────────────────────
function SkillIcon({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.045, ease: 'easeOut' }}
      whileHover={{ y: -7, scale: 1.1, transition: { duration: 0.2 } }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        width: 90,
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      {/* Círculo con ícono */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 76,
          height: 76,
          borderRadius: '50%',
          background: hovered
            ? `${item.color}22`
            : `${item.color}0e`,
          border: `1.5px solid ${hovered ? item.color + '90' : item.color + '30'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: hovered
            ? `0 0 22px ${item.color}40, inset 0 0 14px ${item.color}10`
            : 'none',
        }}
      >
        {item.icon && !imgErr ? (
          <img
            src={item.icon}
            alt={item.name}
            width={44}
            height={44}
            loading="lazy"
            onError={() => setImgErr(true)}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
            }}
          />
        ) : (
          <span style={{ fontSize: '28px', lineHeight: 1 }}>
            {item.emoji || '⚡'}
          </span>
        )}
      </div>

      {/* Nombre */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.67rem',
          color: hovered ? item.color : 'var(--text-muted)',
          textAlign: 'center',
          lineHeight: 1.3,
          maxWidth: 86,
          transition: 'color 0.3s',
          letterSpacing: '0.02em',
        }}
      >
        {item.name}
      </span>
    </motion.div>
  );
}

// ── Mapa de íconos por categoría ──────────────────────────
const CAT_ICONS = {
  network:    <Network  size={15} />,
  code:       <Code2    size={15} />,
  monitor:    <Code2    size={15} />,
  database:   <Database size={15} />,
  shield:     <Shield   size={15} />,
  'pen-tool': <PenTool  size={15} />,
};

// ── Colores de acento por categoría ──────────────────────
const CAT_COLORS = [
  '#00d4ff',
  '#7c3aed',
  '#f59e0b',
  '#4169E1',
  '#10b981',
  '#FF9A00',
];

// ── Sección principal ─────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        {/* ── Header: título + cubo 3D ── */}
        <div className="row align-items-center mb-5 g-4">
          <div className="col-12 col-lg-7">
            <SectionReveal>
              <SectionTitle
                label="Stack Tecnológico"
                title="Habilidades Técnicas"
                subtitle="Tecnologías con las que he trabajado en proyectos reales — sin barras de progreso subjetivas."
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
                {/* Corner decorations */}
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

                <Suspense fallback={
                  <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>loading 3d...</span>
                  </div>
                }>
                  <FloatingCube height="200px" />
                </Suspense>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  marginTop: 8,
                  letterSpacing: '0.12em',
                }}>
                  TECH<span style={{ color: 'var(--accent-cyan)' }}>.</span>stack
                  <span style={{ color: 'var(--accent-violet)' }}>[*]</span>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>


        <div className="d-flex flex-column gap-5">
          {skills.map((cat, ci) => (
            <SectionReveal key={cat.category} delay={ci * 0.06}>
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${CAT_COLORS[ci]}20`,
                  borderRadius: 14,
                  padding: '24px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Left accent border */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0, top: 16, bottom: 16,
                    width: 3,
                    background: `linear-gradient(180deg, ${CAT_COLORS[ci]}, transparent)`,
                    borderRadius: '0 3px 3px 0',
                  }}
                />

                {/* Glow blob background */}
                <div
                  style={{
                    position: 'absolute',
                    top: -40, right: -40,
                    width: 180, height: 180,
                    background: `radial-gradient(circle, ${CAT_COLORS[ci]}08 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Category header */}
                <div
                  className="d-flex align-items-center gap-2 mb-4"
                  style={{
                    paddingBottom: 14,
                    borderBottom: `1px solid ${CAT_COLORS[ci]}18`,
                  }}
                >
                  <span style={{ color: CAT_COLORS[ci] }}>
                    {CAT_ICONS[cat.icon]}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-dim)',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {cat.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: `${CAT_COLORS[ci]}90`,
                      marginLeft: 'auto',
                    }}
                  >
                    {cat.items.length} techs
                  </span>
                </div>

                {/* Icons grid */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px 12px',
                  }}
                >
                  {cat.items.map((item, ii) => (
                    <SkillIcon key={item.name} item={item} index={ii} />
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
