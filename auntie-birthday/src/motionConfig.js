export const motionPreset = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    style: { willChange: "transform, opacity" }
  },

  fadeScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1 },
    style: { willChange: "transform, opacity" }
  }
};
