const automatico = document.currentScript.dataset.automatico === 'true';
const slides = Array.from(document.querySelectorAll('.slide'));
const video = document.querySelector('video');
const indicador = document.getElementById('indicador');
const pausa = document.getElementById('pausa');
let atual = 0;
let timer;
let rodando = automatico;
function agendar() {
    clearTimeout(timer);
    if (rodando && atual !== 0) timer = setTimeout(() => mostrar(atual + 1), 6000);
    if (rodando && atual === 0) timer = setTimeout(() => mostrar(1), 15000);
}
function mostrar(n) {
    video.pause();
    atual = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.hidden = i !== atual);
    indicador.textContent = `${atual + 1} de ${slides.length}`;
    if (atual === 0) {
        video.currentTime = 0;
        if (rodando) video.play().catch(() => {});
    }
    agendar();
}
video.addEventListener('ended', () => { if (rodando) mostrar(atual + 1); });
const anterior = document.getElementById('anterior');
const proximo = document.getElementById('proximo');
if (anterior) anterior.onclick = () => mostrar(atual - 1);
if (proximo) proximo.onclick = () => mostrar(atual + 1);
if (pausa) pausa.onclick = () => {
    rodando = !rodando;
    pausa.textContent = rodando ? 'Pausar carrossel' : 'Retomar carrossel';
    if (atual === 0) {
        if (rodando) video.play().catch(() => {}); else video.pause();
    }
    agendar();
};
mostrar(0);
