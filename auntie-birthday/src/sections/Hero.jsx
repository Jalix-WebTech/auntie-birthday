import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import { motionPreset } from "../motionConfig";
import confetti from "canvas-confetti";
import heroBg from "../assets/hero-bg.jpg";

const generateParticles = () =>
  Array.from({ length: 10 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

const Hero = () => {
  const particles = useMemo(() => generateParticles(), []);

  const audioRef = useRef(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [cinematic, setCinematic] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);

  // Show sound prompt after load and reveal cinematic content later
  useEffect(() => {
    const t1 = setTimeout(() => {
      setShowPrompt(true);
    }, 1200);

    const t2 = setTimeout(() => {
      setCinematic(true);
    }, 2500);

    const t3 = setTimeout(() => {
      setShowUnlock(true);
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Confetti on first visit
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  // Enable sound + cinematic experience
  const enableSound = async () => {
    try {
      await audioRef.current.play();

      setSoundEnabled(true);
      setShowPrompt(false);
      setCinematic(true);

      // 🎉 Confetti
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.log("Audio blocked:", err);
    }
  };

  const shareGlobal = () => {
    const url = window.location.href;

    const message =
      "🎬 You need to see this — it's a cinematic digital experience built like a real product launch.";

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message + " " + url)}`,
      "_blank"
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black cinematic-enter"
    >
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-black to-black" />
      <div className="absolute inset-0 bg-black/60" />
      {/* BACKGROUND IMAGE */}
      <img
        src={heroBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* BLUR DEPTH LAYERS */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

      {/* CINEMATIC DARK OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* BACKGROUND DEPTH OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

      {/* VIGNETTE (focus center) */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_180px_rgba(0,0,0,0.9)]" />

      {/* CINEMATIC SPOTLIGHT GLOW */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-pink-500/20 blur-[120px] rounded-full" />
      </div>

      {/* FLOATING AMBIENT MOTION */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-60 h-60 bg-pink-500/10 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/10 blur-3xl rounded-full"
      />

      {/* PARTICLES */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        {...motionPreset.fadeUp}
        className="relative z-20 text-center max-w-4xl px-6 animate-fadeIn"
        style={{
          filter: soundEnabled ? "brightness(1.2) contrast(1.1)" : "none",
        }}
      >
        {/* Subtitle */}
        <p className="uppercase tracking-[6px] text-pink-300 mb-5 text-sm md:text-base">
          A Special Celebration
        </p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="heading-font text-5xl md:text-7xl text-white text-center"
        >
          A Global-Grade Memory Experience
        </motion.h1>

        {/* Description */}
        <p className="text-white/60 mt-6 text-center max-w-2xl mx-auto">
          A beautifully engineered cinematic experience designed to turn memories into interactive moments.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              document
                .getElementById("surprise")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn"
          >
            Open Experience
          </button>

          <button
            onClick={shareGlobal}
            className="glass px-6 py-3 text-white hover:scale-105 transition"
          >
            Share Experience 📱
          </button>
        </div>

        {showUnlock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass mt-8 mx-auto max-w-2xl px-6 py-5 text-white"
          >
            <p className="text-lg md:text-xl">
              This moment is crafted to feel like a keynote reveal — soft, emotional, and unforgettable.
            </p>
          </motion.div>
        )}

        {/* VOICE MESSAGE */}
        {cinematic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="glass p-6 rounded-xl border border-white/20">
              <p className="text-lg italic text-white">
                🎤 "Happy Birthday Auntie ❤️... you are deeply loved..."
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 text-white/70 z-20 animate-bounce">
        Scroll ↓
      </div>

      {/* MUSIC TOGGLE */}
      <button
        onClick={async () => {
          if (!audioRef.current) return;

          if (soundEnabled) {
            audioRef.current.pause();
            setSoundEnabled(false);
          } else {
            await audioRef.current.play();
            setSoundEnabled(true);
          }
        }}
        className="fixed bottom-5 right-5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white z-50"
      >
        {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
      </button>

      {/* SOUND MODAL */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl text-center text-white max-w-sm">
            <h2 className="text-2xl font-bold mb-3">
              🎵 Enable Sound Experience
            </h2>

            <p className="text-sm text-white/70 mb-6">
              For the best birthday experience, please enable sound.
            </p>

            <button
              onClick={enableSound}
              className="px-6 py-3 bg-pink-500 rounded-full hover:bg-pink-400 transition"
            >
              Enable Sound 🔊
            </button>
          </div>
        </div>
      )}

      {/* AUDIO */}
      <audio ref={audioRef} src="/music.mp3" loop />
    </section>
  );
};

export default Hero;