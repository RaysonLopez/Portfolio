import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const { title, area, description, technologies, color } = project;

  return (
    <motion.div
      className="surface h-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{ padding: '28px', cursor: 'default', position: 'relative', overflow: 'hidden' }}
    >
      {/* Accent top bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />

      {/* Area badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: color,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        opacity: 0.85,
      }}>
        {area}
      </span>

      {/* Number */}
      <div style={{
        position: 'absolute',
        top: 20, right: 24,
        fontFamily: 'var(--font-mono)',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.03)',
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.05rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginTop: 10,
        marginBottom: 12,
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        color: 'var(--text-dim)',
        fontSize: '0.9rem',
        lineHeight: 1.7,
        marginBottom: 20,
      }}>
        {description}
      </p>

      {/* Tech tags */}
      <div className="d-flex flex-wrap gap-2">
        {technologies.map(tech => (
          <span key={tech} className="tech-tag"
            style={{ borderColor: `${color}40`, color: color }}>
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
