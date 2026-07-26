/* ==========================================
   MUBASHIR EHSAN PORTFOLIO
========================================== */

/* TERMINAL */

const dot = document.getElementById('cursor-dot');
window.addEventListener('mousemove', e => {
   dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

document.querySelectorAll('a, button, .btn').forEach(el => {
   el.addEventListener('mouseenter', () => dot.classList.add('cursor-hover'));
   el.addEventListener('mouseleave', () => dot.classList.remove('cursor-hover'));
});

document.addEventListener('mousedown', () => dot.classList.add('cursor-click'));
document.addEventListener('mouseup', () => dot.classList.remove('cursor-click'));

const terminalLines = [

   "$ whoami",
   "Mubashir Ehsan",
   "Computer Science Student",
   "FAST NUCES Lahore",
   "",
   "Building Software.",
   "Learning AI.",
   "Obsessed with Systems.",
   "",
   "Status: Available for Internship",
   "",
   "$ ls projects",
   "",
   "C++ Projects",
   "SFML / UI Projects",
   "Console / Terminal Projects",
   "AI Projects",
   "An interesting collection of my work, from C++ to AI.",
   "$"
];

const terminal = document.getElementById("terminalBody");

let line = 0;

function typeLine() {

   if (line >= terminalLines.length) {
      return;
   }

   let current = terminalLines[line];
   let index = 0;
   let div = document.createElement("div");
   terminal.appendChild(div);

   function typeChar() {

      if (index < current.length) {
         div.innerHTML += current.charAt(index);
         index++;
         setTimeout(typeChar, 30);
      }
      else {
         terminal.scrollTop = terminal.scrollHeight;
         line++;
         setTimeout(typeLine, 250);
      }

   }

   typeChar();

}

window.addEventListener("load", () => {

   setTimeout(() => {
      document.body.classList.add("loaded");
      typeLine();
   }, 180);

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

   let current = "";

   sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (pageYOffset >= top) {
         current = section.getAttribute("id");
      }
   });

   navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
         link.classList.add("active");
      }
   });

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
   ".skill-box,.timeline-item,.about-card, .contact-card"
);

function reveal() {

   revealElements.forEach(item => {
      const top = item.getBoundingClientRect().top;
      const visible = window.innerHeight - 120;
      if (top < visible) {
         item.classList.add("show");
      }
   });

}

window.addEventListener("scroll", reveal);
reveal();

/* ==========================================
   PROJECT CAROUSEL
========================================== */

const projectsCarousel = document.querySelector(".projects-carousel");
const projectCards = Array.from(document.querySelectorAll(".projects-carousel .project-card"));
const projectPrevButton = document.querySelector("[data-carousel-prev]");
const projectNextButton = document.querySelector("[data-carousel-next]");
const projectCurrent = document.getElementById("projectCurrent");
const projectTotal = document.getElementById("projectTotal");

let activeProjectIndex = 0;
let carouselWheelLock = false;

