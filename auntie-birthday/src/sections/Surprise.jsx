import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motionPreset } from "../motionConfig";
import confetti from "canvas-confetti";

const Surprise = () => {
  const [opened, setOpened] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  return (
   <section id="surprise" className="py-24 px-6 bg-slate-950 flex items-center justify-center">

      <div className="text-center max-w-3xl">

        {/* Title */}
        <motion.h2
          {...motionPreset.fadeUp}
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setUnlocked(true)}
          className="mt-6 px-6 py-3 bg-pink-500 rounded-full text-white hover:bg-pink-400 transition"
        >
          Unlock Secret Message 💌
        </motion.button>

        {unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20"
          >
            <p className="text-lg text-white leading-relaxed">
              💖 "Auntie, this project was built with love, gratitude, and every
              memory we cherish with you. You are truly special to all of us."
            </p>
          </motion.div>
        )}

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
                className="card max-w-lg text-center text-white"
              >

                <h3 className="text-3xl font-bold mb-4">
                  Happy Birthday Auntie ❤️
                </h3>

                <p className="text-slate-200 leading-relaxed mb-6">
Dear Auntie,

On your special day, I thank God for your life and for the beautiful impact you have on everyone around you.

I pray that God continues to bless you richly with good health, long life, peace of heart, and joy that never runs dry. May every new day bring you strength, favor, and reasons to smile deeply.

You are the heart of our family — the one who loves without limits, gives without asking, and cares in ways that cannot be fully repaid. Your presence is a gift we never take for granted.

I pray that happiness surrounds you always, that you are protected in every step you take, and that your life continues to shine with grace and purpose.

We love you deeply, and today we celebrate not just your birthday, but the blessing that you are to all of us.

Happy Birthday, Auntie ❤️
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