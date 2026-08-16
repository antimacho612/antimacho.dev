/**
 * Sandbox / Demo / Compare が共有するランタイム。
 *
 * デモは iframe の srcdoc に流し込んで隔離する（allow-same-origin は付けないので
 * オリジンは不透明のまま。デモ側から親のスタイルや DOM には触れない）。
 * 親子のやり取りは postMessage のみで、高さの通知とテーマの伝搬に使う。
 */

export interface SandboxSources {
  html: string;
  css: string;
  js: string;
}

/** デモ側の最低限のスタイル。見た目の主張はせず、素のキャンバスに近づける */
const FRAME_BASE_STYLE = `
:root { color-scheme: light; font-family: system-ui, -apple-system, 'Segoe UI', 'Hiragino Sans', 'Noto Sans JP', sans-serif; }
html.dark { color-scheme: dark; }
body { margin: 0; padding: 16px; }
`;

/** srcdoc に注入するスクリプト。高さの通知とテーマ切り替えを担う */
const FRAME_RUNTIME = `
(function () {
  var last = 0;
  function post() {
    var el = document.documentElement;
    // html は height:auto なので getBoundingClientRect は中身の高さになる。
    // scrollHeight だとビューポート高さを下回れず、縮むときに追従できない
    var height = Math.ceil(el.getBoundingClientRect().height);
    // 横に溢れているとスクロールバーの分だけ足りなくなり、縦スクロールバーまで出る
    if (el.scrollWidth > el.clientWidth) height += 16;
    if (height === last) return;
    last = height;
    parent.postMessage({ __sandbox: 'height', value: height }, '*');
  }
  addEventListener('message', function (event) {
    var data = event.data;
    if (data && data.__sandbox === 'theme') {
      document.documentElement.classList.toggle('dark', !!data.dark);
    }
  });
  new ResizeObserver(post).observe(document.documentElement);
  addEventListener('load', post);
  post();
})();
`;

function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

