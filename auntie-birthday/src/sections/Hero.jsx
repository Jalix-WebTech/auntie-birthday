import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import heroBg from "../assets/hero-bg.jpg";

const generateParticles = () =>
  Array.from({ length: 20 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

const Hero = () => {
  const particles = useMemo(() => generateParticles(), []);

  const audioRef = useRef(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [cinematic, setCinematic] = useState(false);

  // Show sound prompt after load and reveal cinematic content later
  useEffect(() => {
    const t1 = setTimeout(() => {
      setShowPrompt(true);
    }, 1200);

    const t2 = setTimeout(() => {
      setCinematic(true);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center justify-center cinematic-enter"
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={heroBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
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
        <h1 className="heading-font text-5xl md:text-8xl font-bold leading-tight text-white drop-shadow-2xl">
          Happy Birthday <br />
          <span className="text-pink-400 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]">
            Auntie ❤️
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto mt-8 text-slate-200 text-base md:text-2xl leading-relaxed">
          Today we celebrate the incredible woman whose kindness, wisdom, and love
          brighten every life around her.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              document
                .getElementById("surprise")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-full bg-pink-500 hover:bg-pink-400 transition text-white text-lg shadow-xl"
          >
            Open Surprise
          </button>

          <button
            onClick={() =>
              document
                .getElementById("memories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition text-lg"
          >
            View Memories
          </button>
        </div>

        {/* VOICE MESSAGE */}
        {cinematic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
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