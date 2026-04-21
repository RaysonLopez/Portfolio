import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../../data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <SectionReveal>
              <SectionTitle
                label="Educación"
                title="Formación Académica"
              />
            </SectionReveal>

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
