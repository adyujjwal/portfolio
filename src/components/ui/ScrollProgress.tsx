import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Ultra-thin scroll progress indicator fixed to the top of the viewport.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-bright to-accent/40"
      style={{ scaleX }}
    />
  );
}
