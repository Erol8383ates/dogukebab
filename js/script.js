document.addEventListener("DOMContentLoaded", () => {
  // Elements (support both your old IDs and the new classes)
  const toggleBtn =
    document.querySelector(".menu-toggle") ||
    document.getElementById("menuToggle");

  const nav =
    document.getElementById("site-nav") ||
    document.getElementById("navLinks");

  // Toggle mobile menu
  function toggleMenu() {
    if (!nav) return;
    nav.classList.toggle("show");
    if (toggleBtn) {
      const expanded = nav.classList.contains("show");
      toggleBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", toggleMenu);

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("show")) return;
      const clickedInside =
        e.target === nav ||
        nav.contains(e.target) ||
        e.target === toggleBtn ||
        toggleBtn.contains(e.target);
      if (!clickedInside) nav.classList.remove("show");
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") nav.classList.remove("show");
    });
  }

  // Mobile: make navbar solid after small scroll
  const mq = window.matchMedia("(max-width: 768px)");

  function updateHeader() {
    if (mq.matches) {
      // Mobile behavior: toggle body.nav-solid by scroll
      if (window.scrollY > 50) {
        document.body.classList.add("nav-solid");
      } else {
        document.body.classList.remove("nav-solid");
      }
    } else {
      // Desktop: ensure solid + offset is applied
      document.body.classList.remove("nav-solid");
    }
  }

  // Run on load and on events
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);

  // If resizing to desktop, make sure the mobile menu is closed
  window.addEventListener("resize", () => {
    if (!mq.matches && nav) nav.classList.remove("show");
  });
});
