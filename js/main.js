import { appPrincipal } from './app.js';

const prod = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD) || !import.meta.env;

if ('serviceWorker' in navigator && prod) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

appPrincipal();