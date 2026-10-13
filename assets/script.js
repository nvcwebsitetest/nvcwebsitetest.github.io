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
    if (link.closest('.dropdown-toggle')) return;
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  }));
}
const dropdownToggle = document.querySelector('.dropdown-toggle');
if (dropdownToggle) dropdownToggle.addEventListener('click', event => {
  if (window.matchMedia('(max-width: 700px)').matches) {
    event.preventDefault();
    dropdownToggle.parentElement.classList.toggle('open');
  }
});
document.querySelectorAll('[data-model]').forEach(link => link.addEventListener('click', () => {
  const select = document.getElementById('model');
  if (select) select.value = link.dataset.model;
}));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById('enquiry-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const model = String(data.get('model') || 'Not specified');
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(`Camper conversion enquiry — ${model}`);
  const body = encodeURIComponent(`Hello Nene Valley Campers,\n\nI'd like to enquire about a camper conversion.\n\nName: ${name}\nEmail: ${email}\nConversion: ${model}\n\nPlans / questions:\n${message}\n\nSent from the camper conversions website.`);
  const status = document.getElementById('form-status');
  if (status) status.textContent = 'Opening your email app…';
  window.location.href = `mailto:office@nenevalleycampers.co.uk?subject=${subject}&body=${body}`;
});
