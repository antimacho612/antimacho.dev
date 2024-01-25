import { type Ref, onMounted, onUnmounted, onUpdated } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { getScrollOffset } from 'vitepress';

export type MenuItem = {
  level: number;
  title: string;
  link: string;
  element: HTMLHeadElement;
  children?: MenuItem[];
};

const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = [];

export const resolveHeaders = (headers: MenuItem[]) => {
  // RANGE
  const [from, to] = [2, 5];

  headers = headers.filter((h) => h.level >= from && h.level <= to);

  resolvedHeaders.length = 0;
  headers.forEach(({ element, link }) => resolvedHeaders.push({ element, link }));

  const items = new Array<MenuItem>();
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];
    if (i === 0) {
      items.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j];
        if (prev.level < cur.level) {
          (prev.children || (prev.children = [])).push(cur);
          continue outer;
        }
      }
      items.push(cur);
    }
  }

  return items;
};

const serializeHeader = (headerEl: Element) => {
  let text = '';
  for (const node of headerEl.childNodes) {
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains('VPBadge') ||
        (node as Element).classList.contains('header-anchor') ||
        (node as Element).classList.contains('ignore-header')
      ) {
        continue;
      }
      text += node.textContent;
    } else if (node.nodeType === 3) {
      text += node.textContent;
    }
  }

  return text.trim();
};

export const getHeaders = () => {
  const headers = [...document.querySelectorAll<HTMLHeadElement>('.md-content :where(h1,h2,h3,h4,h5,h6)')]
    .filter((headerEl) => headerEl.id && headerEl.hasChildNodes())
    .map((headerEl) => ({
      element: headerEl,
      title: serializeHeader(headerEl),
      link: `#${headerEl.id}`,
      level: Number(headerEl.tagName[1]),
    }));
  return resolveHeaders(headers);
};

export const useActiveAnchor = (container: Ref<HTMLElement>, marker: Ref<HTMLElement>) => {
  let prevActiveLink: HTMLAnchorElement | null = null;

  const activateLink = (hash: string | null) => {
    if (prevActiveLink) {
      prevActiveLink.classList.remove('active');
    }

    prevActiveLink = hash == null ? null : container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);

    const activeLink = prevActiveLink;

    if (activeLink) {
      activeLink.classList.add('active');
      marker.value.style.top = `calc(2rem + ${activeLink.offsetTop}px)`;
      marker.value.style.opacity = '1';
    } else {
      marker.value.style.top = 'var(--default-top)';
      marker.value.style.opacity = '0';
    }
  };

  const setActiveLink = () => {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;

    const getAbsoluteTop = (element: HTMLElement) => {
      let offsetTop = 0;
      while (element !== document.body) {
        if (element === null) {
          return NaN;
        }
        offsetTop += element.offsetTop;
        element = element.offsetParent as HTMLElement;
      }
      return offsetTop;
    };

    const headers = resolvedHeaders
      .map(({ element, link }) => ({
        link,
        top: getAbsoluteTop(element),
      }))
      .filter(({ top }) => !Number.isNaN(top))
      .sort((a, b) => a.top - b.top);

    if (!headers.length) {
      activateLink(null);
      return;
    }

    if (isBottom) {
      activateLink(headers[headers.length - 1].link);
      return;
    }

    let activeLink: string | null = null;
    headers.forEach(({ link, top }) => {
      if (top > scrollY + getScrollOffset() + 4) {
        return;
      }
      activeLink = link;
    });
    activateLink(activeLink);
  };

  const onScroll = useThrottleFn(setActiveLink, 100, true);

  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener('scroll', onScroll);
  });

  onUpdated(() => {
    activateLink(location.hash);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
};
