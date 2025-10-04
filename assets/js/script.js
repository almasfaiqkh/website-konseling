// ===================================
// Bagian Fungsi-Fungsi Utama
// ===================================

function showConfession(type) {
    const mainContainer = document.querySelector('.container:not(.d-none)');
    if (mainContainer) {
        mainContainer.classList.add('d-none');
    }
    document.getElementById('back-button').classList.remove('d-none');

    if (type === 'expert') {
        document.getElementById('expert-list').classList.remove('d-none');
    } else if (type === 'anonymous') {
        document.getElementById('anonymous-form').classList.remove('d-none');
    } else if (type === 'article') {
        document.getElementById('article-results').classList.remove('d-none');
        loadArticle();
    }
}

function backToMenu() {
    document.getElementById('expert-list').classList.add('d-none');
    document.getElementById('anonymous-form').classList.add('d-none');
    document.getElementById('confession-results').classList.add('d-none');
    document.getElementById('article-results').classList.add('d-none');
    const mainContainer = document.querySelector('.container');
    mainContainer.classList.remove('d-none');
    document.getElementById('back-button').classList.add('d-none');
}

// ... (Salin semua fungsi async Anda seperti submitConfession, loadConfessions, dll di sini) ...
async function submitConfession() {
    const confessionInput = document.getElementById("confession");
    const confessionText = confessionInput.value.trim();
    if (confessionText === "") {
        alert("Confession tidak boleh kosong!");
        return;
    }
    let formData = new FormData();
    formData.append("confession", confessionText);
    try {
        let response = await fetch("includes/submit.php", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            confessionInput.value = "";
            document.getElementById("anonymous-form").classList.add("d-none");
            document.getElementById("confession-results").classList.remove("d-none");
            await loadConfessions();
        } else {
            alert("Gagal menyimpan confession.");
        }
    } catch (error) {
        console.error('Error submitting confession:', error);
        alert('Terjadi kesalahan saat mengirim confession.');
    }
}

async function loadConfessions() {
    try {
        let response = await fetch("includes/load.php");
        if (response.ok) {
            document.getElementById("confession-list").innerHTML = await response.text();
        } else {
            document.getElementById("confession-list").innerHTML = "<p>Error loading confessions.</p>";
        }
    } catch (error) {
        console.error('Error loading confessions:', error);
        document.getElementById("confession-list").innerHTML = "<p>Gagal memuat confessions.</p>";
    }
}

async function loadArticle() {
    try {
        let response = await fetch("includes/article.php");
        if (response.ok) {
            document.getElementById("article-content").innerHTML = await response.text();
        } else {
            document.getElementById("article-content").innerHTML = "Gagal memuat artikel.";
        }
    } catch (error) {
        console.error('Error loading article:', error);
        document.getElementById("article-content").innerHTML = "Gagal memuat artikel.";
    }
}


// =================================================================
// SEMUA KODE YANG BERINTERAKSI DENGAN ELEMEN MASUK KE DALAM SINI
// =================================================================
document.addEventListener("DOMContentLoaded", function () {

    // --- EVENT LISTENER ASLI (Back & Confess Form) ---
    const confessForm = document.getElementById("confessForm");
    const backButton = document.getElementById("back-button");
    if (backButton) { backButton.addEventListener("click", backToMenu); }
    if (confessForm) { confessForm.onsubmit = async function (e) { e.preventDefault(); await submitConfession(); }; }

    // --- ROTASI TEKS ---
    const texts = [ "Bersama ahli atau ungkapkan isi hatimu <br> Mulai confession-mu sekarang!", "Terhubung dengan para ahli atau ungkapkan dirimu <br> Mulai confession-mu hari ini", "Jangan pendam sendiri, Ungkapkan perasaanmu <br> dan Dapatkan dukungan", "Sampaikan ceritamu dengan bebas <br> Karena setiap perasaan itu berharga", "Bagikan isi hati tanpa rasa takut <br> Temukan ketenangan dalam kata-kata", "Bebaskan isi hatimu tanpa rasa khawatir <br> Karena setiap cerita layak didengar", "Jujurlah pada dirimu sendiri <br> Temukan kedamaian dalam kejujuran", "Berbagi bukan kelemahan <br> Kadang kita hanya butuh didengar", "Perasaanmu itu penting <br> Jangan biarkan dirimu berjuang sendirian", "Mulai confession-mu sekarang <br> Sebuah langkah kecil menuju kelegaan besar", "Tak perlu berpura-pura kuat <br> Di sini, kamu bisa menjadi diri sendiri", "Curahkan isi hatimu <br> Karena setiap emosi berhak untuk diakui" ];
    let index = 0;
    const textElement = document.getElementById("confessionText");
    if (textElement) {
        function changeText() { textElement.style.opacity = "0"; setTimeout(() => { index = (index + 1) % texts.length; textElement.innerHTML = texts[index]; textElement.style.opacity = "1"; }, 1000); }
        setInterval(changeText, 6000);
    }
    
    // --- LOGIKA UNTUK MODAL POPUP WHATSAPP (HANYA UNTUK DARK MODE) ---
    const modalOverlay = document.getElementById('whatsapp-modal');
    if (modalOverlay) {
        const modalContent = document.querySelector('.modal-content');
        const modalExpertName = document.getElementById('modal-expert-name');
        const modalExpertPhone = document.getElementById('modal-expert-phone');
        const modalTextarea = document.getElementById('modal-textarea');
        const modalSendBtn = document.getElementById('modal-send-btn');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const openModalButtons = document.querySelectorAll('.btn-open-modal');

        function openModal(nama, nomor) { modalExpertName.textContent = nama; modalExpertPhone.value = nomor; modalTextarea.value = ''; modalOverlay.style.display = 'flex'; setTimeout(() => { modalOverlay.style.opacity = '1'; modalContent.style.transform = 'scale(1)'; }, 10); }
        function closeModal() { modalOverlay.style.opacity = '0'; modalContent.style.transform = 'scale(0.9)'; setTimeout(() => { modalOverlay.style.display = 'none'; }, 300); }

        openModalButtons.forEach(button => { button.addEventListener('click', function () { const nama = this.getAttribute('data-nama-ahli'); const nomor = this.getAttribute('data-nomor-ahli'); openModal(nama, nomor); }); });
        modalSendBtn.addEventListener('click', function () { const nomorTujuan = modalExpertPhone.value; const pesan = modalTextarea.value.trim(); if (pesan === "") { alert("Silakan tulis pesan Anda terlebih dahulu."); modalTextarea.focus(); return; } const pesanEncoded = encodeURIComponent(pesan); const waUrl = `https://wa.me/${nomorTujuan}?text=${pesanEncoded}`; window.open(waUrl, '_blank'); closeModal(); });
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function (event) { if (event.target === modalOverlay) { closeModal(); } });
    }

    // --- KODE UNTUK DARK MODE TOGGLE ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (darkModeToggle) {
        const enableDarkMode = () => { body.classList.add('dark-mode'); localStorage.setItem('darkMode', 'enabled'); };
        const disableDarkMode = () => { body.classList.remove('dark-mode'); localStorage.setItem('darkMode', 'disabled'); };
        if (localStorage.getItem('darkMode') === 'enabled') { enableDarkMode(); darkModeToggle.checked = true; }
        darkModeToggle.addEventListener('change', () => { if (darkModeToggle.checked) { enableDarkMode(); } else { disableDarkMode(); } });
    }

});