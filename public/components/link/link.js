/**
 * Link Component - Toggle Behavior
 *
 * Gestisce automaticamente i link con chevron che hanno l'attributo data-toggle.
 * Il valore di data-toggle deve essere l'id dell'elemento da mostrare/nascondere.
 *
 * Uso:
 * <a href="#" class="link link--chevron-right" data-toggle="my-content">
 *   Label
 *   <span class="link__chevron material-symbols-outlined">arrow_drop_down</span>
 * </a>
 * <div id="my-content">Contenuto nascosto</div>
 *
 * CSS richiesto nel contesto:
 * .is-expanded .link__chevron { transform: rotate(180deg); }
 * #my-content { display: none; }
 * #my-content.is-visible { display: block; } // o flex, etc.
 */

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const toggleLinks = document.querySelectorAll("[data-toggle]");

    toggleLinks.forEach(function (link) {
      const targetId = link.getAttribute("data-toggle");
      const target = document.getElementById(targetId);

      if (!target) {
        console.warn(`Link toggle: target #${targetId} not found`);
        return;
      }

      link.addEventListener("click", function (e) {
        e.preventDefault();
        link.classList.toggle("is-expanded");
        target.classList.toggle("is-visible");
      });
    });
  });
})();
