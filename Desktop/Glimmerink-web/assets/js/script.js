/**
 * GLIMMERINK QUANTUM CORE SYSTEM
 * Preserves all original functionality while optimizing:
 * - Particle systems
 * - Theme toggling
 * - Scroll effects
 * - Animations
 */

// ===== QUANTUM STATE MANAGER =====
class QuantumState {
  constructor() {
    this.observers = [];
    this.theme = localStorage.getItem("quantumTheme") || "dark";
    this.isAnimating = false;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("quantumTheme", this.theme);
    this.observers.forEach((obs) => obs(this.theme));
  }
}

// ===== CORE INITIALIZATION =====
const quantum = new QuantumState();
const DOM = {
  // Core Elements
  loader: document.getElementById("quantum-loader"),
  nav: document.querySelector(".neo-nav"),
  realityToggle: document.querySelector(".reality-toggle"),
  quantumGrid: document.querySelector(".quantum-grid"),

  // Dynamic Elements
  footerYear: document.querySelector(".copyright"),
  cosmicParticles: document.querySelector(".cosmic-particles"),
};

// ===== PARTICLE SYSTEMS =====
class ParticleEngine {
  constructor() {
    this.particles = [];
    this.initMouseParticles();
    this.initCosmicParticles();
    this.initBinaryStreams();
  }

  // Mouse Trail Particles
  initMouseParticles() {
    let lastTime = 0;
    document.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastTime > 100) {
        this.createParticle(e.clientX, e.clientY);
        lastTime = now;
      }
    });
  }

  createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "quantum-particle";
    Object.assign(particle.style, {
      left: `${x}px`,
      top: `${y}px`,
      "--dx": Math.random() * 2 - 1,
      "--dy": Math.random() * 2 - 1,
    });
    document.body.appendChild(particle);

    particle.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.2)" },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => particle.remove();
  }

  // Footer Cosmic Particles
  initCosmicParticles() {
    if (!DOM.cosmicParticles) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      Object.assign(particle.style, {
        "--x": `${Math.random() * 100}%`,
        "--y": `${Math.random() * 100}%`,
        "--d": `${1.5 + Math.random()}s`,
      });
      DOM.cosmicParticles.appendChild(particle);
    }
  }

  // Binary Stream Effects
  initBinaryStreams() {
    document.querySelectorAll(".binary-stream").forEach((stream) => {
      const binaryChars = ["0", "1", "░", "▒", "▓"];
      let interval = setInterval(() => {
        stream.style.animationDuration = `${Math.random() * 300 + 100}ms`;
      }, 2000);

      stream.addEventListener("mouseleave", () => {
        clearInterval(interval);
      });
    });
  }
}

// ===== TEMPORAL SYSTEMS =====
const TemporalEngine = {
  initLoader() {
    window.addEventListener("load", () => {
      DOM.loader.style.opacity = "0";
      setTimeout(() => {
        DOM.loader.style.display = "none";
      }, 500);
    });
  },

  initTimeDisplays() {
    const year = new Date().getFullYear();
    if (DOM.footerYear) DOM.footerYear.textContent = year;
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = year;
    });
  },
};

// ===== REALITY CONTROLS =====
const RealityInterface = {
  initTheme() {
    quantum.subscribe((theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      DOM.nav.style.backgroundColor =
        theme === "dark"
          ? "rgba(26, 26, 46, 0.95)"
          : "rgba(240, 240, 255, 0.95)";
    });

    DOM.realityToggle.addEventListener("click", () => quantum.toggleTheme());
    document.documentElement.setAttribute("data-theme", quantum.theme);
  },

  initWormholes() {
    document.querySelectorAll(".wormhole-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  },
};

// ===== QUANTUM GRID INTERACTIONS =====
const GridDynamics = {
  init() {
    if (!DOM.quantumGrid) return;

    DOM.quantumGrid.addEventListener("mousemove", (e) => {
      const item = e.target.closest(".grid-item");
      if (item && !quantum.isAnimating) this.animateItem(item, e);
    });

    DOM.quantumGrid.addEventListener("mouseleave", () => {
      DOM.quantumGrid.querySelectorAll(".grid-item").forEach((item) => {
        item.style.transform = "none";
      });
    });
  },

  animateItem(item, event) {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    item.style.transform = `
      perspective(1000px)
      rotateX(${(y - rect.height / 2) / 10}deg)
      rotateY(${-(x - rect.width / 2) / 10}deg)
    `;
  },
};

// ===== QUANTUM COMMUNICATION =====
const QuantumComm = {
  initForms() {
    document
      .querySelector(".quantum-form")
      ?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');

        try {
          submitBtn.disabled = true;
          await new Promise((resolve) => setTimeout(resolve, 1500));
          submitBtn.textContent = "Transmission Successful!";
          e.target.reset();
        } catch {
          submitBtn.textContent = "Quantum Interference Detected!";
        } finally {
          setTimeout(() => {
            submitBtn.textContent = "Send Transmission";
            submitBtn.disabled = false;
          }, 3000);
        }
      });

    document
      .querySelector(".reality-bridge")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const confirmation = document.querySelector(".quantum-confirmation");
        this.style.opacity = "0";
        setTimeout(() => {
          this.style.display = "none";
          confirmation.style.display = "grid";
          setTimeout(() => (confirmation.style.opacity = "1"), 50);
        }, 500);
      });
  },
};

