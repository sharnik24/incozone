import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import Lenis from 'lenis'

// Init Lenis before React mounts — zero delay, pure GPU smooth scroll
const lenis = new Lenis({
  duration: 1.6,
  easing: t => 1 - Math.pow(1 - t, 5),   // quintic ease-out — silky deceleration
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.8,
  syncTouch: true,                          // native-feel on touch devices
  infinite: false,
  prevent: el => el.closest('[data-lenis-prevent]') != null,
});

// Expose globally so window.scrollTo still works
window.__lenis = lenis;

let rafId;
const raf = time => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
rafId = requestAnimationFrame(raf);

// Patch window.scrollTo so Lenis-scrolled pages still support jump-to-top
const _nativeScrollTo = window.scrollTo.bind(window);
window.scrollTo = (x, y) => {
  if (typeof x === 'object') { _nativeScrollTo(x); }
  else { lenis.scrollTo(y ?? x, { immediate: true }); }
};

const rootEl = document.getElementById('root');
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// react-snap pre-renders to static HTML — use hydrateRoot to attach to it.
// In dev or first render without pre-rendered HTML, fall back to createRoot.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
