const root = document.documentElement;
root.classList.add('js');

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

const reveals = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window && !reduce.matches) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target.parentElement;
        const sibs = group
          ? Array.from(group.children).filter((c) => c.classList.contains('rv'))
          : [];
        const i = Math.max(0, sibs.indexOf(entry.target));
        (entry.target as HTMLElement).style.transitionDelay =
          Math.min(i * 90, 360) + 'ms';
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

const nav = document.getElementById('nav');
const prog = document.getElementById('prog');
let ticking = false;

function onScroll() {
  const y = window.pageYOffset || root.scrollTop || 0;
  nav?.classList.toggle('is-stuck', y > window.innerHeight * 0.62);
  if (prog) {
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const p = Math.round(Math.min(1, Math.max(0, y / max)) * 100);
    prog.textContent = String(p).padStart(3, '0');
  }
  ticking = false;
}

function requestScroll() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(onScroll);
}

window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll, { passive: true });
onScroll();

const fine = window.matchMedia('(pointer: fine)');
if (fine.matches && !reduce.matches) {
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let raf: number | null = null;

  window.addEventListener(
    'mousemove',
    (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      tx = (e.clientX / w - 0.5) * 34;
      ty = (e.clientY / h - 0.5) * 22;
      if (!raf) raf = window.requestAnimationFrame(loop);
    },
    { passive: true },
  );

  function loop() {
    cx += (tx - cx) * 0.035;
    cy += (ty - cy) * 0.035;
    root.style.setProperty('--px', cx.toFixed(2) + 'px');
    root.style.setProperty('--py', cy.toFixed(2) + 'px');
    if (Math.abs(tx - cx) > 0.06 || Math.abs(ty - cy) > 0.06) {
      raf = window.requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  }
}
