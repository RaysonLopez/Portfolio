import { motion } from 'framer-motion';

const variants = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -24 },
};

export default function SectionReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
