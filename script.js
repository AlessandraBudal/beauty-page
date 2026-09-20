(function () {
      var prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefereMenosMovimento) return;

      var camadas = Array.prototype.slice.call(document.querySelectorAll('.fixed-parallax'));
      var tarefaAgendada = false;

      function atualizarParallax() {
        var alturaJanela = window.innerHeight;
        camadas.forEach(function (camada) {
          var slide = camada.closest('.parallax-slide');
          var retangulo = slide.getBoundingClientRect();
          // só calcula se o card estiver perto da área visível
          if (retangulo.bottom < -200 || retangulo.top > alturaJanela + 200) return;
          var centroSlide = retangulo.top + retangulo.height / 2 - alturaJanela / 2;
          var deslocamento = centroSlide * 0.12;
          camada.style.transform = 'translateY(' + deslocamento.toFixed(1) + 'px)';
        });
        tarefaAgendada = false;
      }

      window.addEventListener('scroll', function () {
        if (!tarefaAgendada) {
          requestAnimationFrame(atualizarParallax);
          tarefaAgendada = true;
        }
      }, { passive: true });

      atualizarParallax();
    })();

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