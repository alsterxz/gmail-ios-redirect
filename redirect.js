(function (root) {
  'use strict';

  function buildGmailWebUrl(search) {
    const params = new URLSearchParams(search || '');
    const rawId = (params.get('id') || '').trim().toLowerCase();

    if (!/^[a-f0-9]{16,32}$/.test(rawId)) return null;

    return `https://mail.google.com/mail/u/0/#all/${rawId}`;
  }

  function openGmail() {
    const webUrl = buildGmailWebUrl(root.location.search);
    const status = root.document.getElementById('status');
    const button = root.document.getElementById('open-link');

    if (!webUrl) {
      status.textContent = 'El enlace del correo no es válido.';
      button.hidden = true;
      return;
    }

    button.href = webUrl;
    button.hidden = false;
    status.textContent = 'Abriendo la conversación en Gmail web…';

    // La navegación inicial proviene del toque del usuario en Telegram.
    root.setTimeout(function () {
      root.location.assign(webUrl);
    }, 80);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildGmailWebUrl };
  }

  if (root.document) {
    root.document.addEventListener('DOMContentLoaded', openGmail);
  }
})(typeof window !== 'undefined' ? window : globalThis);
