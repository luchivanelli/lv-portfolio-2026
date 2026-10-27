import SceneScrollBridge from "./components/motion/SceneScrollBridge";
import SceneLoader from "./components/scene/SceneLoader";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Stack from "./components/sections/Stack";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";

// Server Component: every section renders real HTML; only the canvas is client-only.
export default function Home() {
  return (
    <>
      <SceneLoader />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
      <SceneScrollBridge />
    </>
  );
}
