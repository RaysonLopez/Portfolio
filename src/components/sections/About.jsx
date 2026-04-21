import { motion } from 'framer-motion';
import { User, Server, Shield, Code } from 'lucide-react';
import { personal } from '../../data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import SectionReveal from '../layout/SectionReveal';

const HIGHLIGHTS = [
  { icon: <Server size={18} color="var(--accent-cyan)" />, label: 'Infraestructura de Redes', desc: 'OSPF, BGP, MPLS L3VPN, Ansible' },
  { icon: <Code size={18} color="var(--accent-violet)" />, label: 'Desarrollo Backend',       desc: 'Python, C#, Flask, ASP.NET' },
  { icon: <Shield size={18} color="#10b981" />,             label: 'Ciberseguridad',            desc: 'Auditorías, Hardening, Docker' },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* Text column */}
          <div className="col-12 col-lg-7">
            <SectionReveal>
              <SectionTitle
                label="Perfil Profesional"
                title="Sobre Mí"
              />
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p style={{
                color: 'var(--text-dim)',
                fontSize: '1rem',
                lineHeight: 1.9,
                marginBottom: 32,
              }}>
                {personal.about}
              </p>
            </SectionReveal>

            {/* Highlights row */}
            <div className="row g-3">
              {HIGHLIGHTS.map((h, i) => (
                <div className="col-12 col-sm-4" key={i}>
                  <SectionReveal delay={0.2 + i * 0.1}>
                    <div className="surface" style={{ padding: '20px 16px', height: '100%' }}>
                      <div className="mb-2">{h.icon}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}>
                        {h.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                      }}>
                        {h.desc}
                      </div>
                    </div>
                  </SectionReveal>
                </div>
              ))}
            </div>
          </div>

          {/* Visual column */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <SectionReveal delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  width: '100%',
                  maxWidth: 340,
                  padding: '32px',
                  border: '1px solid var(--border-glow)',
                  borderRadius: '16px',
                  background: 'var(--bg-card)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Corner decoration */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 60, height: 60,
                  borderTop: '2px solid var(--accent-cyan)',
                  borderLeft: '2px solid var(--accent-cyan)',
                  borderRadius: '16px 0 0 0',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 60, height: 60,
                  borderBottom: '2px solid var(--accent-violet)',
                  borderRight: '2px solid var(--accent-violet)',
                  borderRadius: '0 0 16px 0',
                }} />

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div style={{
                    width: 52, height: 52,
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <User size={24} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Rayson Lopez
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                      IT Student · ESPE
                    </div>
                  </div>
                </div>

                {[ 
                  ['Universidad', 'ESPE — Fuerzas Armadas'],
                  ['Especialidad', 'Tecnologías de la Información'],
                  ['Focus',       'Redes · Backend · Seguridad'],
                  ['Estado',      'En curso'],
                ].map(([k, v]) => (
                  <div key={k} className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>{v}</span>
                  </div>
                ))}
              </motion.div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
