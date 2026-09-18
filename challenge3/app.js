const btnLoad = document.getElementById('btn-load');
const btnRetry = document.getElementById('btn-retry');

const stateInitial = document.getElementById('state-initial');
const stateLoading = document.getElementById('state-loading');
const stateSuccess = document.getElementById('state-success');
const stateError = document.getElementById('state-error');
const stateEmpty = document.getElementById('state-empty');

const quoteText = document.getElementById('quote-text');
const errorMessage = document.getElementById('error-message');

function setUIState(state, msg = '') {
    stateInitial.classList.add('hidden');
    stateLoading.classList.add('hidden');
    stateSuccess.classList.add('hidden');
    stateError.classList.add('hidden');
    stateEmpty.classList.add('hidden');
    
    btnLoad.classList.remove('hidden');
    btnRetry.classList.add('hidden');

    switch(state) {
        case 'loading':
            stateLoading.classList.remove('hidden');
            btnLoad.disabled = true; 
            btnLoad.textContent = 'Memuat...';
            break;
        case 'success':
            stateSuccess.classList.remove('hidden');
            btnLoad.disabled = false;
            btnLoad.textContent = 'Muat Tips Lainnya';
            break;
        case 'empty':
            stateEmpty.classList.remove('hidden');
            btnLoad.disabled = false;
            btnLoad.textContent = 'Cek Lagi';
            break;
        case 'error':
            stateError.classList.remove('hidden');
            errorMessage.textContent = msg; 
            btnLoad.classList.add('hidden');
            btnRetry.classList.remove('hidden'); 
            break;
    }
}

function artificialDelay() {
    const delay = Math.floor(Math.random() * 1000) + 500;
    return new Promise(resolve => setTimeout(resolve, delay));
}

function simulateNetworkInstability() {
    return new Promise((resolve, reject) => {
        const isFailed = Math.random() < 0.3;
        if (isFailed) {
            reject(new Error("Simulasi jaringan gagal (30% chance)."));
        } else {
            resolve();
        }
    });
}

async function fetchRandomQuote() {
    try {
        setUIState('loading');

        await artificialDelay();
        await simulateNetworkInstability();

        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            setUIState('empty');
            return;
        }

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex];

        quoteText.textContent = `"${randomItem.text}"`;
        setUIState('success');

    } catch (error) {
        console.error("Log Error (Tidak disembunyikan):", error);
        setUIState('error', error.message);
    }
}

btnLoad.addEventListener('click', fetchRandomQuote);
btnRetry.addEventListener('click', fetchRandomQuote);