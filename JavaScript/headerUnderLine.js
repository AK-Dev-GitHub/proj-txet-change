// 現在のURLパスを取得
const currentPath = window.location.pathname;

// header内の全てのリンクを取得
const headerLinks = document.querySelectorAll('.header-links a');

// 現在のページのリンクに 'active' クラスを追加
headerLinks.forEach((link) => {
  if (link.href.includes(currentPath)) {
    link.classList.add('active');
  }
});
