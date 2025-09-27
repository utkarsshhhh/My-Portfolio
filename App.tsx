import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import MiniGallery from './components/MiniGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = `rgba(216, 236, 248, ${Math.random() * 0.5 + 0.2})`;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 10; // Parallax depth
      }

      update() {
        if (!canvas) return;
        let dx = mouse.x - canvas.width / 2;
        let dy = mouse.y - canvas.height / 2;
        
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        this.x = this.baseX - dx / this.density;
        this.y = this.baseY - dy / this.density;

        if (this.baseX > canvas.width + this.size*5 || this.baseX < -this.size*5 || this.baseY > canvas.height + this.size*5 || this.baseY < -this.size*5) {
            this.baseX = Math.random() * canvas.width;
            this.baseY = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawSphere = () => {
        if (!ctx || !canvas) return;
        let dx = mouse.x - canvas.width / 2;
        let dy = mouse.y - canvas.height / 2;
        const sphereX = canvas.width / 2 - dx / 40;
        const sphereY = canvas.height / 2 - dy / 40;
        const sphereRadius = Math.min(canvas.width, canvas.height) / 7;
        const gradient = ctx.createRadialGradient(sphereX, sphereY, sphereRadius * 0.2, sphereX, sphereY, sphereRadius);
        gradient.addColorStop(0, 'rgba(216, 236, 248, 0.15)');
        gradient.addColorStop(0.5, 'rgba(216, 236, 248, 0.05)');
        gradient.addColorStop(1, 'rgba(5, 6, 15, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(sphereX, sphereY, sphereRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    const connectParticles = () => {
        if (!ctx) return;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
                if (distance < 120) {
                    const opacity = 1 - distance / 120;
                    ctx.strokeStyle = `rgba(216, 236, 248, ${opacity * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSphere();
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className="text-[#D8ECF8] font-sans relative">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full bg-[#05060f]" />
      
      <div className="light-spot" style={{ top: '10%', left: '15%' }}></div>
      <div className="light-spot" style={{ top: '50%', right: '10%' }}></div>
      <div className="light-spot" style={{ top: '80%', left: '5%' }}></div>
      
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <MiniGallery />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default App;