// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    // Close mobile menu on link click
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);

revealElements.forEach((el) => revealObserver.observe(el));

// Typing effect
const roles = [
  "Frontend Developer",
  "UI/UX Designer",
  "Web Enthusiast",
  "Administrator",
];
const typedEl = document.getElementById("typedText");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-bar div");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = "0";
        requestAnimationFrame(() => {
          bar.style.width = width;
        });
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 },
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// Contact form
// ================= EMAILJS =================

// init emailjs
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  const btn = this.querySelector("button");
  const original = btn.innerHTML;

  btn.innerHTML = "Mengirim...";

  emailjs
    .sendForm(
      "service_5hzn9uh", // 🔥 ganti
      "template_dvd4kf1",
      "RoJdzH0s0NVTU9QXS",
      "#contactForm", // 🔥 ganti
      this,
    )
    .then(
      () => {
        btn.innerHTML = "✓ Pesan Terkirim!";
        btn.style.background = "linear-gradient(135deg, #4ade80, #22c55e)";
        this.reset();

        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = "";
        }, 2500);
      },
      (error) => {
        btn.innerHTML = "❌ Gagal!";
        console.log(error);

        setTimeout(() => {
          btn.innerHTML = original;
        }, 2000);
      },
    );
});

// Certificate Modal Lightbox
function initCertModal() {
  const certModal = document.getElementById("certModal");
  const modalCertImg = document.getElementById("modalCertImg");
  const modalCertImgLink = document.getElementById("modalCertImgLink");
  const modalCertTitle = document.getElementById("modalCertTitle");
  const modalCertIssuer = document.getElementById("modalCertIssuer");
  const modalCertDate = document.getElementById("modalCertDate");
  const modalCertBtn = document.getElementById("modalCertBtn");
  const certModalClose = document.getElementById("certModalClose");
  const certModalOverlay = document.getElementById("certModalOverlay");

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".cert-card");
    if (!card) return;

    // Prevent default navigation when clicking card/badge to open modal
    e.preventDefault();

    const title = card.dataset.certTitle || card.querySelector("h3")?.textContent || "";
    const issuer = card.dataset.certIssuer || card.querySelector("p")?.textContent || "";
    const cardImg = card.querySelector("img");
    const fallbackSvg = card.dataset.certImg || "";
    
    let imgSrc = (cardImg && cardImg.currentSrc) ? cardImg.currentSrc : (cardImg && cardImg.src ? cardImg.src : fallbackSvg);

    if (modalCertTitle) modalCertTitle.textContent = title;
    if (modalCertIssuer) modalCertIssuer.textContent = issuer;
    if (modalCertDate) modalCertDate.textContent = card.dataset.certDate ? `Diterbitkan: ${card.dataset.certDate}` : "";
    
    if (modalCertImg) {
      modalCertImg.src = imgSrc;
      modalCertImg.alt = title;
      modalCertImg.onerror = function() {
        if (fallbackSvg && this.src !== fallbackSvg) {
          this.src = fallbackSvg;
          if (modalCertImgLink) modalCertImgLink.href = fallbackSvg;
          if (modalCertBtn) modalCertBtn.href = fallbackSvg;
        }
      };
    }

    if (modalCertImgLink) modalCertImgLink.href = imgSrc;
    if (modalCertBtn) modalCertBtn.href = imgSrc;

    if (certModal) {
      certModal.classList.add("active");
      certModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  });

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove("active");
    certModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (certModalClose) {
    certModalClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeCertModal();
    });
  }
  
  if (certModalOverlay) {
    certModalOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      closeCertModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
      closeCertModal();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCertModal);
} else {
  initCertModal();
}



