import { motion } from 'framer-motion';

export default function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="mb-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--accent-cyan)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          {'// '}{label}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginTop: 8,
          marginBottom: subtitle ? 16 : 0,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            maxWidth: 560,
          }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="accent-line mt-3"
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </div>
  );
}
