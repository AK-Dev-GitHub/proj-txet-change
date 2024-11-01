const cursorR = 4; //カーソルの半径
const cursor = document.getElementById('cursor'); //カーソル用のdivを取得
const stalker = document.getElementById('stalker'); //ストーカー用のdivを取得

//マウスに追従させる処理
document.addEventListener('mousemove', function (e) {
  stalker.style.transform =
    'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  cursor.style.transform =
    'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

//aタグにホバー中かどうかの判別フラグ
let hovFlag = false;

//aタグにホバーしたときに、ストーカーにクラスを追加
const linkElem = document.querySelectorAll('a');
for (let i = 0; i < linkElem.length; i++) {
  //マウスホバー時
  linkElem[i].addEventListener('mouseover', function (e) {
    hovFlag = true;

    //ストーカーにクラスを追加
    stalker.classList.add('hov_');
  });
  //マウスホバー解除時
  linkElem[i].addEventListener('mouseout', function (e) {
    hovFlag = false;
    stalker.classList.remove('hov_');
  });
}
