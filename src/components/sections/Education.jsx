import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../../data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';
import FloatingRings from '../three/FloatingRings';

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
        {/* Header with 3D Element */}
        <div className="row align-items-center mb-5 g-4">
          <div className="col-12 col-lg-7">
            <SectionReveal>
              <SectionTitle
                label="Educación"
                title="Formación Académica"
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
                  <FloatingRings height="200px" />
                </Suspense>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  marginTop: 8,
                  letterSpacing: '0.12em',
                }}>
                  EDU<span style={{ color: 'var(--accent-cyan)' }}>.</span>path
                  <span style={{ color: 'var(--accent-violet)' }}>[*]</span>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>

            {education.map((edu, i) => (
              <SectionReveal key={i} delay={0.1}>
                <motion.div
                  className="surface d-flex align-items-start gap-4"
                  whileHover={{ borderColor: 'var(--border-glow-strong)', boxShadow: 'var(--glow-cyan)' }}
                  style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Background decoration */}
                  <div style={{
                    position: 'absolute',
                    right: -20, top: -20,
                    width: 160, height: 160,
                    background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 56, height: 56,
                    minWidth: 56,
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                    border: '1px solid var(--border-glow)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <GraduationCap size={24} color="var(--accent-cyan)" />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                      <h3 style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}>
                        {edu.institution}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#10b981',
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: 4,
                        padding: '3px 10px',
                      }}>
                        {edu.status}
                      </span>
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      color: 'var(--accent-cyan)',
                      marginBottom: 12,
                    }}>
                      {edu.degree}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Calendar size={14} color="var(--text-muted)" />
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}>
                        Período Académico Activo
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
