import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Navbar    from './components/layout/Navbar';
import Hero      from './components/sections/Hero';
import About     from './components/sections/About';
import Projects  from './components/sections/Projects';
import Skills    from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact   from './components/sections/Contact';

export default function App() {
  return (
    <>
      {/* Global decorative background */}
      <div className="grid-bg" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
