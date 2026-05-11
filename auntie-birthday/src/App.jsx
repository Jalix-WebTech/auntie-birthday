import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
const Gallery = lazy(() => import("./sections/Gallery"));
const Surprise = lazy(() => import("./sections/Surprise"));
import PageTransition from "./components/PageTransition";
import LaunchIntro from "./components/LaunchIntro";

const motionConfig = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8 },
  },
};

const Section = ({ children }) => (
  <div className="max-w-6xl mx-auto px-6 py-24">{children}</div>
);

const RevealSection = ({ children }) => (
  <Section>
    <motion.div {...motionConfig.fadeUp}>{children}</motion.div>
  </Section>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let t1;
    let t2;
    let t3;

    if (introDone) {
      t1 = setTimeout(() => setShowHero(true), 500);
      t2 = setTimeout(() => setShowGallery(true), 2000);
      t3 = setTimeout(() => setShowSurprise(true), 4000);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [introDone]);

  return (
    <main className="bg-black">
      {loading && <Loader />}

      {!loading && !introDone && (
        <LaunchIntro onDone={() => setIntroDone(true)} />
      )}

      {!loading && introDone && (
        <PageTransition>
          <Navbar />
          {showHero && (
            <Section>
              <Hero />
            </Section>
          )}
          {showGallery && (
            <Suspense fallback={<div className="py-20 text-white text-center">Loading memories...</div>}>
              <RevealSection>
                <Gallery />
              </RevealSection>
            </Suspense>
          )}
          {showSurprise && (
            <Suspense fallback={<div className="py-20 text-white text-center">Loading surprise...</div>}>
              <RevealSection>
                <Surprise />
              </RevealSection>
            </Suspense>
          )}
        </PageTransition>
      )}
    </main>
  );
}

export default App;