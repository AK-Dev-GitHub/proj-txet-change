// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname; // 現在のURLパスを取得

  // デスクトップとモバイルメニュー内のリンクを取得
  const allLinks = document.querySelectorAll(
    '.header-links a, .header-links-mobile a'
  );

  // 現在のページのリンクに 'active' クラスを追加
  allLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname; // リンクのパスを取得
    if (linkPath === currentPath) {
      link.classList.add('active'); // 一致する場合のみ active クラスを追加
    } else {
      link.classList.remove('active'); // 一致しないリンクからは active クラスを削除
    }
  });
});