/** ソース一式から iframe に流し込む HTML を組み立てる。 */
export function buildDocument(sources: SandboxSources): string {
  // srcdoc は HTML として解釈されるため、JS 中の </script> は閉じタグとみなされてしまう
  const js = sources.js.replace(/<\/(script)/gi, '<\\/$1');

  return `<!doctype html>
<html lang="ja"${isDark() ? ' class="dark"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${FRAME_BASE_STYLE}</style>
<style>${sources.css}</style>
</head>
<body>
${sources.html}
<script>${FRAME_RUNTIME}<\/script>
<script>${js}<\/script>
</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * フレームの登録（高さ追従とテーマ伝搬）
 * ------------------------------------------------------------------ */

interface RegisteredFrame {
  frame: HTMLIFrameElement;
  /** 高さを固定するなら中身に追従させない */
  fixedHeight: boolean;
}

const frames: RegisteredFrame[] = [];
let listenersAttached = false;

function attachGlobalListeners(): void {
  if (listenersAttached) return;
  listenersAttached = true;

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || data.__sandbox !== 'height') return;

    const registered = frames.find((item) => item.frame.contentWindow === event.source);
    if (!registered || registered.fixedHeight) return;

    registered.frame.style.height = `${Math.max(80, Math.min(data.value, 2000))}px`;
  });

  // テーマ切り替えを各デモに伝える
  const observer = new MutationObserver(() => {
    for (const { frame } of frames) {
      frame.contentWindow?.postMessage({ __sandbox: 'theme', dark: isDark() }, '*');
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

/** iframe を高さ追従・テーマ伝搬の対象として登録し、ソースを流し込む。 */
export function mountFrame(
  frame: HTMLIFrameElement,
  sources: SandboxSources,
  options: { fixedHeight?: boolean } = {}
): void {
  if (!frames.some((item) => item.frame === frame)) {
    frames.push({ frame, fixedHeight: options.fixedHeight ?? false });
  }
  frame.srcdoc = buildDocument(sources);
  attachGlobalListeners();
}

/** template 要素に入れておいたソースを読み出す。 */
export function readSources(root: ParentNode): SandboxSources {
  const read = (key: string) => {
    const template = root.querySelector<HTMLTemplateElement>(`template[data-source="${key}"]`);
    return template?.content.textContent ?? '';
  };
  return { html: read('html'), css: read('css'), js: read('js') };
}

/** 別タブでデモを開く。 */
export function openInNewTab(sources: SandboxSources): void {
  const blob = new Blob([buildDocument(sources)], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener');
  // 開いたタブが読み込むまでの猶予を置いてから解放する
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/* ------------------------------------------------------------------ *
 * Sandbox / Demo（タブ + 編集）
 * ------------------------------------------------------------------ */

interface Sandbox {
  root: HTMLElement;
  frame: HTMLIFrameElement;
  /** 初期状態。リセットで戻す */
  original: SandboxSources;
  current: SandboxSources;
  fixedHeight: boolean;
}

const sandboxes: Sandbox[] = [];

function run(sandbox: Sandbox): void {
  mountFrame(sandbox.frame, sandbox.current, { fixedHeight: sandbox.fixedHeight });
}

function collectEdits(sandbox: Sandbox): void {
  for (const editor of sandbox.root.querySelectorAll<HTMLTextAreaElement>('[data-editor]')) {
    const key = editor.dataset.editor as keyof SandboxSources;
    sandbox.current[key] = editor.value;
  }
}

function selectTab(sandbox: Sandbox, key: string): void {
  for (const tab of sandbox.root.querySelectorAll<HTMLButtonElement>('.tab[data-tab]')) {
    const isActive = tab.dataset.tab === key;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  }
  for (const panel of sandbox.root.querySelectorAll<HTMLElement>('.panel[data-panel]')) {
    panel.classList.toggle('is-active', panel.dataset.panel === key);
  }
}

function setEditing(sandbox: Sandbox, editing: boolean): void {
  for (const panel of sandbox.root.querySelectorAll<HTMLElement>('.panel[data-panel]')) {
    const code = panel.querySelector<HTMLElement>('[data-code]');
    const editor = panel.querySelector<HTMLTextAreaElement>('[data-editor]');
    if (!code || !editor) continue;
    code.hidden = editing;
    editor.hidden = !editing;
  }

  sandbox.root.querySelector<HTMLButtonElement>('[data-action="edit"]')?.classList.toggle('is-active', editing);
  const reset = sandbox.root.querySelector<HTMLButtonElement>('[data-action="reset"]');
  if (reset) reset.hidden = !editing;

  // 編集を始めたらコードのタブを開く（何を編集しているか見えるように）
  const activePanel = sandbox.root.querySelector('.panel.is-active')?.getAttribute('data-panel');
  if (editing && activePanel === 'preview') {
    const first = sandbox.root.querySelector<HTMLButtonElement>('.tab[data-tab]:not([data-tab="preview"])');
    if (first) selectTab(sandbox, first.dataset.tab!);
  }
}

export function setupSandboxes(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-sandbox]')) {
    if (sandboxes.some((item) => item.root === root)) continue;

    const frame = root.querySelector<HTMLIFrameElement>('[data-frame]');
    if (!frame) continue;

    const original = readSources(root);
    const sandbox: Sandbox = {
      root,
      frame,
      original,
      current: { ...original },
      fixedHeight: root.dataset.height !== undefined && root.dataset.height !== '',
    };
    sandboxes.push(sandbox);

    root.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      const tab = target.closest<HTMLButtonElement>('.tab[data-tab]');
      if (tab) {
        selectTab(sandbox, tab.dataset.tab!);
        return;
      }

      const action = target.closest<HTMLButtonElement>('[data-action]')?.dataset.action;
      if (action === 'edit') {
        const isEditing = root
          .querySelector<HTMLButtonElement>('[data-action="edit"]')
          ?.classList.contains('is-active');
        setEditing(sandbox, !isEditing);
      } else if (action === 'run') {
        collectEdits(sandbox);
        run(sandbox);
      } else if (action === 'reset') {
        sandbox.current = { ...sandbox.original };
        for (const editor of root.querySelectorAll<HTMLTextAreaElement>('[data-editor]')) {
          editor.value = sandbox.original[editor.dataset.editor as keyof SandboxSources];
        }
        run(sandbox);
      } else if (action === 'open') {
        openInNewTab(sandbox.current);
      }
    });

    run(sandbox);
  }
}

/* ------------------------------------------------------------------ *
 * Compare（before / after の並置）
 * ------------------------------------------------------------------ */

const compares = new Set<HTMLElement>();

export function setupCompares(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-compare]')) {
    if (compares.has(root)) continue;
    compares.add(root);

    const fixedHeight = root.dataset.height !== undefined && root.dataset.height !== '';
    const variants = [...root.querySelectorAll<HTMLElement>('[data-variant]')].map((variant) => ({
      frame: variant.querySelector<HTMLIFrameElement>('[data-frame]'),
      sources: readSources(variant),
    }));

    const runAll = () => {
      for (const { frame, sources } of variants) {
        if (frame) mountFrame(frame, sources, { fixedHeight });
      }
    };

    root.addEventListener('click', (event) => {
      const action = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-action]')?.dataset.action;
      if (action === 'run') runAll();
    });

    runAll();
  }
}
