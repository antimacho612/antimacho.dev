const grid = document.getElementById('grid');
const minWidth = document.getElementById('min-width');
const minWidthValue = document.getElementById('min-width-value');
const autoFill = document.getElementById('auto-fill');

function update() {
  grid.style.setProperty('--min-width', `${minWidth.value}px`);
  grid.style.setProperty('--mode', autoFill.checked ? 'auto-fill' : 'auto-fit');
  minWidthValue.textContent = `${minWidth.value}px`;
}

minWidth.addEventListener('input', update);
autoFill.addEventListener('change', update);
update();
