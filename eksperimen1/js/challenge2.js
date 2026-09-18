const tabs = document.querySelectorAll('[role="tab"]');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const isCurrentlyExpanded = tab.getAttribute('aria-expanded') === 'true';

        tabs.forEach((otherTab) => {
            const otherJawabanId = otherTab.getAttribute('aria-controls');
            const otherJawaban = document.getElementById(otherJawabanId);
            
            otherJawaban.classList.add('hidden');
            otherTab.setAttribute('aria-expanded', 'false');
        });

        if (!isCurrentlyExpanded) {
            const jawabanId = tab.getAttribute('aria-controls');
            const jawaban = document.getElementById(jawabanId);
            
            jawaban.classList.remove('hidden');
            tab.setAttribute('aria-expanded', 'true');
        }
    });
});