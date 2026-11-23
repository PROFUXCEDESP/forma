(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = nav.querySelectorAll('a');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    nav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeMenu();
  });

  // Animações progressivas: o conteúdo permanece visível mesmo sem JavaScript/GSAP.
  if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy > *', {
      y: 22, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', delay: .15
    });
    gsap.from('.hero-art', {
      y: 35, opacity: 0, duration: 1, ease: 'power3.out', delay: .25
    });
    gsap.utils.toArray('.reveal').forEach((element, index) => {
      if (element.closest('.hero')) return;
      gsap.fromTo(element,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: .75, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true } }
      );
    });
    gsap.utils.toArray('.feature-row').forEach((row, index) => {
      gsap.from(row.querySelector('.feature-visual'), {
        x: index % 2 ? -24 : 24, opacity: 0, duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 82%', once: true }
      });
    });
    gsap.to('.hero-orbit', {
      rotate: 18, scale: 1.05, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // FAQ: mantém os itens independentes para permitir comparar respostas.
  document.querySelectorAll('.faq-list details').forEach(item => {
    item.addEventListener('toggle', () => {
      const icon = item.querySelector('summary span');
      if (icon) icon.textContent = item.open ? '×' : '+';
    });
  });
})();