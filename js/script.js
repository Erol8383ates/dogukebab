document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("show");
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu after clicking a link (mobile UX)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("show")) {
          nav.classList.remove("show");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});
