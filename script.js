/* ============================================
   NGỌC DESIGN – Bảng Giá Dịch Vụ Website
   script.js
   ============================================ */

/* ---- SCROLL REVEAL ---- */
function initReveal() {
  const els = document.querySelectorAll('.card, .trend-card, .upgrade-item');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger delay per element
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el, i) => {
    el.dataset.delay = i * 60;
    io.observe(el);
  });
}

/* ---- HEADER LOGO ---- */
function initLogo() {
  const img = document.querySelector('.header-logo');
  if (!img) return;
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
      const fb = document.querySelector('.header-logo-fallback');
      if (fb) { img.style.display = 'none'; fb.style.display = 'flex'; }
    });
  }
}

/* ---- BANK LOGO FALLBACK ---- */
function initBankLogo() {
  const img = document.querySelector('.bank-logo-wrap img');
  if (!img) return;
  img.addEventListener('error', () => {
    const wrap = img.closest('.bank-logo-wrap');
    if (wrap) wrap.innerHTML = '<div class="bank-logo-fallback">TECH<br>COM</div>';
  });
}

/* ---- QR FALLBACK ---- */
function initQr() {
  const img = document.querySelector('.qr-wrap img');
  if (!img) return;
  img.addEventListener('error', () => {
    const wrap = img.closest('.qr-wrap');
    if (wrap) {
      wrap.innerHTML = `
        <div style="width:150px;height:150px;border-radius:14px;border:3px dashed #a7f3d0;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          margin:0 auto;background:#f0fdf4;gap:6px">
          <span style="font-size:28px">📲</span>
          <span style="font-size:12px;color:#6b7280;text-align:center;padding:0 12px">Chuyển khoản<br>theo số tài khoản</span>
        </div>
        <p class="qr-label">Số TK: 3610112005 – TECHCOMBANK</p>`;
    }
  });
}

/* ---- COPY STK ---- */
function initCopy() {
  const btn = document.getElementById('copyBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const stk = document.getElementById('bankStk').textContent.replace(/\s/g, '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(stk).then(() => showCopied(btn, stk));
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = stk;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopied(btn, stk);
    }
  });
}

function showCopied(btn, stk) {
  btn.textContent = '✓ Đã chép';
  btn.classList.add('copied');
  showToast('✅ Đã sao chép: ' + stk);
  setTimeout(() => {
    btn.textContent = '📋 Sao chép';
    btn.classList.remove('copied');
  }, 2500);
}

/* ---- TOAST ---- */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---- ACCORDION (INFO CARDS) ---- */
function initAccordion() {
  document.querySelectorAll('.info-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.info-card');
      const isOpen = card.classList.contains('open');
      // close all
      document.querySelectorAll('.info-card.open').forEach(c => c.classList.remove('open'));
      // open clicked if it was closed
      if (!isOpen) card.classList.add('open');
    });
  });
  // Open first by default
  const first = document.querySelector('.info-card');
  if (first) first.classList.add('open');
}

/* ---- BACK TO TOP ---- */
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- ZALO PHONE CLICK ---- */
function initHeaderContact() {
  const el = document.querySelector('.header-contact');
  if (!el) return;
  el.addEventListener('click', () => {
    window.location.href = 'https://zalo.me/0363961832';
  });
}

/* ---- INIT ALL ---- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initLogo();
  initBankLogo();
  initQr();
  initCopy();
  initAccordion();
  initBackTop();
  initHeaderContact();
});