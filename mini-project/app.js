const projectData = [
    { id: 1, title: 'Program Manajemen Warnet', category: 'Aplikasi', desc: 'Sistem pencatatan transaksi dan durasi menggunakan bahasa C.' },
    { id: 2, title: 'Verifact', category: 'Web', desc: 'Website untuk verifikasi sebuah berita, klaim, ataupun isu.' },
    { id: 3, title: 'Manajemen Barang', category: 'Web', desc: 'Sistem manajemen inventaris berbasis web.' },
    { id: 4, title: 'Landing Page Interaktif', category: 'Web', desc: 'Proyek web statis responsif tanpa framework (Vanilla JS).' }
];

const btnMobileMenu = document.getElementById('btn-mobile-menu');
const navMenu = document.getElementById('nav-menu');

btnMobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = btnMobileMenu.getAttribute('aria-expanded') === 'true';
    btnMobileMenu.setAttribute('aria-expanded', !isExpanded);
});

navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        btnMobileMenu.setAttribute('aria-expanded', 'false');
    }
});

const gridContainer = document.getElementById('project-grid');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.btn-filter');

function renderProjects(category) {
    gridContainer.innerHTML = '';
    
    const filtered = category === 'Semua' ? projectData : projectData.filter(p => p.category === category);
    
    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = item.category; 
            
            const title = document.createElement('h3');
            title.textContent = item.title;
            
            const desc = document.createElement('p');
            desc.textContent = item.desc;
            
            card.appendChild(tag);
            card.appendChild(title);
            card.appendChild(desc);
            gridContainer.appendChild(card);
        });
    }
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        renderProjects(e.target.getAttribute('data-filter'));
    });
});

renderProjects('Semua');

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        accordionHeaders.forEach(otherHeader => {
            otherHeader.setAttribute('aria-expanded', 'false');
            otherHeader.nextElementSibling.style.maxHeight = null;
        });
        
        if (!isExpanded) {
            this.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

const contactForm = document.getElementById('contact-form');
const formContainer = document.getElementById('form-container');
const successMessage = document.getElementById('success-message');
const successTitle = document.getElementById('success-title');
const btnReset = document.getElementById('btn-reset');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const errName = document.getElementById('err-name');
    const errEmail = document.getElementById('err-email');
    
    let isValid = true;
    
    errName.textContent = '';
    errEmail.textContent = '';
    
    if (nameInput.value.trim() === '') {
        errName.textContent = 'Nama tidak boleh kosong.';
        isValid = false;
    }
    
    // regex utnuk Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        errEmail.textContent = 'Email tidak boleh kosong.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        errEmail.textContent = 'Format email tidak valid.';
        isValid = false;
    }
    
    if (isValid) {
        successTitle.textContent = 'Terima kasih, ' + nameInput.value.trim() + '!';
        formContainer.classList.add('hidden');
        successMessage.classList.remove('hidden');
        contactForm.reset();
    }
});

btnReset.addEventListener('click', () => {
    successMessage.classList.add('hidden');
    formContainer.classList.remove('hidden');
});

const btnBackToTop = document.getElementById('btn-back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnBackToTop.classList.remove('hidden');
    } else {
        btnBackToTop.classList.add('hidden');
    }
});

btnBackToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const btnTheme = document.getElementById('btn-theme');

btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        btnTheme.textContent = 'Terang';
        btnTheme.setAttribute('aria-label', 'Ganti ke Tema Terang');
    } else {
        btnTheme.textContent = 'Gelap';
        btnTheme.setAttribute('aria-label', 'Ganti ke Tema Gelap');
    }
});