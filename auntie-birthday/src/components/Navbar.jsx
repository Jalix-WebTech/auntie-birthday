import { useEffect, useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState("hero");

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "memories", "surprise"];

      for (let id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="text-white font-bold tracking-wide">
          🎂 Birthday
        </div>

        <div className="flex gap-6 text-sm">

          <button
            onClick={() => scrollTo("hero")}
            className={`transition ${
              active === "hero" ? "text-pink-400" : "text-white/70"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => scrollTo("memories")}
            className={`transition ${
              active === "memories" ? "text-pink-400" : "text-white/70"
            }`}
          >
            Memories
          </button>

          <button
            onClick={() => scrollTo("surprise")}
            className={`transition ${
              active === "surprise" ? "text-pink-400" : "text-white/70"
            }`}
          >
            Surprise
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;