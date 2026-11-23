
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    });
  });
}

document.querySelectorAll('[data-model]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('model');
    if (select) select.value = link.dataset.model;
  });
});

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const modelSelect = document.getElementById('model');

if (modelSelect) {
  const requestedModel = new URLSearchParams(window.location.search).get('model');

  if (requestedModel && Array.from(modelSelect.options).some(
    option => option.value === requestedModel || option.text === requestedModel
  )) {
    modelSelect.value = requestedModel;
  }
}
