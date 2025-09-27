import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen w-full flex items-center justify-center relative bg-transparent">
      <div className="relative z-10 text-center text-white p-6 pointer-events-none">
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest animate-fade-in-up"
          style={{ textShadow: '0 0 15px rgba(216, 236, 248, 0.5), 0 0 30px rgba(216, 236, 248, 0.3)' }}
        >
          Utkarsh Adlak
        </h1>
        <p 
          className="text-lg md:text-xl lg:text-2xl mt-4 font-light uppercase tracking-widest animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Clarity | Focus | Impact
        </p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
      `}</style>
    </section>
  );
};

export default Hero;