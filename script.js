document.getElementById('inputText').addEventListener('input', () => {
  const inputText = document.getElementById('inputText').value;
  const generateButton = document.getElementById('generateButton');
  const resetButton = document.getElementById('resetButton');
  generateButton.disabled = inputText.trim() === '';
  resetButton.disabled = inputText.trim() === '';
});

document.getElementById('generateButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  const outputText = document.getElementById('outputText');
  outputText.textContent = generateRandomMojibake(inputText);
  document.getElementById('copyButton').disabled = false; // コピーボタンを活性化
});

document.getElementById('copyButton').addEventListener('click', () => {
  const outputText = document.getElementById('outputText').textContent;
  navigator.clipboard.writeText(outputText).then(() => {
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.style.display = 'block';
    setTimeout(() => {
      copyMessage.style.display = 'none';
    }, 4000); // 2秒後にメッセージを非表示にする
  });
});

document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').textContent = '';
  document.getElementById('generateButton').disabled = true;
  document.getElementById('copyButton').disabled = true;
  document.getElementById('resetButton').disabled = true;
});

function generateRandomMojibake(text) {
  const mojibakeChars = '！繧ゅ§縺ｰ縺代ｒ繧医�縲�殺肉';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    // ランダムに文字を選択
    result += mojibakeChars.charAt(
      Math.floor(Math.random() * mojibakeChars.length)
    );
  }
  return result;
}
