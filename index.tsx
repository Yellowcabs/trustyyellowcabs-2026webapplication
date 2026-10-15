import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Let the router own scroll position so a browser refresh cannot restore a
// stale offset before the page layout is ready.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Build-time SEO content is served outside the React root for crawler visibility.
// Remove it before the existing app mounts so React remains the sole interactive UI.
document.getElementById('seo-static-content')?.remove();

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// TEMP: disable service worker while fixing routing
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./sw.js');
//   });
// }

// Register Service Worker for PWA Installability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
