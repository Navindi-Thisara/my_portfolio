// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav ul');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });

      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    }
  });
});

// Active Navigation on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Typing Effect
const typedText = ["Full Stack Developer", "IoT Enthusiast", "React & Java Developer"];
let i = 0, j = 0, currentText = "", isDeleting = false;
const typingSpeed = 100;

function type() {
  const el = document.getElementById("typing");
  if (i >= typedText.length) i = 0;
  let fullText = typedText[i];

  currentText = isDeleting
    ? fullText.substring(0, --j)
    : fullText.substring(0, ++j);

  el.textContent = currentText;

  if (!isDeleting && j === fullText.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && j < 0) {
    isDeleting = false;
    i++;
    setTimeout(type, 500);
  } else {
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

// Popup + Success Sound System
const successSound = new Audio("assets/sounds/success.mp3");
successSound.preload = "auto";
successSound.volume = 0.6;

function playSound(audio) {
  audio.currentTime = 0;
  audio.play().catch(e => console.log("Audio blocked:", e));
}

function showPopup(type, message) {
  const popup = document.createElement("div");
  popup.className = `popup ${type} shake`;
  popup.innerHTML = `
      <span class="popup-message">${message}</span>
      <span class="popup-close">&times;</span>
  `;

  document.body.appendChild(popup);

  if (type === "success") playSound(successSound);

  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(() => popup.classList.remove("shake"), 500);

  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  });

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}

// Web3Forms Submission + Validation Shake
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[name="name"]');
    const namePattern = /^[A-Za-z\s]{2,50}$/;
    if (!namePattern.test(nameInput.value.trim())) {
      nameInput.classList.add("shake");
      showPopup("error", "Please enter a valid name!");
      setTimeout(() => nameInput.classList.remove("shake"), 500);
      return;
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        showPopup("success", "Message sent successfully!");
        contactForm.reset();
      } else {
        showPopup("error", result.message || "Something went wrong!");
      }

    } catch (error) {
      showPopup("error", "Network error! Please try again.");
    }
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
