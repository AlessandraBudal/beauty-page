  document.querySelectorAll('.parallax-slide').forEach(function (slide) {
      function alternar() {
        var ativo = slide.classList.toggle('ativo');
        slide.setAttribute('aria-expanded', ativo ? 'true' : 'false');
      }

      slide.addEventListener('click', function (evento) {
        if (evento.target.closest('a')) return; // deixa o link do WhatsApp funcionar normalmente
        alternar();
      });

      slide.addEventListener('keydown', function (evento) {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          alternar();
        }
      });
    });