function updateProjectCarousel() {

   if (!projectsCarousel || projectCards.length === 0) {
      return;
   }

   const carouselBounds = projectsCarousel.getBoundingClientRect();
   const radiusX = Math.min(carouselBounds.width * 0.34, 360);
   const radiusY = Math.min(carouselBounds.height * 0.26, 220);
   const step = (Math.PI * 2) / projectCards.length;
   const activeCard = projectCards[activeProjectIndex];

   projectsCarousel.style.height = Math.max((activeCard ? activeCard.scrollHeight : 0) + 240, 860) + "px";

   const anyCardOpen = projectCards.some(c => c.classList.contains("open"));

   projectCards.forEach((card, index) => {

      const delta = index - activeProjectIndex;
      const wrapped = ((delta % projectCards.length) + projectCards.length) % projectCards.length;
      const shortDelta = wrapped > projectCards.length / 2 ? wrapped - projectCards.length : wrapped;
      const isActive = shortDelta === 0;
      const angle = shortDelta * step - Math.PI / 2;
      const distanceX = isActive ? 0 : Math.cos(angle) * radiusX;
      const distanceY = isActive ? 0 : Math.sin(angle) * radiusY;

      if (!isActive && card.classList.contains("open")) {

         card.classList.remove("open");

         const toggle = card.querySelector(".project-toggle");
         const panel = card.querySelector(".project-subprojects");

         if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
         }

         if (panel) {
            panel.style.maxHeight = "0px";
         }

      }

      card.classList.toggle("is-active", isActive);
      card.style.opacity = isActive ? "1" : String(Math.max(0.14, 0.72 - Math.abs(shortDelta) * 0.12));
      card.style.zIndex = String(10 - Math.abs(shortDelta));
      card.style.filter = isActive ? "blur(0) saturate(1.05)" : `blur(${Math.min(2, Math.abs(shortDelta) * 0.35)}px) saturate(.82)`;
      card.style.pointerEvents = isActive ? "auto" : "none";
      card.style.transform = `translate(-50%, -50%) translate(${distanceX}px, ${distanceY}px) scale(${isActive ? 1.05 : Math.max(0.62, 0.92 - Math.abs(shortDelta) * 0.1)})`;
      card.style.borderColor = (anyCardOpen && !isActive) ? "transparent" : "";

   });

   if (projectCurrent) {
      projectCurrent.textContent = String(activeProjectIndex + 1).padStart(2, "0");
   }

   if (projectTotal) {
      projectTotal.textContent = String(projectCards.length).padStart(2, "0");
   }

}

function moveProjectCarousel(direction) {

   activeProjectIndex = (activeProjectIndex + direction + projectCards.length) % projectCards.length;
   updateProjectCarousel();

}

if (projectPrevButton) {
   projectPrevButton.addEventListener("click", () => moveProjectCarousel(-1));
}

if (projectNextButton) {
   projectNextButton.addEventListener("click", () => moveProjectCarousel(1));
}

if (projectsCarousel) {

   projectsCarousel.addEventListener("wheel", event => {

      const delta = event.deltaX;

      if (Math.abs(delta) < 6) {
         return;
      }

      event.preventDefault();

      if (carouselWheelLock) {
         return;
      }

      carouselWheelLock = true;
      moveProjectCarousel(delta > 0 ? 1 : -1);

      setTimeout(() => {
         carouselWheelLock = false;
      }, 650);

      let touchStartX = 0;

      let touchStartY = 0;

      projectsCarousel.addEventListener("touchstart", event => {

         touchStartX = event.touches[0].clientX;

         touchStartY = event.touches[0].clientY;

      }, { passive: true });

      projectsCarousel.addEventListener("touchend", event => {

         const touchEndX = event.changedTouches[0].clientX;

         const touchEndY = event.changedTouches[0].clientY;

         const diffX = touchStartX - touchEndX;

         const diffY = touchStartY - touchEndY;

         if (Math.abs(diffX) < 40 || Math.abs(diffX) < Math.abs(diffY)) {

            return;

         }

         moveProjectCarousel(diffX > 0 ? 1 : -1);

      }, { passive: true });

   }, { passive: false });

   window.addEventListener("keydown", event => {

      const activeTag = document.activeElement && document.activeElement.tagName;

      if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
         return;
      }

      if (event.key === "ArrowLeft") {
         event.preventDefault();
         moveProjectCarousel(-1);
      }

      if (event.key === "ArrowRight") {
         event.preventDefault();
         moveProjectCarousel(1);
      }

   });

   window.addEventListener("resize", () => {
      updateProjectCarousel();
   });

}

updateProjectCarousel();

/* ==========================================
   PROJECT TOGGLE
========================================== */

document.querySelectorAll(".project-toggle").forEach(toggle => {

   const card = toggle.closest(".project-card");
   const panel = card && card.querySelector(".project-subprojects");

   if (!card || !panel) {
      return;
   }

   panel.style.maxHeight = "0px";

   toggle.addEventListener("click", () => {

      const isOpen = card.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
      updateProjectCarousel();

   });

});

window.addEventListener("resize", () => {

   document.querySelectorAll(".project-card.open .project-subprojects").forEach(panel => {
      panel.style.maxHeight = panel.scrollHeight + "px";
   });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

   anchor.addEventListener("click", function (e) {

      e.preventDefault();

      document.querySelector(this.getAttribute("href"))
         .scrollIntoView({
            behavior: "smooth"
         });

   });

});