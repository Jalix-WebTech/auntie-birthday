import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LaunchIntro = ({ onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 12000); // ⬅️ increased to 12 seconds for reading comfort

    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }} // ⬅️ slower cinematic fade-out
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2 }}
            className="text-center max-w-2xl mx-auto px-6"
          >
            {/* Line 1 */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }} // ⬅️ slower start
              className="text-3xl md:text-4xl text-white font-semibold"
            >
              A Celebration of You ❤️
            </motion.h2>

            {/* Line 2 */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2.5 }} // ⬅️ more spacing
              className="mt-6 text-white/70 text-lg leading-relaxed"
            >
              A heartfelt cinematic moment created to honor your life, your kindness,
              and the love you bring to everyone around you.
            </motion.p>

            {/* Line 3 */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.5 }} // ⬅️ slower reveal
              className="mt-6 text-white/60 text-base"
            >
              Every detail here is made to feel like a memory unfolding — soft, warm,
              and deeply personal.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 7 }} // ⬅️ last thing to appear
              className="mt-10 flex gap-4 justify-center"
            >
              <button className="px-6 py-3 rounded-full bg-pink-500 text-white hover:bg-pink-400 transition">
                Open Your Surprise 🎁
              </button>

              <button className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition">
                Share the Love 📱
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaunchIntro;