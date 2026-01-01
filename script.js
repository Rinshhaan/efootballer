// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "919876543210"; 
const firebaseConfig = {
    databaseURL: "https://efootballer-2ac2c-default-rtdb.firebaseio.com" // Get this from Firebase Console
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const grid = document.getElementById('productGrid');
const modal = document.getElementById('imageModal');
const mediaWrap = document.getElementById('carouselMediaContainer');

let allProducts = [];
let currentP = null, mediaIdx = 0;

// Fetch Data from Firebase
db.ref('products').on('value', (snapshot) => {
    const data = snapshot.val();
    allProducts = data ? Object.values(data) : [];
    renderGrid(allProducts);
});

function renderGrid(items) {
    grid.innerHTML = items.length ? "" : "<p>No products available.</p>";
    items.forEach(p => {
        const card = document.createElement('div');
        card.className = `card ${p.soldOut ? 'sold-out' : ''}`;
        card.innerHTML = `
            <div class="card-img-holder">
                ${p.soldOut ? '<div class="sold-out-badge">SOLD OUT</div>' : ''}
                <img src="${p.media[0].data}" alt="thumbnail">
            </div>
            <div class="card-info">
                <h3>${p.title}</h3>
                <p class="glow-text">${p.price}</p>
            </div>
        `;
        card.onclick = () => { currentP = p; mediaIdx = 0; openModal(); };
        grid.appendChild(card);
    });
}

function openModal() {
    document.getElementById('modalTitle').innerText = currentP.title;
    document.getElementById('modalDescription').innerText = currentP.desc;
    document.getElementById('modalPrice').innerText = currentP.price;
    document.getElementById('modalBuyBtn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=I want to buy: ${currentP.title}`;
    modal.style.display = 'flex';
    updateMedia();
}

function updateMedia() {
    const item = currentP.media[mediaIdx];
    // Clear old media
    const old = mediaWrap.querySelector('img, video');
    if(old) old.remove();

    const el = document.createElement(item.type === 'video' ? 'video' : 'img');
    el.src = item.data;
    if(item.type === 'video') { el.controls = true; el.autoplay = true; }
    mediaWrap.insertBefore(el, mediaWrap.querySelector('.next-btn'));
}

// Carousel Controls
document.querySelector('.next-btn').onclick = () => { mediaIdx = (mediaIdx + 1) % currentP.media.length; updateMedia(); };
document.querySelector('.prev-btn').onclick = () => { mediaIdx = (mediaIdx - 1 + currentP.media.length) % currentP.media.length; updateMedia(); };
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

// Search Filter
document.getElementById('searchInput').oninput = (e) => {
    const val = e.target.value.toLowerCase();
    renderGrid(allProducts.filter(p => p.title.toLowerCase().includes(val)));
};

document.getElementById('mainWhatsapp').href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!`;
