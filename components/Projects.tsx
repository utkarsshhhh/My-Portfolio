import React from 'react';
import type { Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projectsData: Project[] = [
  {
    image: 'https://res.cloudinary.com/dtppzubgz/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1758453646/Screenshot_2025-09-21_at_4.48.57_PM_sbr5io.png',
    title: 'Brain Space',
    description: 'A digital mind-mapping tool designed to help users organize their thoughts and ideas in an intuitive and collaborative workspace.',
    link: 'https://brain-space-lilac.vercel.app/',
  },
  {
    image: 'https://res.cloudinary.com/dtppzubgz/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1758453652/Screenshot_2025-09-21_at_4.50.08_PM_mpfl2p.png',
    title: 'Lazarev.',
    description: 'A faithful recreation of the Lazarev. agency website, focusing on smooth scrolling animations, video integration, and a clean, professional layout.',
    link: 'https://lazarev-sage.vercel.app/',
  },
  {
    image: 'https://image.thum.io/get/width/800/crop/600/https://hotel-odisej.vercel.app/',
    title: 'Hotel Odisej',
    description: 'An elegant and immersive website for a luxury hotel, featuring beautiful imagery, a seamless booking interface, and an emphasis on user experience.',
    link: 'https://hotel-odisej.vercel.app/',
  },
  {
    image: 'https://image.thum.io/get/width/800/crop/600/https://join-ames-foundation.netlify.app/',
    title: 'Ames Foundation',
    description: 'A modern and informative website for a foundation, designed to clearly communicate its mission and impact through compelling visuals and storytelling.',
    link: 'https://join-ames-foundation.netlify.app/',
  },
  {
    image: 'https://image.thum.io/get/width/800/crop/600/https://sidcup-familyolf.netlify.app/',
    title: 'Sidcup Family Golf',
    description: 'An engaging website for a family golf center, featuring interactive elements, course information, and an easy-to-navigate design for all ages.',
    link: 'https://sidcup-familyolf.netlify.app/',
  },
  {
    image: 'https://image.thum.io/get/width/800/crop/600/https://miranda-six.vercel.app/',
    title: 'Miranda Artist Portfolio',
    description: 'A minimalist and artistic portfolio website for a creative professional, highlighting their work through a clean layout and subtle animations.',
    link: 'https://miranda-six.vercel.app/',
  },
  {
    image: 'https://res.cloudinary.com/dtppzubgz/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1758452792/Screenshot_2025-09-21_at_4.31.12_PM_gw8bik.png',
    title: 'Lagunitas Wine Shop',
    description: 'A sophisticated e-commerce site for a wine shop, featuring a clean design, product filtering, and a seamless checkout experience.',
    link: 'https://lagunitas-wine-shop.netlify.app/',
  },
  {
    image: 'https://res.cloudinary.com/dtppzubgz/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1758453079/Screenshot_2025-09-21_at_4.40.19_PM_hpthpn.png',
    title: 'Obys Agency',
    description: 'A visually-driven clone of the Obys Agency website, focusing on complex animations, bold typography, and a modern, interactive user experience.',
    link: 'https://obys-agency-inky.vercel.app/',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
    const isEven = index % 2 === 0;

    const scrollTransition = "transition-[opacity,transform] duration-700 ease-out";
    const hoverTransition = "transition-[background-color,color,box-shadow] duration-300";

    return (
        <div ref={ref} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-32 transition-transform duration-300 ease-out hover:-translate-y-2">
            {/* Image Column */}
            <div className={`relative rounded-lg overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'} ${scrollTransition} ${
                isVisible 
                ? 'opacity-100 translate-y-0 rotate-0' 
                : 'opacity-0 translate-y-4 -rotate-2'
            }`}>
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-[#D8ECF8]/20 to-blue-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                    loading="lazy"
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg glowing-shadow-sm w-full h-auto object-cover aspect-[4/3] relative z-10 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:glowing-shadow"
                />
            </div>
            {/* Text Column */}
            <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className={`text-3xl font-bold mb-4 ${scrollTransition} delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    {project.title}
                </h3>
                <p className={`text-gray-300 leading-relaxed mb-6 ${scrollTransition} delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    {project.description}
                </p>
                <a 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block bg-transparent border-2 border-[#D8ECF8] text-[#D8ECF8] font-bold py-3 px-6 rounded-lg glowing-btn-hover hover:bg-[#D8ECF8] hover:text-[#05060f] ${hoverTransition} ${scrollTransition} delay-[400ms] ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    View Project
                </a>
            </div>
        </div>
    );
};


const Projects: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="py-24 sm:py-32 container mx-auto px-6">
      <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        My Projects
      </h2>
      <div>
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;