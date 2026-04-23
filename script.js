// Мобильное меню
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("is-open", !isExpanded);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });
}

// Анимации при скролле (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  scrollObserver.observe(el);
});

// Плавное появление hero-контента
document.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";
    heroContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    
    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 200);
  }
});

const reviews = Array.from(document.querySelectorAll(".review-card"));
const sliderButtons = document.querySelectorAll(".slider-btn");
let reviewIndex = 0;

function showReview(index) {
  reviews.forEach((review, idx) => {
    review.classList.toggle("is-active", idx === index);
  });
}

if (reviews.length && sliderButtons.length) {
  sliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction;
      if (direction === "next") {
        reviewIndex = (reviewIndex + 1) % reviews.length;
      } else {
        reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
      }
      showReview(reviewIndex);
    });
  });
}

const requestForm = document.getElementById("request-form");
const formError = document.getElementById("form-error");

function validatePhone(phoneValue) {
  const digits = phoneValue.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

if (requestForm && formError) {
  requestForm.addEventListener("submit", (event) => {
    const phoneInput = requestForm.querySelector('input[name="phone"]');
    const phoneValue = phoneInput ? phoneInput.value.trim() : "";
    formError.textContent = "";

    if (!validatePhone(phoneValue)) {
      event.preventDefault();
      formError.textContent = "Проверьте номер телефона: введите не менее 10 цифр.";
      if (phoneInput) {
        phoneInput.focus();
      }
      return;
    }

    event.preventDefault();
    formError.textContent = "Форма готова. Подключите backend-обработчик для отправки.";
    requestForm.reset();
  });
}
