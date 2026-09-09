import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import LoadingScreen from '@/components/ui/LoadingScreen';
import BackgroundScene from '@/components/ui/BackgroundScene';
import Navigation from '@/components/Navigation/Navigation';

import Opening from '@/components/Opening/Opening';
import Intro from '@/components/Intro/Intro';
import Experience from '@/components/Experience/Experience';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skills/Skills';
import Philosophy from '@/components/Philosophy/Philosophy';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

import { useLenis } from '@/lib/hooks/useLenis';

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  // Lock scroll while the loader is visible.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <div className="grain" aria-hidden />
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navigation />

      <div className="relative z-10">
        <main>
          <Opening />
          <Intro />
          <Experience />
          <Projects />
          <Skills />
          <Philosophy />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
