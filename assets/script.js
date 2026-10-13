const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (menuToggle) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    }
  }));
}

document.querySelectorAll('[data-model]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('model');
    if (select) select.value = link.dataset.model;
  });
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const modelSelect = document.getElementById('model');
if (modelSelect) {
  const requestedModel = new URLSearchParams(window.location.search).get('model');
  if (requestedModel && Array.from(modelSelect.options).some(option => option.value === requestedModel || option.text === requestedModel)) {
    modelSelect.value = requestedModel;
  }
}

const form = document.getElementById('enquiry-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const model = String(data.get('model') || 'Not specified');
    const vehicle = String(data.get('vehicle') || 'Not specified');
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Camper conversion enquiry — ${model}`);
    const body = encodeURIComponent(`Hello Nene Valley Campers,\n\nI'd like to enquire about a camper conversion.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nConversion: ${model}\nVan status: ${vehicle}\n\nPlans / questions:\n${message}\n\nSent from the camper conversions website.`);
    const status = document.getElementById('form-status');
    if (status) status.textContent = 'Opening your email app… If it does not open, email office@nenevalleycampers.co.uk directly.';
    window.location.href = `mailto:office@nenevalleycampers.co.uk?subject=${subject}&body=${body}`;
  });
}