// ===== HOLOGRAPHIC INTERACTIONS =====
const HolographicUI = {
  initAvatars() {
    document.querySelectorAll(".holographic-avatar").forEach((avatar) => {
      let isDragging = false;
      let startX,
        startY,
        rotateX = 0,
        rotateY = 0;

      avatar.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        rotateY = deltaX * 0.5;
        rotateX = -deltaY * 0.5;
        avatar.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        avatar.style.transform = "rotateX(0) rotateY(0)";
      });
    });
  },

  initRealityFilters() {
    const filters = document.querySelectorAll(".quantum-filter");
    const testimonials = document.querySelectorAll(".quantum-testimonial");

    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        filters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");

        const reality = filter.dataset.reality;
        testimonials.forEach((t) => {
          t.style.display =
            reality === "all" || t.dataset.reality === reality
              ? "block"
              : "none";
        });
      });
    });
  },
};

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Core Systems
  TemporalEngine.initLoader();
  TemporalEngine.initTimeDisplays();
  RealityInterface.initTheme();
  RealityInterface.initWormholes();
  QuantumComm.initForms();

  // Interactive Elements
  new ParticleEngine();
  GridDynamics.init();
  HolographicUI.initAvatars();
  HolographicUI.initRealityFilters();

  // Error Handling
  window.addEventListener("error", (e) => {
    console.error(`Quantum Fluctuation Detected: ${e.message}`);
    return true;
  });
});

// ===== SCROLL EFFECTS =====
window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  if (footer) {
    footer.classList.add("scroll-glow");
    clearTimeout(window.__glowTimeout);
    window.__glowTimeout = setTimeout(() => {
      footer.classList.remove("scroll-glow");
    }, 300);
  }
});

// ===== DYNAMIC STYLE INJECTION =====
const quantumStyles = document.createElement("style");
quantumStyles.textContent = `
  .scroll-glow {
    box-shadow: 0 0 20px 5px rgba(0, 255, 255, 0.3);
    transition: box-shadow 0.3s ease-out;
  }
  
  @keyframes rippleFade {
    from { opacity: 1; transform: scale(0.9); }
    to { opacity: 0; transform: scale(1.2); }
  }
  
  .active-wormhole {
    color: cyan !important;
    font-weight: bold;
    text-shadow: 0 0 10px cyan;
  }
`;
document.head.appendChild(quantumStyles);
// ===== QUANTUM THEME CONTROLLER =====
class QuantumTheme {
  constructor() {
    this.theme = localStorage.getItem("quantumTheme") || "dark";
    this.init();
  }

  init() {
    document.documentElement.setAttribute("data-theme", this.theme);
    this.applyImageFilters();
  }

  toggle() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("quantumTheme", this.theme);
    document.documentElement.setAttribute("data-theme", this.theme);
    this.applyImageFilters();
  }

  applyImageFilters() {
    // Fix testimonial images while maintaining theme
    document.querySelectorAll(".quantum-avatar img").forEach((img) => {
      img.style.filter =
        this.theme === "dark" ? "none" : "brightness(1.05) contrast(1.1)";
    });
  }
}

// Initialize
const quantumTheme = new QuantumTheme();
document
  .querySelector(".reality-toggle")
  .addEventListener("click", () => quantumTheme.toggle());

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setActiveLink();

  // Update on navigation
  window.addEventListener("hashchange", setActiveLink);

  // For smooth scroll links
  document.querySelectorAll(".wormhole-link").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(setActiveLink, 100); // Delay for smooth scroll
    });
  });
});
// Add to quantum-core.js
document.querySelectorAll(".swatch").forEach((swatch) => {
  const colors = ["#6791dd", "#42e6a4", "#9d4edd", "#ff6d00", "#f72585"];
  let currentIndex = 0;

  swatch.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % colors.length;
    swatch.style.background = colors[currentIndex];
    swatch.nextElementSibling.textContent = colors[currentIndex]; // Update hex label
  });
});
document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", (e) => {
    const rect = swatch.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.className = "swatch-particle";
        particle.style.background = getComputedStyle(swatch).backgroundColor;
        document.body.appendChild(particle);

        particle.animate(
          [
            { transform: `translate(${rect.x}px, ${rect.y}px) scale(1)` },
            {
              transform: `translate(${
                rect.x + (Math.random() * 200 - 100)
              }px, ${rect.y - 100}px) scale(0)`,
            },
          ],
          { duration: 1000, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
        ).onfinish = () => particle.remove();
      }, i * 200);
    }
  });
});
setInterval(() => {
  document.querySelectorAll(".quantum-avatar").forEach((avatar) => {
    avatar.animate([{ transform: "scale(1)" }, { transform: "scale(1.03)" }], {
      duration: 1500,
      direction: "alternate",
    });
  });
}, 3000);
// Smooth page transitions
document.querySelectorAll(".wormhole-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.add("page-transition");

    setTimeout(() => {
      window.location.href = this.href;
    }, 600);
  });
});
// Particle interaction
document.querySelectorAll(".quantum-particle").forEach((particle) => {
  particle.addEventListener("mouseover", () => {
    particle.style.transform = `scale(1.5)`;
    particle.style.background = "#42e6a4";
  });

  particle.addEventListener("mouseout", () => {
    particle.style.transform = `scale(1)`;
    particle.style.background = "var(--quantum-highlight)";
  });
});

