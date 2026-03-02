(function () {
  let openModal = null;

  function closeModal() {
    if (!openModal) return;
    openModal.classList.remove("is-open");
    document.body.style.overflow = "";
    openModal = null;
  }

  function openModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (openModal && openModal !== modal) {
      closeModal();
    }

    openModal = modal;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const modalTriggers = document.querySelectorAll("[data-modal]");

    modalTriggers.forEach(function (trigger) {
      const modalId = trigger.getAttribute("data-modal");
      if (!modalId) return;

      const modal = document.getElementById(modalId);
      if (!modal) return;

      const closeBtn = modal.querySelector(".modal__close");

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openModalById(modalId);
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          closeModal();
        });
      }

      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
})();
