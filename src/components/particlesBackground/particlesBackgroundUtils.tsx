import {
  Container,
  Engine,
  ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Função para inicializar o motor de partículas
export const initializeParticlesEngine = async (
  engine: Engine
): Promise<void> => {
  await loadSlim(engine);
};

// Configuração das partículas
export const particlesOptions: ISourceOptions = {
  background: {
    color: { value: "#FAFAFA" },
  },
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: { enable: false, mode: "push" },
      onHover: { enable: false, mode: "grab" },
      resize: { enable: true, delay: 0.5 },
    },
    modes: {
      push: { quantity: 10 },
      grab: { distance: 100, links: { opacity: 1 } },
      repulse: {
        distance: 200,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 50,
        easing: "ease-out-quad",
      },
    },
  },
  particles: {
    color: { value: "#000000" },
    links: {
      color: "#000000",
      distance: 100,
      enable: false,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: { default: OutMode.out },
      random: false,
      speed: 0.3,
      straight: false,
    },
    number: {
      density: { enable: false, width: 1920, height: 1080 },
      value: 70,
    },
    opacity: {
      value: { min: 0.1, max: 1 },
      animation: {
        count: 0,
        enable: false,
        speed: 2,
        decay: 0,
        delay: 0,
        sync: false,
        mode: "auto",
        startValue: "random",
        destroy: "none",
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 2 },
      animation: {
        count: 0,
        enable: false,
        speed: 5,
        decay: 0,
        delay: 0,
        sync: false,
        mode: "auto",
        startValue: "random",
        destroy: "none",
      },
    },
  },
  detectRetina: true,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};

// Função para lidar com partículas carregadas
export const handleParticlesLoaded = async (
  container?: Container
): Promise<void> => {
  console.log(container);
};
