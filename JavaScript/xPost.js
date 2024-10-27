// Xにポスト
document.getElementById('twitterLink').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default anchor behavior
  const text = [
    '文字化けジェネレータで生成しました！: ' +
      document.getElementById('outputText').textContent,
    'https://minna-no-mojibake.com/',
  ].join('\n');
  const url =
    'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
  window.open(url, '_blank');
});
