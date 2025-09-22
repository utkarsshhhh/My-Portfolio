import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen w-full flex items-center justify-center relative bg-[#05060f]">
      {/* 
        This container is used to hide the "Build with Spline" watermark.
        By setting overflow to hidden and making the iframe larger than the container,
        we can clip the edges of the iframe where the watermark is located.
      */}
       <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe 
            src='https://my.spline.design/thresholddarkambientuicopy-ZoSBFAEssQKoX80XdmbUtaAm/' 
            frameBorder='0' 
            className="absolute"
            style={{ 
              // Enlarge the iframe to push the watermark out of view.
              // The watermark is in the bottom-right corner. These values are
              // calculated to be large enough to hide it completely.
              width: 'calc(100% + 240px)', 
              height: 'calc(100% + 100px)',
              // Reposition the iframe to keep the 3D content centered.
              top: '-50px',
              left: '-120px'
            }}
            title="Interactive Spline 3D Model"
        ></iframe>
      </div>
    </section>
  );
};

export default Hero;