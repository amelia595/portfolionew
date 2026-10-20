
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

// MENU MOBILE
menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("menu-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// NAVIGASI AKTIF SAAT SCROLL
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-25% 0px -60% 0px" }
);

sections.forEach((section) => observer.observe(section));

// MODAL VIDEO
const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("showcasePlayer");
const videoModalTitle = document.getElementById("videoModalTitle");

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => {
    videoPlayer.src = button.dataset.video;
    videoModalTitle.textContent =
      button.dataset.title || "VIDEO SHOWCASE";

    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    videoPlayer.play().catch(() => {
      // Jika autoplay ditolak, video tetap bisa diputar manual.
    });
  });
});

// MODAL GAMBAR UI/UX
const imageModal = document.getElementById("imageModal");
const expandedImage = document.getElementById("expandedImage");
const expandedTitle = document.getElementById("expandedTitle");
const expandedDescription = document.getElementById("expandedDescription");

document.querySelectorAll(".design-item").forEach((button) => {
  button.addEventListener("click", () => {
    expandedImage.src = button.dataset.image;
    expandedTitle.textContent =
      button.dataset.title || "UI/UX Design";
    expandedDescription.textContent =
      button.dataset.description || "";

    imageModal.classList.add("is-open");
    imageModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

// MENUTUP MODAL
function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  if (modal === videoModal) {
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();
  }

  if (modal === imageModal) {
    expandedImage.removeAttribute("src");
  }

  if (!document.querySelector(".modal.is-open")) {
    document.body.style.overflow = "";
  }
}

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.close === "video") {
      closeModal(videoModal);
    }

    if (button.dataset.close === "image") {
      closeModal(imageModal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(videoModal);
    closeModal(imageModal);
  }
});


