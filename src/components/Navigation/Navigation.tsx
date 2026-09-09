import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { scrollToSection } from '@/lib/hooks/useLenis';
import { EASE } from '@/lib/constants';

/**
 * Minimal floating navigation.
 * - Transparent at the top; gains blur + hairline border once scrolled.
 * - Full-screen animated menu on mobile.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // Allow the overlay to begin closing before scrolling.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE.outExpo }}
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-editorial flex h-[var(--nav-height)] items-center justify-between">
          <button
            onClick={() => go('hero')}
            data-cursor="hover"
            className="group flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="font-display text-lg font-semibold tracking-editorial text-chalk">
              ADWAY
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  data-cursor="hover"
                  className="group relative px-4 py-2 text-sm text-chalk-muted transition-colors duration-300 hover:text-chalk"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 h-px w-0 bg-chalk transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={() => go('contact')}
              data-cursor="hover"
              className="rounded-full border border-white/15 px-5 py-2 text-sm text-chalk transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.04]"
            >
              Get in touch
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[95] flex h-10 w-10 items-center justify-center text-chalk md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: EASE.outExpo }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className="py-2 text-left font-display text-4xl font-medium text-chalk"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => go('contact')}
              className="mt-10 self-start rounded-full bg-chalk px-7 py-3 text-sm font-medium text-ink-950"
            >
              Get in touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
