import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed inset-0 bg-black z-[999] flex items-center justify-center"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="heading-font text-4xl md:text-6xl text-white"
      >
        A Special Birthday Experience 🎬
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
