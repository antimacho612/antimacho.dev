// 不要なら削除してよい
document.querySelector('.box')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = 'Clicked';
});
