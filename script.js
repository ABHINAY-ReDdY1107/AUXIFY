const body = document.body;
const header = document.querySelector("#siteHeader");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const loader = document.querySelector(".loader");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projects = {
  "vave-salon": {
    number: "01",
    title: "Vave Salon",
    image: "assets/vave-salon.svg",
    summary: "Designed and built a responsive business website for a salon brand, focusing on modern UI/UX principles, mobile-first design, and a seamless user experience across all devices.",
    problem: "The salon needed a premium digital presence that allowed clients to browse services easily, check stylist profiles, and contact them seamlessly on mobile devices.",
    solution: "Created a mobile-first responsive design with refined UI, smooth transitions, and a clean services layout that elevates the salon's brand online.",
    timeline: "Jun 2025 to Aug 2025",
    stack: "Web Design, UI/UX, Responsive, Client Work",
    impact: "Delivered a high-conversion website that showcases salon services and drives customer inquiries.",
    link: "https://www.vavesalon.com/"
  },
  mayaans: {
    number: "02",
    title: "Mayaans Chocotech",
    image: "assets/mayaans.svg",
    summary: "Developed a professional, high-performance website for Mayaans Chocotech. Focused on premium design aesthetics, clear product presentation, and smooth user interactions.",
    problem: "A confectionery tech business needing a polished digital presence to present their confectionery technology and products professionally to prospective business partners.",
    solution: "Engineered a clean frontend with responsive layouts, focusing on high-quality product images, structured technical data, and smooth animations.",
    timeline: "Sep 2025 to Oct 2025",
    stack: "Web Design, Frontend, UI/UX, Client Work",
    impact: "Provides a modern, high-speed brand storefront that showcases their technology and product lines effectively.",
    link: "https://www.mayaans.com/"
  },
  "hira-fragrances": {
    number: "03",
    title: "Hira Fragrances",
    image: "assets/hira-fragrances.svg",
    summary: "A premium e-commerce website designed and built for Hira Fragrances — a luxury perfume brand offering curated fragrance collections with an elegant online shopping experience.",
    problem: "The brand needed a polished digital storefront that reflected the luxury and sophistication of its fragrance line while enabling seamless online purchases.",
    solution: "A fully designed and developed e-commerce website with refined product presentation, elegant typography, smooth navigation, and a purchase flow that matches the brand's premium identity.",
    timeline: "May 2026 to Jun 2026",
    stack: "Web Design, E-Commerce, Frontend Development, Brand Identity",
    impact: "Live at hirafragrances.com — delivering a polished brand experience that converts visitors into customers.",
    link: "https://hirafragrances.com/"
  },
  "lost-found": {
    number: "04",
    title: "Lost & Found",
    image: "assets/lost-found.svg",
    summary: "A campus utility that helps students report and recover lost items through QR-based identification and a simpler discovery flow.",
    problem: "Lost items are hard to match with owners when discovery relies on informal groups or manual coordination.",
    solution: "A QR-first flow that gives each item a traceable recovery path and keeps the interface simple for students.",
    timeline: "Jan 2025 to Apr 2025",
    stack: "Python, QR workflows, UI planning, data handling",
    impact: "Improves campus recovery coordination without claiming measured deployment results."
  },
  payment: {
    number: "05",
    title: "Payment Automation",
    image: "assets/payment-automation.svg",
    summary: "An automated recurring digital payment system concept built around structured workflows, payment reminders, and reduced manual tracking.",
    problem: "Recurring payments create operational drag when reminders, status checks, and records are handled manually.",
    solution: "A workflow-driven automation layer that maps payment triggers, updates, and follow-up actions.",
    timeline: "Dec 2025 to Jan 2026",
    stack: "N8N, Python, automation logic, structured data",
    impact: "Designed to reduce repetitive admin effort while preserving clear human oversight."
  },
  genz: {
    number: "06",
    title: "GenZ Standard English Translator",
    image: "assets/genz-translator.svg",
    summary: "A language-processing project that turns slang-heavy expressions into clearer standard English for more accessible communication.",
    problem: "Informal slang can be difficult to interpret across different audiences, contexts, and age groups.",
    solution: "A Python-based translator experiment that maps modern slang into readable standard English.",
    timeline: "Oct 2025 to Nov 2025",
    stack: "Python, NLP concepts, AI tools, data preparation",
    impact: "Demonstrates practical language tooling without overstating production-scale accuracy."
  },
  quickbots: {
    number: "07",
    title: "Quick Bots",
    image: "assets/quick-bots.svg",
    summary: "A rapid bot-building framework designed to deploy intelligent conversational agents with minimal setup and maximum flexibility.",
    problem: "Building chatbots from scratch is time-consuming and requires significant boilerplate code for each new bot.",
    solution: "A modular framework that provides pre-built components for conversation flow, API integration, and deployment pipelines.",
    timeline: "Mar 2026 to May 2026",
    stack: "Python, AI APIs, conversation design, modular architecture",
    impact: "Reduces bot development time significantly while maintaining customization flexibility."
  },
  sosync: {
    number: "08",
    title: "SOSYNC",
    image: "assets/sosync.svg",
    summary: "A mobile emergency alert app that broadcasts your live GPS location to all trusted contacts simultaneously with a single long-press — replacing slow calls and manual texts with instant, one-button safety.",
    problem: "Emergency calls are slow, manual location sharing fails under panic, and no existing tool alerts multiple contacts at the exact same time with one tap.",
    solution: "A single long-press of the SOS button dispatches simultaneous SMS/WhatsApp alerts with real-time GPS to all saved contacts, with a 1.5-second hold confirmation to prevent accidental triggers.",
    timeline: "Apr 2026 to Jun 2026",
    stack: "Mobile App, GPS API, SMS/WhatsApp integration, real-time location",
    impact: "Reduces emergency alert time to under 2 seconds, replacing the slow process of individual calls or texts during a crisis."
  }
};

