// Toggle mobile menu display
function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.header-links-mobile');
  mobileMenu.style.display =
    mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  const modal = document.querySelector('.modal');
  if (mobileMenu.style.display === 'flex') {
    modal.classList.add('is-active');
  } else {
    modal.classList.remove('is-active');
  }
}

// toggleMobileMenu 関数の調整: モバイルメニューが表示されるときにはモーダルに is-active クラスを追加し、閉じるときにはクラスを削除するようにしました。
document
  .getElementById('closeMobileMenu')
  .addEventListener('click', function () {
    document.querySelector('.header-links-mobile').style.display = 'none';
    document.querySelector('.modal').classList.remove('is-active');
  });

// beforeunload イベントの追加: window.addEventListener('beforeunload', ...) を使用し、ページがアンロードされる直前にモーダルとメニューを閉じる。
window.addEventListener('beforeunload', () => {
  const mobileMenu = document.querySelector('.header-links-mobile');
  const modal = document.querySelector('.modal');
  if (mobileMenu) mobileMenu.style.display = 'none';
  if (modal) modal.classList.remove('is-active');
});
