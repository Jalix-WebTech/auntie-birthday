import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CinematicIntro = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-white text-3xl md:text-5xl heading-font tracking-widest">
              A Special Story
            </h1>
            <p className="text-white/60 mt-4">Loading memories...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
