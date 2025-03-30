"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  initializeParticlesEngine,
  particlesOptions,
  handleParticlesLoaded,
} from "./particlesBackgroundUtils";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await initializeParticlesEngine(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return init ? (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      particlesLoaded={handleParticlesLoaded}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        zIndex: -1,
      }}
    />
  ) : (
    <></>
  );
};

export default ParticlesBackground;
