
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skills = [
  { name: 'Full Stack', icon: 'ph-stack-simple' },
  { name: 'ReactJs', icon: 'ph-atom' },
  { name: 'JavaScript', icon: 'ph-file-js' },
  { name: 'Tailwind CSS', icon: 'ph-wind' },
  { name: 'Animations', icon: 'ph-magic-wand' },
  { name: 'C Language', icon: 'ph-file-code' },
  { name: 'Java', icon: 'ph-coffee' },
  { name: 'And More...', icon: 'ph-dots-three-outline' },
];

const About: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className={`md:col-span-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D8ECF8]/50 to-blue-500/50 rounded-full blur-xl opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dtppzubgz/image/upload/w_448,f_auto,q_auto/v1758267361/IMG_1068_iwy0vu.jpg"
              alt="Utkarsh Adlak"
              className="relative w-full max-w-sm mx-auto rounded-full glowing-shadow transition-transform duration-500 group-hover:-translate-y-2"
            />
          </div>
        </div>
        <div className={`md:col-span-7 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            “I believe technology is a tool to solve problems and create change. I’m Utkarsh Adlak, a fresher web developer dedicated to learning and contributing innovative solutions. My focus is on building scalable, modern applications while continuously improving my skills and pushing boundaries.”
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <h3 className="text-xl font-semibold mr-4">Skills:</h3>
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className={`flex flex-col items-center gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-4 -rotate-6'}`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <i className={`ph-bold ${skill.icon} text-4xl text-[#D8ECF8] transition-colors hover:text-white`}></i>
                <span className="text-xs text-gray-400">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;