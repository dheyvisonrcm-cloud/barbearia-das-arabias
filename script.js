// Marca que o JS está ativo (as animações só escondem elementos se o JS rodar)
document.documentElement.classList.add('js');

const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('menu');

// ========== 1. MENU MOBILE ==========
function setMenu(aberto) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle('open', aberto);
    navToggle.setAttribute('aria-expanded', String(aberto));
    navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });
}

// Fecha ao clicar num link, apertar Esc ou clicar fora
navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => {
    if (!header.contains(e.target)) setMenu(false);
});

// ========== 2. HEADER MUDA AO ROLAR ==========
function atualizarHeader() {
    header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', atualizarHeader, { passive: true });
atualizarHeader();

// ========== 3. LINK ATIVO NO MENU ==========
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const secoes = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

if ('IntersectionObserver' in window) {
    const obsMenu = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(a =>
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
                );
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secoes.forEach(s => obsMenu.observe(s));
}

// ========== 4. ANIMAÇÃO AO ROLAR ==========
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const obsReveal = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => obsReveal.observe(el));
} else {
    reveals.forEach(el => el.classList.add('visible'));
}

// ========== 5. STATUS ABERTO/FECHADO ==========
// Horários em minutos desde 00:00. 0 = Domingo ... 6 = Sábado
const HORARIOS = {
    0: [8 * 60, 12 * 60],   // Domingo
    1: null,                // Segunda: fechado
    2: [9 * 60, 19 * 60],   // Terça
    3: [9 * 60, 19 * 60],   // Quarta
    4: [9 * 60, 19 * 60],   // Quinta
    5: [9 * 60, 19 * 60],   // Sexta
    6: [8 * 60, 20 * 60]    // Sábado
};
const NOMES_DIA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const FUSO = 'America/Recife'; // usa o horário da barbearia, não o do visitante

function agoraNaBarbearia() {
    const partes = new Intl.DateTimeFormat('en-US', {
        timeZone: FUSO,
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23'
    }).formatToParts(new Date());

    const get = tipo => partes.find(p => p.type === tipo).value;
    const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    return {
        dia: dias[get('weekday')],
        minutos: Number(get('hour')) * 60 + Number(get('minute'))
    };
}

function formatarHora(min) {
    const h = String(Math.floor(min / 60)).padStart(2, '0');
    const m = min % 60;
    return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
}

function proximaAbertura(dia, minutos) {
    for (let i = 0; i < 7; i++) {
        const d = (dia + i) % 7;
        const h = HORARIOS[d];
        if (!h) continue;
        if (i === 0 && minutos >= h[0]) continue; // hoje já passou do horário de abrir
        const quando = i === 0 ? 'hoje' : i === 1 ? 'amanhã' : NOMES_DIA[d];
        return `Abre ${quando} às ${formatarHora(h[0])}`;
    }
    return '';
}

function verificarStatusBarbearia() {
    const slots = document.querySelectorAll('[data-status]');
    if (!slots.length) return;

    const { dia, minutos } = agoraNaBarbearia();
    const hoje = HORARIOS[dia];
    const aberto = !!hoje && minutos >= hoje[0] && minutos < hoje[1];

    const texto = aberto
        ? `Aberto agora • Fecha às ${formatarHora(hoje[1])}`
        : `Fechado • ${proximaAbertura(dia, minutos)}`;

    slots.forEach(slot => {
        slot.innerHTML = `<span class="badge ${aberto ? 'aberto' : 'fechado'}">${texto}</span>`;
    });

    // Destaca o dia de hoje na lista de horários
    document.querySelectorAll('.hours li').forEach(li => {
        li.classList.toggle('hoje', Number(li.dataset.dia) === dia);
    });
}

verificarStatusBarbearia();
setInterval(verificarStatusBarbearia, 60 * 1000); // atualiza sozinho a cada minuto

// ========== 6. ANO DO RODAPÉ ==========
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();