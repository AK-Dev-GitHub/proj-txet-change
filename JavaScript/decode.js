decodeButton.addEventListener('click', () => {
  const outputText = document.getElementById('outputText').textContent;

  // モーダルを表示
  const modal = document.getElementById('show-modal');
  modal.style.display = 'block';

  // モーダルの閉じるボタン
  const closeButton = document.querySelector('.close');
  closeButton.onclick = function () {
    modal.style.display = 'none';
  };

  // OKボタンをクリックしたときの処理
  const okButton = document.getElementById('click-ok-button');
  okButton.onclick = function () {
    const decodedText = decodeMojibake(outputText);
    document.getElementById('outputText').textContent = decodedText;
    modal.style.display = 'none';
    const decodeMessage = document.getElementById('decodeMessage');
    decodeMessage.style.display = 'block';
    setTimeout(() => {
      decodeMessage.style.display = 'none';
    }, 2000);
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});

// デコードする関数
function decodeMojibake(mojibakeText) {
  try {
    // 文字化けしたテキストをバイト配列に変換
    const sjisBytes = new Uint8Array(
      mojibakeText.split('').map((char) => char.charCodeAt(0))
    );
    // Shift_JISとしてデコード
    const utf8String = new TextDecoder('shift_jis').decode(sjisBytes);
    return utf8String;
  } catch (e) {
    console.error('Decoding error:', e);
    return '解読できませんでした(´;ω;｀)';
  }
}
