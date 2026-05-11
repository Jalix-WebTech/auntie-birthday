import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Gallery from "./sections/Gallery";
import Surprise from "./sections/Surprise";
import PageTransition from "./components/PageTransition";
import CinematicIntro from "./components/CinematicIntro";

const RevealSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
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
        <CinematicIntro onFinish={() => setIntroDone(true)} />
      )}

      {!loading && introDone && (
        <PageTransition>
          <Navbar />
          {showHero && <Hero />}
          {showGallery && (
            <RevealSection>
              <Gallery />
            </RevealSection>
          )}
          {showSurprise && (
            <RevealSection>
              <Surprise />
            </RevealSection>
          )}
        </PageTransition>
      )}
    </main>
  );
}

export default App;