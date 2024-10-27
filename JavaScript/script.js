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
});
