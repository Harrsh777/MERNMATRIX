
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  // We'll set the background on the container, so this remains transparent.
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  // The core of the new interactive "wow" effect is here
  interactivity: {
    events: {
      // Enables the gravity point on cursor hover
      onHover: {
        enable: true,
        mode: "grab", 
      },
      // THIS IS THE CORRECTED PART
      resize: {
        enable: true,
      },
    },
    modes: {
      // Configures the "grab" effect
      grab: {
        distance: 200,
        links: {
          opacity: 0.5,
          color: "#ffffff"
        }
      },
    },
  },
  particles: {
    // Defines the beautiful cyan-to-magenta gradient for particles
    color: {
      value: ["#00FFFF", "#FF00FF"], // Cyan and Magenta
    },
    // The links create the constellation effect, now subtler
    links: {
      color: "random", // Links will take on the color of their connected particles
      distance: 120,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    // The heart of the "nebula" movement
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true, // Movement is more chaotic and natural
      speed: 0.8,    // A slow, majestic drift
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 120, // More particles for a denser, richer field
    },
    opacity: {
      value: { min: 0.1, max: 0.5 }, // Particles fade in and out, creating depth
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 }, // Varying sizes for a more natural look
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
  },
  detectRetina: true,
};