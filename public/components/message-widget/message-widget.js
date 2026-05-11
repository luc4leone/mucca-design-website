(function () {
  'use strict';

  function init() {
    if (document.querySelector('.mw-root')) return;

    var root = document.createElement('div');
    root.className = 'mw-root';
    root.innerHTML =
      '<div class="mw-backdrop" id="mw-backdrop"></div>' +
      '<div class="mw-panel" id="mw-panel" role="dialog" aria-modal="true" aria-label="Lascia un messaggio">' +
        '<div class="mw-panel__header">' +
          '<span class="mw-panel__title">Lascia un messaggio</span>' +
          '<button class="mw-close" id="mw-close" type="button" aria-label="Chiudi">&times;</button>' +
        '</div>' +
        '<form class="mw-form" id="mw-form" novalidate>' +
          '<div class="mw-field">' +
            '<label class="mw-label" for="mw-email">Email</label>' +
            '<input class="mw-input" type="email" id="mw-email" name="email" required autocomplete="email" />' +
          '</div>' +
          '<div class="mw-field">' +
            '<label class="mw-label" for="mw-message">Messaggio</label>' +
            '<textarea class="mw-textarea" id="mw-message" name="message" required></textarea>' +
          '</div>' +
          '<div class="mw-error" id="mw-error"></div>' +
          '<button class="mw-submit" type="submit" id="mw-submit">Invia</button>' +
        '</form>' +
        '<div class="mw-confirm" id="mw-confirm">Messaggio inviato. Grazie!</div>' +
      '</div>' +
      '<button class="mw-trigger" id="mw-trigger" type="button">Lascia un messaggio</button>';

    document.body.appendChild(root);

    var trigger = document.getElementById('mw-trigger');
    var panel = document.getElementById('mw-panel');
    var backdrop = document.getElementById('mw-backdrop');
    var closeBtn = document.getElementById('mw-close');
    var form = document.getElementById('mw-form');
    var submitBtn = document.getElementById('mw-submit');
    var confirm = document.getElementById('mw-confirm');
    var errorEl = document.getElementById('mw-error');

    function open() {
      panel.classList.add('mw-panel--open');
      backdrop.classList.add('mw-backdrop--visible');
      trigger.classList.add('mw-trigger--hidden');
      document.getElementById('mw-email').focus();
    }

    function close() {
      panel.classList.remove('mw-panel--open');
      backdrop.classList.remove('mw-backdrop--visible');
      trigger.classList.remove('mw-trigger--hidden');
    }

    function reset() {
      form.reset();
      form.style.display = '';
      confirm.style.display = 'none';
      errorEl.textContent = '';
      submitBtn.disabled = false;
    }

    trigger.addEventListener('click', open);
    backdrop.addEventListener('click', close);

    closeBtn.addEventListener('click', function () {
      close();
      setTimeout(reset, 300);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('mw-panel--open')) {
        close();
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = document.getElementById('mw-email').value.trim();
      var message = document.getElementById('mw-message').value.trim();

      if (!email || !message) return;

      submitBtn.disabled = true;
      errorEl.textContent = '';

      fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, body: message }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error();
          form.style.display = 'none';
          confirm.style.display = 'block';
          setTimeout(function () {
            close();
            setTimeout(reset, 300);
          }, 2000);
        })
        .catch(function () {
          errorEl.textContent = 'Si è verificato un errore. Riprova.';
          submitBtn.disabled = false;
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