// Work Page Module
const initWorkPage = () => {
  if (!document.body.classList.contains("work-page")) return;

  // Quantum Perspective Effect
  let mouseX = 0,
    mouseY = 0;
  const updatePerspective = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    document.documentElement.style.setProperty(
      "--work-perspective-x",
      `${mouseX * 5}deg`
    );
    document.documentElement.style.setProperty(
      "--work-perspective-y",
      `${mouseY * 5}deg`
    );
  };
  document.addEventListener("mousemove", updatePerspective);

  // Reality Selection System
  const realityFilters = {
    currentReality: 0,
    realities: ["prime", "alternate", "quantum"],

    switchReality(index) {
      document.body.dataset.reality = this.realities[index];
      this.currentReality = index;
    },
  };

  // Work Item Entanglement
  document.querySelectorAll(".work-item").forEach((item) => {
    item.addEventListener("click", () => {
      item.style.setProperty(
        "--quantum-glow",
        `radial-gradient(circle at ${Math.random() * 100}% ${
          Math.random() * 100
        }%, 
         ${getComputedStyle(item).getPropertyValue("--quantum-accent")},
         transparent 70%)`
      );
    });
  });
};

// Initialize after DOM load
document.addEventListener("DOMContentLoaded", initWorkPage);
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("quantum-about")) return;

  // Hologram Interaction
  const quantumPortal = document.querySelector(".quantum-portal");
  const particles = document.querySelector(".particle-emitter");

  quantumPortal.addEventListener("mousemove", (e) => {
    const rect = quantumPortal.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    quantumPortal.style.transform = `
      rotateX(${y * 10}deg)
      rotateY(${x * 10}deg)
      translateZ(20px)
    `;

    particles.style.opacity = Math.min(0.6 + Math.abs(x + y), 1);
  });

  quantumPortal.addEventListener("mouseleave", () => {
    quantumPortal.style.transform = "none";
    particles.style.opacity = "0.6";
  });

  // Scroll-triggered Depth
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty(
      "--quantum-depth",
      `${Math.max(1000 - scrollY * 0.5, 500)}px`
    );

    document.querySelectorAll(".quantum-achievement").forEach((item, index) => {
      item.style.transform = `translateZ(${scrollY * 0.1 * index}px)`;
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Glow effect on hover
  const inputs = document.querySelectorAll(".input-box");
  inputs.forEach(input => {
      input.addEventListener("mouseenter", () => {
          input.querySelector(".glow-effect").style.opacity = "0.5";
      });
      input.addEventListener("mouseleave", () => {
          input.querySelector(".glow-effect").style.opacity = "0";
      });
  });

  // Sending animation
  const form = document.querySelector(".message-form");
  form.addEventListener("submit", () => {
      const glow = document.createElement("div");
      glow.style.cssText = `
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, #22c55e, transparent 70%);
          opacity: 0;
          pointer-events: none;
          z-index: 10;
      `;
      form.appendChild(glow);

      glow.animate([
          { opacity: 0, transform: "scale(0.5)" },
          { opacity: 0.5, transform: "scale(1.5)" },
          { opacity: 0, transform: "scale(2)" }
      ], {
          duration: 1000,
          easing: "ease-out"
      }).onfinish = () => {
          glow.remove();
      };
  });

  // Icon pulse speed up on hover
  const cards = document.querySelectorAll(".info-card");
  cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
          card.querySelector(".card-icon").style.animation = "pulse 1s infinite";
      });
      card.addEventListener("mouseleave", () => {
          card.querySelector(".card-icon").style.animation = "pulse 2s infinite";
      });
  });
});

    // Project slide hover
    const peekSlides = document.querySelectorAll(".peek-slide");
    peekSlides.forEach(slide => {
        slide.addEventListener("mouseenter", () => {
            slide.querySelector(".peek-glow").style.opacity = "0.5";
        });
        slide.addEventListener("mouseleave", () => {
            slide.querySelector(".peek-glow").style.opacity = "0";
        });
    });

