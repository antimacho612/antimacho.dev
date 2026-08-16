/** 最後の呼び出しから wait ミリ秒あいたら 1 回だけ実行する */
function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/** wait ミリ秒に 1 回までに間引く（先頭で即実行する leading edge 版） */
function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last < wait) return;
    last = now;
    fn(...args);
  };
}

const source = document.getElementById('source');
const waitInput = document.getElementById('wait');
const waitValue = document.getElementById('wait-value');
const clearButton = document.getElementById('clear');

const counts = { raw: 0, debounce: 0, throttle: 0 };
let startedAt = Date.now();

/** レーンにマーカーを 1 本立てる。位置は経過時間（10 秒で 1 周）で決める */
function mark(lane) {
  const track = document.querySelector(`[data-track="${lane}"]`);
  const marker = document.createElement('div');
  marker.className = 'marker';
  marker.style.left = `${(((Date.now() - startedAt) / 10000) % 1) * 100}%`;
  track.append(marker);
  marker.addEventListener('animationend', () => marker.remove());

  counts[lane] += 1;
  document.querySelector(`[data-count="${lane}"]`).textContent = counts[lane];
}

let debounced;
let throttled;

function rebuild() {
  const wait = Number(waitInput.value);
  waitValue.textContent = `${wait}ms`;
  debounced = debounce(() => mark('debounce'), wait);
  throttled = throttle(() => mark('throttle'), wait);
}

source.addEventListener('input', () => {
  mark('raw');
  debounced();
  throttled();
});

waitInput.addEventListener('input', rebuild);

clearButton.addEventListener('click', () => {
  for (const key of Object.keys(counts)) {
    counts[key] = 0;
    document.querySelector(`[data-count="${key}"]`).textContent = '0';
    document.querySelector(`[data-track="${key}"]`).replaceChildren();
  }
  startedAt = Date.now();
  source.value = '';
  source.focus();
});

rebuild();
