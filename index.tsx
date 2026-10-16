import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Start the homepage chunk in parallel with the app bootstrap without loading it on other routes.
if (window.location.pathname === '/') {
  void import('./pages/Home');
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
