/**
 * Mermaid 図の描画。
 *
 * Astro v7 で既定の Markdown プロセッサが Sätteri に変わり remark/rehype 系の
 * プラグインが使えないため、ビルド時変換ではなくクライアント側で描画する。
 * mermaid 本体は動的 import なので、図のあるページでしか読み込まれない。
 */

let initialized = false;

function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

export async function setupMermaid(): Promise<void> {
  if (initialized) return;

  const figures = [...document.querySelectorAll<HTMLElement>('[data-mermaid]')];
  if (figures.length === 0) return;
  initialized = true;

  const { default: mermaid } = await import('mermaid');

  let sequence = 0;

  const renderAll = async () => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark() ? 'dark' : 'default',
      fontFamily: getComputedStyle(document.body).fontFamily,
    });

    for (const figure of figures) {
      const source = figure.querySelector('template')?.content.textContent?.trim() ?? '';
      const target = figure.querySelector<HTMLElement>('[data-mermaid-target]');
      if (!target || source === '') continue;

      try {
        // render の id は呼び出しごとに一意である必要がある
        const { svg } = await mermaid.render(`mermaid-${sequence++}`, source);
        target.innerHTML = svg;
      } catch (error: unknown) {
        target.textContent = `Mermaid の描画に失敗しました: ${
          error instanceof Error ? error.message : String(error)
        }`;
      }
    }
  };

  await renderAll();

  // テーマを切り替えたら配色を合わせて描き直す
  const observer = new MutationObserver(() => {
    void renderAll();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
