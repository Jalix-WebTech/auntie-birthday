import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CinematicIntro = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish?.();
    }, 9000); // ⬅️ increased time (9 seconds for reading)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }} // ⬅️ slower fade-out
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 2 }} // ⬅️ smoother animation
            className="text-center px-6"
          >
            <h1 className="text-white text-3xl md:text-5xl heading-font tracking-widest">
              A Special Story
            </h1>

            <p className="text-white/70 mt-6 text-base md:text-lg max-w-md mx-auto">
              A heartfelt cinematic moment created to honor your life, your kindness, and the love you bring to everyone around you.
            </p>

            <p className="text-white/50 mt-4 text-sm md:text-base max-w-md mx-auto">
              Every detail here is made to feel like a memory unfolding — soft, warm, and deeply personal.
            </p>

            <p className="text-white/60 mt-6 font-medium">
              Loading memories...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;