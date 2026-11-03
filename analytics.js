/* Public GA4 web-stream ID. Collection runs only on production after opt-in. */
(() => {
  'use strict';
  const measurementId = 'G-FVXDXH5ZNC';
  const production = ['theproductsignal.com', 'www.theproductsignal.com'].includes(location.hostname);
  const preferenceKey = 'tps-analytics-consent';
  let active = false;
  let choice;
  try { choice = localStorage.getItem(preferenceKey); } catch (_) { /* Session-only preference when storage is unavailable. */ }
  const panel = document.getElementById('analytics-consent');
  function start() {
    if (!production || active) return;
    active = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }
  window.tpsTrack = (event, parameters = {}) => {
    if (active && choice === 'granted') window.gtag('event', event, parameters);
  };
  if (choice === 'granted') start();
  if (production && !choice && panel) panel.hidden = false;
  document.querySelectorAll('[data-analytics-settings]').forEach(button => {
    button.addEventListener('click', () => {
      if (!panel) return;
      panel.hidden = false;
      panel.querySelector('button')?.focus();
    });
  });
  document.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => {
      choice = button.dataset.consent;
      try { localStorage.setItem(preferenceKey, choice); } catch (_) { /* Keep the choice for this page. */ }
      if (choice === 'granted') {
        if (active) {
          window['ga-disable-' + measurementId] = false;
          window.gtag('consent', 'update', { analytics_storage: 'granted' });
        } else start();
      } else {
        window['ga-disable-' + measurementId] = true;
        if (active) window.gtag('consent', 'update', { analytics_storage: 'denied' });
      }
      if (panel) panel.hidden = true;
    });
  });
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    const placement = link.closest('header') ? 'navigation' : link.closest('footer') ? 'footer' : link.closest('.hero') ? 'hero' : 'content';
    const details = { placement, page_path: location.pathname };
    if (['www.youtube.com', 'youtube.com', 'youtu.be'].includes(url.hostname) && !link.hasAttribute('data-chapter')) {
      window.tpsTrack('watch_click', { ...details, video_id: url.searchParams.get('v') || 'channel' });
    } else if (url.origin === location.origin && url.pathname.endsWith('/build-the-signal-audience-kit.zip')) {
      window.tpsTrack('starter_kit_click', details);
    } else if (link.hasAttribute('data-challenge-submit')) {
      window.tpsTrack('challenge_form_open', details);
    }
  });
})();
