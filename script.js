
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".nav-link");

// Abre e fecha o menu em dispositivos móveis
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

// Fecha o menu ao selecionar uma seção
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  });
});

// Animação de entrada dos elementos
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Destaca a seção atual no menu
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
