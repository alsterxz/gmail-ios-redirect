(function (root) {
  'use strict';

  function buildGmailUrl(search) {
    const params = new URLSearchParams(search || '');
    const rawId = (params.get('id') || '').trim().toLowerCase();
    const account = (params.get('account') || '0').trim();

    if (!/^[a-f0-9]{16,32}$/.test(rawId)) return null;
    if (!/^\d{1,2}$/.test(account)) return null;

    return `googlegmail:///cv=${rawId}/accountId=${account}&create-new-tab`;
  }

  function openGmail() {
    const appUrl = buildGmailUrl(root.location.search);
    const status = root.document.getElementById('status');
    const button = root.document.getElementById('open-link');

    if (!appUrl) {
      status.textContent = 'El enlace del correo no es válido.';
      button.hidden = true;
      return;
    }

    button.href = appUrl;
    button.hidden = false;
    status.textContent = 'Abriendo la conversación en Gmail…';

    // La navegación inicial proviene del toque del usuario en Telegram.
    root.setTimeout(function () {
      root.location.assign(appUrl);
    }, 80);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildGmailUrl };
  }

  if (root.document) {
    root.document.addEventListener('DOMContentLoaded', openGmail);
  }
})(typeof window !== 'undefined' ? window : globalThis);
