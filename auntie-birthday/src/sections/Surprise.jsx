import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Surprise = () => {
  const [opened, setOpened] = useState(false);

  return (
   <section id="surprise" className="py-24 px-6 bg-slate-950 flex items-center justify-center">

      <div className="text-center max-w-3xl">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="heading-font text-4xl md:text-6xl mb-6"
        >
          A Special Surprise 🎁
        </motion.h2>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setOpened(true);

            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
            });
          }}
          className="px-10 py-4 rounded-full bg-pink-500 hover:bg-pink-400 transition text-white text-lg shadow-2xl"
        >
          Open Your Surprise
        </motion.button>

        {/* Surprise Modal */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6"
            >

              {/* Card */}
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl max-w-lg text-center text-white"
              >

                <h3 className="text-3xl font-bold mb-4">
                  Happy Birthday Auntie ❤️
                </h3>

                <p className="text-slate-200 leading-relaxed mb-6">
                  You are the heart of our family, the source of our strength,
                  and the reason so many smiles exist today.
                  We love you deeply and celebrate you always.
                </p>

                <button
                  onClick={() => setOpened(false)}
                  className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
                >
                  Close
                </button>

              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
};

export default Surprise;