/* ── Loader ──────────────────────────────────────────── */
window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 500);
});

/* ── Header scroll behavior ──────────────────────────── */
window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 30);
}, { passive: true });

/* ── Mobile nav toggle ───────────────────────────────── */
navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("nav-active", !isOpen);
  body.classList.toggle("nav-open", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    header?.classList.remove("nav-active");
    body.classList.remove("nav-open");
  });
});

/* ── Reveal on scroll (staggered) ────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger reveals within the same parent
      const parent = entry.target.parentElement;
      const siblings = parent ? Array.from(parent.querySelectorAll(".reveal")) : [];
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400); // max 400ms stagger

      setTimeout(() => {
        entry.target.classList.add("is-visible");
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ── Project switching ───────────────────────────────── */
const setProject = (key) => {
  const project = projects[key];
  if (!project) return;

  document.querySelectorAll(".wallet-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.project === key);
  });

  const fields = {
    detailNumber: project.number,
    detailTitle: project.title,
    detailSummary: project.summary,
    detailProblem: project.problem,
    detailSolution: project.solution,
    detailTimeline: project.timeline,
    detailStack: project.stack,
    detailImpact: project.impact
  };

  Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) {
      // Animate text change
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      setTimeout(() => {
        el.textContent = value;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200);
    }
  });

  const image = document.getElementById("detailImage");
  if (image) {
    image.style.opacity = "0";
    image.style.transform = "scale(0.95)";
    setTimeout(() => {
      image.setAttribute("src", project.image);
      image.style.opacity = "1";
      image.style.transform = "scale(1)";
    }, 200);
  }

  // Update dynamic project link
  const linkContainer = document.getElementById("detailLinkContainer");
  const linkEl = document.getElementById("detailLink");
  if (linkContainer && linkEl) {
    linkContainer.style.opacity = "0";
    linkContainer.style.transform = "translateY(8px)";
    setTimeout(() => {
      if (project.link) {
        linkEl.setAttribute("href", project.link);
        linkContainer.style.display = "block";
        setTimeout(() => {
          linkContainer.style.opacity = "1";
          linkContainer.style.transform = "translateY(0)";
        }, 50);
      } else {
        linkContainer.style.display = "none";
      }
    }, 200);
  }
};

/* ── Wallet interaction ──────────────────────────────── */
const showcase = document.querySelector(".project-showcase");
const walletButton = document.querySelector("#walletButton");

walletButton?.addEventListener("click", () => {
  showcase?.classList.add("is-open");
  walletButton.setAttribute("aria-expanded", "true");
});

