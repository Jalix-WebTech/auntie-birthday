import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Gallery from "./sections/Gallery";
import Surprise from "./sections/Surprise";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black">
      {loading && <Loader />}

      {!loading && (
        <>
          <Navbar />
          <Hero />
          <Gallery />
          <Surprise />
        </>
      )}
    </main>
  );
}

export default App;