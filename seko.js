// public/js/slider-services.js

(function() {
  // S'assurer que le DOM est prêt
  document.addEventListener('DOMContentLoaded', function() {
    const radios = Array.from(document.querySelectorAll('input[name="slide"]'));
    const slidesContainer = document.querySelector('.service.slides');
    const slides = Array.from(document.querySelectorAll('.slide'));

    if (!slidesContainer || slides.length === 0 || radios.length === 0) {
      return; // pas de slider sur la page
    }

    // Calcul dynamique de la largeur d'un slide et du gap
    function getSlideMetrics() {
      const firstSlide = slides[0];
      const slideWidth = firstSlide ? firstSlide.getBoundingClientRect().width : 300;
      // récupérer le gap défini sur le conteneur (peut être 0 si non défini)
      const style = getComputedStyle(slidesContainer);
      const gap = parseInt(style.gap) || 24;
      return { slideWidth, gap };
    }

    // Déplacer le slider vers l'index voulu
    function goToSlide(index) {
      if (index < 0 || index >= radios.length) return;
      radios[index].checked = true;

      // Translation du container
      const { slideWidth, gap } = getSlideMetrics();
      const translateX = -(slideWidth + gap) * index;
      slidesContainer.style.transform = `translateX(${translateX}px)`;

      // Effet visuel sur la slide active
      slides.forEach((s, i) => {
        s.style.transition = 'transform 0.25s ease';
        s.style.transform = (i === index) ? 'scale(1.02)' : 'scale(1)';
      });
    }

    // Cliquer sur une slide pour avancer au suivant
    slides.forEach((slide, idx) => {
      slide.addEventListener('click', function() {
        const nextIndex = idx + 1;
        if (nextIndex < radios.length) {
          goToSlide(nextIndex);
        } else {
          // Boucle au premier slide
          goToSlide(0);
        }
      });

      // Rendre navigable au clavier
      slide.setAttribute('tabindex', '0');
      slide.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const nextIndex = idx + 1;
          if (nextIndex < radios.length) goToSlide(nextIndex);
          else goToSlide(0);
        }
      });
    });

    // Mise à jour lorsque le radio change (par les labels)
    radios.forEach((radio, i) => {
      radio.addEventListener('change', function() {
        // Définir la translation correspondant à l'index
        goToSlide(i);
      });
    });

    // Initialisation
    goToSlide(0);
  });
})();



// public/js/slider-interactions.js
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Cible les images des slides (adapter si nécessaire)
    const slideImages = document.querySelectorAll('.service.slides .slide img');

    if (!slideImages.length) return;

    // Activation d'une image: enlève 'active' des autres et applique à celle-ci
    function activateImage(img) {
      slideImages.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
      // Option: déclencher une action supplémentaire ici, par exemple ouvrir une modal
      // aperturaModalPourImg(img);
    }

    slideImages.forEach(img => {
      // Activation au clic/touch
      img.addEventListener('click', function() {
        activateImage(img);
      });
      // Accessibilité: activation au clavier (Enter/Espace)
      img.setAttribute('tabindex', '0');
      img.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateImage(img);
        }
      });
      // Optionnel: survol neutre (pour mobile) on n’ajoute rien ici; c’est géré par CSS
    });
  });
})();


// public/js/appear-why-us.js (version augmentée)
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const whySection = document.querySelector('.why-us');
    if (!whySection) return;

    whySection.style.opacity = '0';
    whySection.style.transform = 'translateY(20px)';
    whySection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          whySection.classList.add('visible');
          whySection.style.opacity = '1';
          whySection.style.transform = 'translateY(0)';
          obs.unobserve(whySection);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(whySection);

    // Interaction clavier/focus: accentuer l’affichage quand on focus la section
    whySection.tabIndex = -1; // rendre focusable si besoin
    whySection.addEventListener('focus', () => {
      whySection.style.boxShadow = '0 0 0 4px rgba(11, 30, 106, 0.25)';
    });
    whySection.addEventListener('blur', () => {
      whySection.style.boxShadow = 'none';
    });
  });
})();


