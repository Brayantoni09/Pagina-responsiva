document.addEventListener('DOMContentLoaded', () => {

  // --- SELECTORES DE ELEMENTOS ---
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.topnav');
  const dropbtn = document.querySelector('.dropbtn');
  const dropdownContent = document.querySelector('.dropdown-content');
  const navLinks = document.querySelectorAll('.nav-link'); 
  const contentSections = document.querySelectorAll('.content-section');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  // --- NUEVO: Seleccionamos la sección de Inicio explícitamente ---
  const inicioSection = document.querySelector('#inicio');

  // --- LÓGICA PARA EL MENÚ DE HAMBURGUESA (MÓVIL) ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  });

  // --- LÓGICA PARA EL MENÚ DESPLEGABLE (DROPDOWN) ---
  dropbtn.addEventListener('click', (event) => {
    event.preventDefault();
    dropdownContent.classList.toggle('show');
  });

  // Cierra el dropdown si el usuario hace clic fuera de él
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropbtn')) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    }
  });
  
  // --- LÓGICA PARA MOSTRAR/OCULTAR CONTENIDO (CORREGIDA) ---
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');

      // 1. Oculta todos los temas (secciones con .content-section)
      contentSections.forEach(section => {
        section.classList.remove('visible');
      });

      // 2. Decide qué mostrar y qué ocultar
      if (targetId === '#inicio') {
        // Si se hace clic en "Inicio"
        // Muestra la sección de Inicio y oculta los temas
        inicioSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else {
        // Si se hace clic en CUALQUIER OTRO enlace (un tema o referencias)
        // OCULTA la sección de Inicio
        inicioSection.style.display = 'none';

        // MUESTRA la sección del tema seleccionado
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.classList.add('visible');
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      
      // 3. (Mejora) Cierra el menú desplegable si está abierto
      if (dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
      }

      // 4. Cierra el menú móvil si está abierto
      if (navMenu.classList.contains('is-active')) {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      }
    });
  });

  // --- LÓGICA PARA EL BOTÓN "VOLVER ARRIBA" ---
  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});