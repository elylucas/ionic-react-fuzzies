import React, { useEffect, useRef } from 'react';
import FireworksCanvas from 'fireworks-canvas';

interface FireworksProps {}

export const Fireworks: React.FC<FireworksProps> = () => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      const options = {
        maxRockets: 215,
        rocketSpawnInterval: 150,
        numParticles: 150,
        explosionMinHeight: 0.5,
        explosionMaxHeight: 1,
        explosionChance: 0.1
      };
      const fireworks = new FireworksCanvas(container.current!, options);
      fireworks.start();
      const audio = new Audio('/assets/fireworks.mp3');
      audio.play();
      setTimeout(() => audio.pause(), 5000);
    }
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: 'black',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.9
        }}
        ref={container}
      />
    </>
  );
};
