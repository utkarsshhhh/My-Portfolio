import React, { useState, useEffect } from 'react';
import type { Testimonial } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonialsData: Testimonial[] = [
  {
    image: 'https://picsum.photos/id/1005/100/100',
    name: 'Jane Doe',
    title: 'CEO, Innovate Inc.',
    review: 'Utkarsh delivered an exceptional product. His attention to detail and creative vision are unparalleled. A true professional.',
  },
  {
    image: 'https://picsum.photos/id/1011/100/100',
    name: 'John Smith',
    title: 'Founder, Tech Solutions',
    review: 'Working with Utkarsh was a game-changer for our project. The final result exceeded all our expectations.',
  },
  {
    image: 'https://picsum.photos/id/1027/100/100',
    name: 'Emily White',
    title: 'Creative Director, Design Hub',
    review: 'His ability to bring complex 3D ideas to life on the web is simply astounding. Highly recommended for any futuristic project.',
  },
  {
    image: 'https://picsum.photos/id/1040/100/100',
    name: 'Michael Brown',
    title: 'Project Manager, Future Systems',
    review: 'Utkarsh is not just a developer, but a visionary. The immersive experience he created for us has received incredible feedback.',
  },
];

const Testimonials: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
      }, 5000); // Change testimonial every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="testimonials" ref={ref} className="py-24 sm:py-32 bg-gray-100/50 dark:bg-[#05060f]/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-4xl sm:text-5xl font-bold mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          What Clients Say
        </h2>
        <div className="relative h-72">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-all duration-700 ease-in-out
                ${index === activeIndex ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 z-0'}
                ${index > activeIndex ? 'translate-x-full' : ''}
                ${index < activeIndex ? '-translate-x-full' : ''}
              `}
            >
              <div className="max-w-3xl bg-white dark:bg-black/20 p-8 rounded-2xl border border-gray-200 dark:border-white/10 glowing-shadow-sm transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 hover:glowing-shadow">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-500/50 dark:border-[#D8ECF8]/50"
                />
                <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">"{testimonial.review}"</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
            {testimonialsData.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-slate-800 dark:bg-[#D8ECF8] scale-125' : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                ></button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
