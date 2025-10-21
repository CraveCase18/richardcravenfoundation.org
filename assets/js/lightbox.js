(function () {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/80 p-4';
  lb.innerHTML = `
    <button id="lightbox-close" aria-label="Close"
      class="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold shadow hover:bg-white">✕</button>
    <img id="lightbox-img" src="" alt="Full-size image"
      class="max-h-[85vh] max-w-[95vw] object-contain rounded-lg shadow-2xl" />
  `;
  document.body.appendChild(lb);

  const imgEl = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  function open(full) {
    imgEl.src = full;
    lb.classList.remove('hidden'); lb.classList.add('flex');
  }
  function close() {
    lb.classList.add('hidden'); lb.classList.remove('flex'); imgEl.src = '';
  }
  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  function wire() {
    document.querySelectorAll('a.gallery-item').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const full = a.dataset.full || a.getAttribute('href');
        open(full);
      });
    });
  }
  document.addEventListener('DOMContentLoaded', wire);
})();