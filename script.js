document.getElementById('inputText').addEventListener('input', () => {
  const inputText = document.getElementById('inputText').value;
  const generateButton = document.getElementById('generateButton');
  const resetButton = document.getElementById('resetButton');
  const restoreButton = document.getElementById('restoreButton');
  const decodeButton = document.getElementById('decodeButton');
  generateButton.disabled = inputText.trim() === '';
  resetButton.disabled = inputText.trim() === '';
  restoreButton.disabled = inputText.trim() === '';
  decodeButton.disabled = inputText.trim() === '';
});

document.getElementById('generateButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  const outputText = document.getElementById('outputText');
  outputText.textContent = generateRandomMojibake(inputText);
  document.getElementById('copyButton').disabled = false;
  document.getElementById('restoreButton').disabled = false;
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

document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').textContent = '';
  document.getElementById('generateButton').disabled = true;
  document.getElementById('copyButton').disabled = true;
  document.getElementById('resetButton').disabled = true;
  document.getElementById('restoreButton').disabled = true;
  document.getElementById('decodeButton').disabled = true;
  const resetMessage = document.getElementById('resetMessage');
  resetMessage.style.display = 'block';
  setTimeout(() => {
    resetMessage.style.display = 'none';
  }, 2000);
});

document.getElementById('restoreButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  document.getElementById('outputText').textContent = inputText;
  const restoreMessage = document.getElementById('restoreMessage');
  restoreMessage.style.display = 'block';
  setTimeout(() => {
    restoreMessage.style.display = 'none';
  }, 2000);
});

document.getElementById('decodeButton').addEventListener('click', () => {
  const outputText = document.getElementById('outputText').textContent;
  const decodedText = decodeMojibake(outputText);
  document.getElementById('outputText').textContent = decodedText;

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

// 文字化けをデコードする関数
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
