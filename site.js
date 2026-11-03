(() => {
  'use strict';
  const launch = new Date('2026-11-03T08:00:00-05:00');
  const deadline = new Date('2026-11-18T08:00:00-05:00');
  function updateDates() {
    const now = new Date();
    const released = now >= launch;
    document.querySelectorAll('[data-release-label]').forEach(el => {
      el.textContent = released ? 'Episode 1 · Out now' : 'Premieres November 3 · 8 a.m. ET';
    });
    document.querySelectorAll('[data-watch-episode]').forEach(el => {
      if (!released && !el.querySelector('img')) el.textContent = '▶ View the YouTube premiere';
    });
    if (now >= deadline) {
      document.querySelectorAll('[data-deadline-label]').forEach(el => { el.textContent = 'Submissions closed November 18, 2026 · 8 a.m. ET'; });
      document.querySelectorAll('[data-challenge-submit]').forEach(el => {
        el.href = 'contact.html';
        el.textContent = 'Questions about your submission? →';
        el.removeAttribute('target');
        el.removeAttribute('data-challenge-submit');
      });
      document.querySelectorAll('[data-challenge-note]').forEach(el => { el.textContent = 'The submission window for this challenge has closed. You can still use the prompt and free kit to practice.'; });
    }
  }
  updateDates();
  setInterval(updateDates, 60000);

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => { link.closest('details').open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('.mobile-menu[open]').forEach(menu => {
      menu.open = false;
      menu.querySelector('summary').focus();
    });
  });

  const frame = document.getElementById('episode-player');
  function playVideo(start = 0) {
    if (!frame) return;
    const iframe = document.createElement('iframe');
    const params = new URLSearchParams({ autoplay: '1', start: String(start), enablejsapi: '1', rel: '0' });
    if (location.protocol === 'http:' || location.protocol === 'https:') params.set('origin', location.origin);
    iframe.src = 'https://www.youtube-nocookie.com/embed/B1a7dNlCZrI?' + params;
    iframe.title = 'Build the Signal: Episode 1 — The Loyalty Trap';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.replaceChildren(iframe);
    window.tpsTrack?.('episode_play_request', { episode: '1', start_seconds: start });
  }
  document.querySelector('[data-play-video]')?.addEventListener('click', () => playVideo());
  document.querySelectorAll('[data-chapter]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !frame) return;
      event.preventDefault();
      playVideo(Number(link.dataset.chapter));
      frame.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      frame.querySelector('iframe').focus();
    });
  });

  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('formStatus');
    button.disabled = true;
    button.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      status.className = 'form-status success';
      status.textContent = 'Message sent. Thanks for reaching out—we’ll be in touch.';
      window.tpsTrack?.('contact_submit_success', { form_name: 'contact' });
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = 'We couldn’t confirm your message was sent. Please try again or email theproductsignal@gmail.com. Your message is still in the form.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.textContent = 'Send message →';
    }
  });
})();
