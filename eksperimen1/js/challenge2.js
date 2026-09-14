const tabs = document.querySelectorAll('[role="tab"]');
tabs.forEach((tab) => {
  console.log(tab);
    tab.addEventListener('click', (e) => {
        jawaban = document.querySelector(`#${tab.getAttribute('aria-controls')}`);
        jawaban.classList.toggle('hidden');
    });
});
