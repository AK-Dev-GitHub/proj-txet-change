// 文字化け生成関数
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
