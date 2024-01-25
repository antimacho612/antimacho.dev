import { useData, withBase } from 'vitepress';

export const isExternalLink = (path: string) => /^(?:[a-z]+:|\/\/)/i.test(path);

// const extraExts =
//   (typeof process === 'object' && process.env.VITE_EXTRA_EXTENSIONS) ||
//   (import.meta as any).env?.VITE_EXTRA_EXTENSIONS ||
//   ''

// const KNOWN_EXTENSIONS = new Set(
//   (
//     '3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,' +
//     'eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,' +
//     'mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,' +
//     'p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,' +
//     'tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip' +
//     (extraExts && typeof extraExts === 'string' ? ',' + extraExts : '')
//   ).split(',')
// )

// const treatAsHtml = (filename: string) => {
//   const ext = filename.split('.').pop();
//   return ext == null || !
// }

export const normalizeLink = (url: string) => {
  const { pathname, search, hash, protocol } = new URL(url, 'http://a.com');

  // if (isExternal(url) || url.startsWith('#') || !protocol.startsWith('http') || !treatAsHtml(pathname)) {
  // return url
  // }

  const { site } = useData();
  const normalizedPath =
    pathname.endsWith('/') || pathname.endsWith('html')
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? '' : '.html')}${search}${hash}`
        );
  return withBase(normalizedPath);
};

export const ensureStartingSlash = (path: string) => (/^\//.test(path) ? path : `/${path}`);
