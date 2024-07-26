document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById('inputText');
  const generateButton = document.getElementById('generateButton');
  const resetButton = document.getElementById('resetButton');
  const decodeButton = document.getElementById('decodeButton');

  inputText.addEventListener('input', () => {
    const inputValue = inputText.value.trim();
    const isInputEmpty = inputValue === '';
    generateButton.disabled = isInputEmpty;
    resetButton.disabled = isInputEmpty;
    decodeButton.disabled = isInputEmpty;
  });

  generateButton.addEventListener('click', () => {
    const inputValue = inputText.value;
    const outputText = document.getElementById('outputText');
    outputText.textContent = generateRandomMojibake(inputValue);
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
  resetButton.addEventListener('click', () => {
    inputText.value = '';
    document.getElementById('outputText').textContent = '';
    generateButton.disabled = true;
    document.getElementById('copyButton').disabled = true;
    resetButton.disabled = true;
    decodeButton.disabled = true;
    const resetMessage = document.getElementById('resetMessage');
    resetMessage.style.display = 'block';
    setTimeout(() => {
      resetMessage.style.display = 'none';
    }, 2000);
  });

  decodeButton.addEventListener('click', () => {
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

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  });

  // Xにポスト
  document.getElementById('twitterLink').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    const text = [
      '文字化けジェネレータで生成しました！: ' +
        document.getElementById('outputText').textContent,
      'https://ak-dev-github.github.io/proj-txet-change/',
    ].join('\n');
    const url =
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  });

  function generateRandomMojibake(text) {
    const mojibakeChars = '繧§縺ｰ縺代繧医�縲';
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
});
