import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import MiniGallery from './components/MiniGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#05060f] text-[#D8ECF8] font-sans relative">
      <div className="light-spot" style={{ top: '10%', left: '15%' }}></div>
      <div className="light-spot" style={{ top: '50%', right: '10%' }}></div>
      <div className="light-spot" style={{ top: '80%', left: '5%' }}></div>
      
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <MiniGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;