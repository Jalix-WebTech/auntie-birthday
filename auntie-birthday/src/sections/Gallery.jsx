import { motion } from "framer-motion";
import { motionPreset } from "../motionConfig";
import img1 from "../assets/sr1.jpg";
import img2 from "../assets/sr2.jpg";
import img3 from "../assets/sr3.jpg";
import img4 from "../assets/sr4.jpg";
import img5 from "../assets/sr5.jpg";
import img6 from "../assets/sr6.jpg";

const Gallery = () => {
  const memories = [
    {
      img: img1,
      text: "Always smiling, always caring ❤️",
    },
    {
      img: img2,
      text: "A heart full of love, a smile full of light 🌸",
    },
    {
      img: img3,
      text: "Her smile heals, her heart loves 💐",
    },
    {
      img: img4,
      text: "Constantly caring, endlessly smiling 😊",
    },
    {
      img: img5,
      text: "Smiling through life, loving through all 🌼",
    },
    {
      img: img6,
      text: "Pure heart, beautiful smile 🌹",
    },
  ];

  return (
  <section id="memories" className="py-20 px-6 bg-slate-950">

      {/* Title */}
      <motion.h2
        {...motionPreset.fadeUp}
        className="heading-font text-4xl md:text-6xl text-center mb-12"
      >
        Beautiful Memories
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {memories.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="card relative group overflow-hidden shadow-2xl"
          >

            {/* Image */}
            <img
              src={item.img}
              alt="memory"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />

            {/* Text */}
            <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-medium">
              {item.text}
            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default Gallery;