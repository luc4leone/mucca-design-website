(function () {
  document.querySelectorAll('.video-facade').forEach(function (facade) {
    facade.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = facade.dataset.src;
      iframe.frameBorder = '0';
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      facade.parentElement.replaceChild(iframe, facade);
    });
  });
})();
