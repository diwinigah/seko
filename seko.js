document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".section");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const revealItems = document.querySelectorAll(".reveal");

  function updateHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
