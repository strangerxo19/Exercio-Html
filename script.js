document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.getElementById('carousel');

  let currentIndex = 0;
  const intervalTime = 3000; // 3 segundos
  let autoPlay = null;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
  }

  function nextSlide() { showSlide(currentIndex + 1); }
  function prevSlide() { showSlide(currentIndex - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoPlay = setInterval(nextSlide, intervalTime);
  }

  function stopAutoplay() {
    if (autoPlay) {
      clearInterval(autoPlay);
      autoPlay = null;
    }
  }

  // reinicia autoplay (usado quando clicar nos botões)
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // eventos de controle
  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  // pausar autoplay ao passar o mouse e voltar ao sair
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // teclas de seta
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
    if (e.key === 'ArrowLeft')  { prevSlide(); resetAutoplay(); }
  });

  // iniciar
  showSlide(0);
  startAutoplay();
});
