document.getElementById('inputText').addEventListener('input', () => {
  const inputText = document.getElementById('inputText').value;
  const generateButton = document.getElementById('generateButton');
  const resetButton = document.getElementById('resetButton');
  const decodeButton = document.getElementById('decodeButton');
  generateButton.disabled = inputText.trim() === '';
  resetButton.disabled = inputText.trim() === '';
  decodeButton.disabled = inputText.trim() === '';
  document.getElementById('decodeButton').disabled = true;
});

document.getElementById('generateButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  const outputText = document.getElementById('outputText');
  outputText.textContent = generateRandomMojibake(inputText);
  document.getElementById('copyButton').disabled = false;
  document.getElementById('decodeButton').disabled = false;
});

document.getElementById('copyButton').addEventListener('click', () => {
  const outputText = document.getElementById('outputText').textContent;
  navigator.clipboard.writeText(outputText).then(() => {
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.style.display = 'block';
    setTimeout(() => {
      copyMessage.style.display = 'none';
    }, 2000);
  });
});

// リセットボタン押下後の処理
document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').textContent = '';
  // 各ボタンを非活性化
  document.getElementById('generateButton').disabled = true;
  document.getElementById('copyButton').disabled = true;
  document.getElementById('resetButton').disabled = true;
  document.getElementById('decodeButton').disabled = true;
  const resetMessage = document.getElementById('resetMessage');
  resetMessage.style.display = 'block';
  setTimeout(() => {
    resetMessage.style.display = 'none';
  }, 2000);
});

document.getElementById('decodeButton').addEventListener('click', () => {
  const outputText = document.getElementById('outputText').textContent;

  // モーダルを表示
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  // モーダルの閉じるボタン
  const closeButton = document.querySelector('.close');
  closeButton.onclick = function () {
    modal.style.display = 'none';
  };

  // OKボタンをクリックしたときの処理
  const okButton = document.getElementById('okButton');
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

  // モーダル外をクリックした場合
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});

document.getElementById('twitterLink').addEventListener('click', () => {
  const text =
    '文字化けジェネレータで生成した文字化け: ' +
    document.getElementById('outputText').textContent;
  const url =
    'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
  window.open(url, '_blank');
});

document.getElementById('backButton').addEventListener('click', () => {
  window.location.href = 'index.html';
});

function generateRandomMojibake(text) {
  const mojibakeChars = '！繧ゅ§縺ｰ縺代ｒ繧医�縲�殺肉';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += mojibakeChars.charAt(
      Math.floor(Math.random() * mojibakeChars.length)
    );
  }
  return result;
}

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
