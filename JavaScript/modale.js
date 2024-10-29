// Toggle mobile menu display
function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.header-links-mobile');
  mobileMenu.style.display =
    mobileMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Close modal when the "閉じる" button is clicked
document
  .getElementById('closeMobileMenu')
  .addEventListener('click', function () {
    document.querySelector('.header-links-mobile').style.display = 'none';
    modal.classList.remove('is-active');
  });
