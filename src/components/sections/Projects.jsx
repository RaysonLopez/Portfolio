import { projects } from '../../data/portfolio';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';
import ProjectCard from '../ui/ProjectCard';
import FloatingPyramid from '../three/FloatingPyramid';

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        {/* Header with 3D Element */}
        <div className="row align-items-center mb-5 g-4">
          <div className="col-12 col-lg-7">
            <SectionReveal>
              <SectionTitle
                label="Proyectos Destacados"
                title="Trabajo Técnico"
                subtitle="Cada proyecto representa un problema real con una solución concreta y medible."
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
                  <FloatingPyramid height="200px" />
                </Suspense>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  marginTop: 8,
                  letterSpacing: '0.12em',
                }}>
                  DEV<span style={{ color: 'var(--accent-cyan)' }}>.</span>projects
                  <span style={{ color: 'var(--accent-violet)' }}>[*]</span>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>

        <div className="row g-4">
          {projects.map((project, i) => (
            <div className="col-12 col-md-6" key={project.id}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
