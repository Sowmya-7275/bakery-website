/* ============================================
   Sowmya Lakshmi Bakery - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Mobile Navigation ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      this.classList.toggle('active');
    });

    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ---------- Hero Slider ----------
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (!slides.length) return;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(i);
        startAutoSlide();
      });
    });
  }

  // ---------- Menu Category Filter ----------
  const catButtons = document.querySelectorAll('.cat-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  catButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      catButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const category = this.dataset.category;

      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ---------- Simple Form Validation ----------
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#c0392b';
        } else {
          field.style.borderColor = '#E5D9C8';
        }
      });

      if (valid) {
        alert('Thank you! Your message has been received. We will get back to you soon.\n\n— Sowmya Lakshmi Bakery');
        form.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });

  // ---------- Smooth scroll for same-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