document.querySelectorAll(".wallet-card").forEach((card) => {
  card.addEventListener("click", () => {
    showcase?.classList.add("is-open");
    walletButton?.setAttribute("aria-expanded", "true");
    setProject(card.dataset.project);

    // Auto-scroll to detail panel when card is clicked
    const detailPanel = document.getElementById("projectDetail");
    if (detailPanel) {
      setTimeout(() => {
        detailPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  });
});

/* ── Stats counter animation ─────────────────────────── */
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;

  const duration = target > 100 ? 2000 : 1500;
  const start = performance.now();

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(easedProgress * target);

    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach((counter, i) => {
        setTimeout(() => animateCounter(counter), i * 150);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsGrid = document.querySelector(".stats-grid");
if (statsGrid) statObserver.observe(statsGrid);

/* ── Timeline scroll progress ────────────────────────── */
const timelineProgress = document.querySelector(".timeline-progress");
const timeline = document.querySelector(".timeline");

if (timelineProgress && timeline) {
  const updateTimelineProgress = () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalHeight = rect.height;
      const visible = Math.min(windowHeight - rect.top, totalHeight);
      const progress = Math.max(0, Math.min(visible / totalHeight, 1));
      timelineProgress.style.height = `${progress * 100}%`;
    }
  };

  window.addEventListener("scroll", updateTimelineProgress, { passive: true });
  updateTimelineProgress();
}

/* ── Custom cursor ───────────────────────────────────── */
const setupCursor = () => {
  if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  dot.style.opacity = "1";
  ring.style.opacity = "1";

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  const tick = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll("a, button, .service-card, .project-detail-panel, .testimonial-card, .faq-item summary").forEach((target) => {
    target.addEventListener("mouseenter", () => ring.classList.add("is-active"));
    target.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
  });
};

/* ── Magnetic buttons ────────────────────────────────── */
const setupMagneticButtons = () => {
  if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (event) => {
      const box = el.getBoundingClientRect();
      const x = event.clientX - box.left - box.width / 2;
      const y = event.clientY - box.top - box.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
};

/* ── Parallax on hero elements ───────────────────────── */
const setupParallax = () => {
  if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

  const grain = document.querySelector(".hero-grain");
  const orbital = document.querySelector(".orbital-lines");
  const studioCard = document.querySelector(".hero-studio-card");

  if (!grain && !orbital && !studioCard) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;

    if (scrollY < maxScroll) {
      const factor = scrollY / maxScroll;
      if (grain) grain.style.transform = `translateY(${factor * 40}px)`;
      if (orbital) orbital.style.transform = `translateY(${factor * 60}px)`;
      if (studioCard) studioCard.style.transform = `translateY(${factor * 25}px)`;
    }
  }, { passive: true });
};

/* ── GSAP hero animation ─────────────────────────────── */
const setupMotion = () => {
  if (typeof gsap === "undefined" || reduceMotion) {
    // Fallback: just show everything
    document.querySelectorAll(".about-hero-title, .about-hero-copy, .team-card").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  gsap.set(".about-hero-title", { y: 24, opacity: 0 });
  gsap.set(".about-hero-copy", { y: 24, opacity: 0 });
  gsap.set(".team-card", { y: 40, opacity: 0 });

  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to(".about-hero-title", { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
    .to(".about-hero-copy", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
    .to(".team-card", { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.3");
};

/* ── Detail text transition ──────────────────────────── */
const detailTransitionEls = document.querySelectorAll("#detailNumber, #detailTitle, #detailSummary, #detailProblem, #detailSolution, #detailTimeline, #detailStack, #detailImpact, #detailImage, #detailLinkContainer");
detailTransitionEls.forEach((el) => {
  el.style.transition = "opacity 0.25s ease, transform 0.25s ease";
});

/* ── Contact form (WhatsApp) ─────────────────────────── */
document.querySelector("#contactForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector("[name='name']")?.value.trim() || "";
  const whatsapp = form.querySelector("[name='whatsapp']")?.value.trim() || "";
  const project = form.querySelector("[name='project']")?.value || "";
  const message = form.querySelector("[name='message']")?.value.trim() || "";

  const text = `Hi, I'd like to start a project with Auxify!

*Name:* ${name}
*WhatsApp:* ${whatsapp}
*Project Type:* ${project}
*Details:* ${message || "N/A"}`;

  const whatsappURL = `https://wa.me/918106950950?text=${encodeURIComponent(text)}`;
  window.open(whatsappURL, "_blank");

  const note = form.querySelector(".form-note");
  if (note) {
    note.textContent = "Opening WhatsApp... If it didn't open, please message +91 8106950950 directly.";
    note.style.color = "#c4a96d";
  }
});

/* ── Initialize ──────────────────────────────────────── */
setupCursor();
setupMagneticButtons();
setupParallax();
setProject("vave-salon");

// GSAP might be loaded synchronously before this script (defer)
// Try immediately, and also on load as fallback
if (typeof gsap !== "undefined") {
  setupMotion();
} else {
  window.addEventListener("load", setupMotion);
}
