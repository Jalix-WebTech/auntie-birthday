import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
const Gallery = lazy(() => import("./sections/Gallery"));
const Surprise = lazy(() => import("./sections/Surprise"));
import PageTransition from "./components/PageTransition";
import LaunchIntro from "./components/LaunchIntro";
import { motionSystem } from "./motionConfig";

const sections = [
  { id: "hero", title: "Introduction" },
  { id: "gallery", title: "Memories" },
  { id: "surprise", title: "Surprise" }
];

const Section = ({ children }) => (
  <div className="max-w-6xl mx-auto px-6 py-24">{children}</div>
);

const RevealSection = ({ children }) => (
  <Section>
    <motion.div {...motionSystem.fadeUp}>{children}</motion.div>
  </Section>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const shareProduct = () => {
    const url = window.location.href;

    const message =
      "🎬 I just experienced something incredible — this feels like a real product launch experience";

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message + " " + url)}`,
      "_blank"
    );
  };

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

          {/* Stage 4 — Sharing loop Viral CTA */}
          {showSurprise && (
            <Section>
              <motion.div {...motionSystem.fadeUp} className="text-center py-24">
                <h2 className="text-3xl text-white mb-4">
                  Share this experience
                </h2>

                <p className="text-white/50 mb-6">
                  Let others feel it too.
                </p>

                <button onClick={shareProduct} className="btn">
                  Share via WhatsApp 📱
                </button>
              </motion.div>
            </Section>
          )}
        </PageTransition>
      )}
    </main>
  );
}

export default App;