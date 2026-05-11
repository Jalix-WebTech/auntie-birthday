import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LaunchIntro = ({ onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 2200);

    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-white text-4xl md:text-6xl heading-font">
              A Special Experience
            </h1>
            <p className="text-white/50 mt-4 tracking-wide">
              Crafted with love & attention to detail
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaunchIntro;
