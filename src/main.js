import './style.css'

// Burger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.Header_burger');
  const headerLinks = document.querySelector('.HeaderLinks');

  if (!burgerButton || !headerLinks) return;

  const toggleMenu = () => {
    burgerButton.classList.toggle('active');
    headerLinks.classList.toggle('active');
  };

  burgerButton.addEventListener('click', toggleMenu);

  // Ensure menu resets when switching to desktop
  const mediaQuery = window.matchMedia('(min-width: 1025px)');
  const handleViewportChange = () => {
    if (mediaQuery.matches) {
      burgerButton.classList.remove('active');
      headerLinks.classList.remove('active');
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleViewportChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleViewportChange);
  }
});
