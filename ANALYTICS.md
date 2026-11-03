# Website analytics and integrations

All four pages load site.css, site.js, and analytics.js. GA4 measurement ID: G-FVXDXH5ZNC.

## Analytics

- Google Analytics only loads on theproductsignal.com and www.theproductsignal.com after the visitor allows analytics. Local previews never send data.
- Visitors can change their choice in the footer. Advertising storage, advertising personalization, and Google signals are disabled.
- In GA4, enable enhanced measurement for page views, outbound links, and downloads. Disable automatic form interactions so attempted submissions are not confused with successful ones.
- Custom events: watch_click, starter_kit_click, episode_play_request, challenge_form_open, and contact_submit_success.
- episode_play_request means the visitor requested playback, not proof of a completed view. Use YouTube Studio for view duration and subscriber performance. Verify enhanced video tracking separately after deployment.
- Download events measure clicks, not completed transfers. Do not add custom intent events and equivalent enhanced-measurement events together.
- Google Forms completions are counted in Forms/Sheets. Newsletter subscriptions are counted in MailerLite. Opening a form or clicking a signup button does not prove completion.
- Do not send names, emails, message text, or challenge answers to Analytics.
- After deploying, allow analytics and verify one page_view per page load and relevant events in GA4 Realtime/DebugView. These live checks have not been performed.

## Connected services

- Formspree: existing xvzyybwq contact endpoint, with inline success/error messages and retained input on errors.
- MailerLite: account 2765254, embedded form sqzwTr, on every page. Verify successful subscription and any double-opt-in message in the published environment.
- Google Forms: challenge responder URL supplied by the owner, opening in a new tab. Website submission links close at November 18, 2026, 8 a.m. Eastern; the form itself must also be closed in Google Forms. The website cannot prevent direct submissions to the Google Form.
- YouTube: Episode 1 B1a7dNlCZrI, with click-to-load embed and ten chapter links. Direct YouTube links remain available as a fallback.

## Release content

Episode 1 releases November 3, 2026 at 8 a.m. Eastern. JavaScript changes the premiere label to Out now at that instant. New episodes: first Tuesday monthly. Next episode: December 1, 2026. For future episodes update dates, chapter links, schema, screenshots, and challenge prompt together.

## Verification

Local checks passed for script syntax, local assets and anchor destinations, JSON-LD, unique IDs, single heading/embed instances, launch/deadline boundaries, contact success/HTTP/network-error behavior, player setup, and analytics production/consent gates. Native Chrome access was not approved, so rendered desktop/mobile review and external service delivery are still pending. No live contact or challenge submissions were sent.
