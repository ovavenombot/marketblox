// Shared navbar behaviour — included on all pages
(function () {
  // Scroll shadow
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Select Games dropdown
  const dropdownBtn  = document.querySelector('.dropdown-btn');
  const gameDropdown = document.querySelector('.game-dropdown');
  if (dropdownBtn && gameDropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      gameDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => gameDropdown.classList.remove('open'));
    gameDropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  // Hamburger / mobile menu
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }
  window.closeMobile = function () {
    if (hamburger)  hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  };
})();
