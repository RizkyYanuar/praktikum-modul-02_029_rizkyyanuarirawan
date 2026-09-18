const stateLoading = document.getElementById('state-loading');
const stateError = document.getElementById('state-error');
const stateEmpty = document.getElementById('state-empty');
const profileCard = document.getElementById('profile-card');
const btnRetry = document.getElementById('btn-retry');

const profileName = document.getElementById('profile-name');
const profileRole = document.getElementById('profile-role');
const profileBio = document.getElementById('profile-bio');
const skillList = document.getElementById('skill-list');

const btnDetail = document.getElementById('btn-detail');
const profileDetail = document.getElementById('profile-detail');
const formSkill = document.getElementById('form-skill');
const inputSkill = document.getElementById('input-skill');

let currentSkills = new Set(); 

function showState(state) {
    stateLoading.classList.add('hidden');
    stateError.classList.add('hidden');
    stateEmpty.classList.add('hidden');
    profileCard.classList.add('hidden');

    if (state === 'loading') stateLoading.classList.remove('hidden');
    if (state === 'error') stateError.classList.remove('hidden');
    if (state === 'empty') stateEmpty.classList.remove('hidden');
    if (state === 'success') profileCard.classList.remove('hidden');
}

async function fetchProfileData() {
    showState('loading');
    
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        const response = await fetch('data/profile.json');
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            showState('empty');
            return;
        }

        renderProfile(data);
        showState('success');
    } catch (error) {
        console.error("Error:", error);
        showState('error'); 
    }
}

function renderProfile(data) {
    profileName.textContent = data.name;
    profileRole.textContent = data.role;
    profileBio.textContent = data.bio;

    skillList.innerHTML = '';
    currentSkills.clear();

    if (data.skills && Array.isArray(data.skills)) {
        data.skills.forEach(skill => addSkillToDOM(skill));
    }
}

function addSkillToDOM(skillName) {
    if (currentSkills.has(skillName.toLowerCase())) return;
    
    currentSkills.add(skillName.toLowerCase());

    const li = document.createElement('li');
    li.textContent = skillName;

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Hapus';
    btnDelete.className = 'btn-delete';
    
    btnDelete.addEventListener('click', () => {
        li.remove();
        currentSkills.delete(skillName.toLowerCase());
    });

    li.appendChild(btnDelete);
    skillList.appendChild(li);
}

btnDetail.addEventListener('click', () => {
    profileDetail.classList.toggle('hidden');
    
    const isExpanded = btnDetail.getAttribute('aria-expanded') === 'true';
    btnDetail.setAttribute('aria-expanded', !isExpanded);
    
    btnDetail.textContent = !isExpanded ? 'Tutup Detail' : 'Lihat Detail';
});

formSkill.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const newSkill = inputSkill.value.trim();

    if (newSkill === '') {
        alert('Input keterampilan tidak boleh kosong!');
        return;
    }

    if (currentSkills.has(newSkill.toLowerCase())) {
        alert('Keterampilan sudah ada dalam daftar.');
        inputSkill.value = '';
        return;
    }

    addSkillToDOM(newSkill);
    inputSkill.value = ''; 
});

btnRetry.addEventListener('click', fetchProfileData);

fetchProfileData();