const WHATS_NUM = "919876543210";
const firebaseConfig = { databaseURL: "https://efootballer-2ac2c-default-rtdb.firebaseio.com" };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const grid = document.getElementById('productGrid');
const modal = document.getElementById('imageModal');
const carousel = document.getElementById('carouselMediaContainer');

let products = [];
let activeP = null, mediaIdx = 0;

db.ref('products').on('value', (snap) => {
    const data = snap.val();
    products = data ? Object.values(data) : [];
    render(products);
});

function render(items) {
    grid.innerHTML = "";
    items.forEach(p => {
        const card = document.createElement('div');
        card.className = `card ${p.soldOut ? 'sold-out' : ''}`;
        card.innerHTML = `
            <div class="card-img-holder">
                ${p.soldOut ? '<div class="sold-out-badge">SOLD OUT</div>' : ''}
                <img src="${p.media[0].data}">
            </div>
            <div class="card-info">
                <h3>${p.title}</h3>
                <p class="glow-text">${p.price}</p>
            </div>
        `;
        card.onclick = () => { activeP = p; mediaIdx = 0; openM(); };
        grid.appendChild(card);
    });
}

function openM() {
    document.getElementById('modalTitle').innerText = activeP.title;
    document.getElementById('modalDescription').innerText = activeP.desc;
    document.getElementById('modalBuyBtn').href = `https://wa.me/${WHATS_NUM}?text=Buy: ${activeP.title}`;
    modal.style.display = 'flex';
    updateMedia();
}

function updateMedia() {
    const item = activeP.media[mediaIdx];
    const old = carousel.querySelector('img, video');
    if(old) old.remove();

    const el = document.createElement(item.type === 'video' ? 'video' : 'img');
    el.src = item.data;
    if(item.type === 'video') { el.controls = true; el.autoplay = true; }
    carousel.insertBefore(el, carousel.querySelector('.next-btn'));
}

document.querySelector('.next-btn').onclick = () => { mediaIdx = (mediaIdx+1)%activeP.media.length; updateMedia(); };
document.querySelector('.prev-btn').onclick = () => { mediaIdx = (mediaIdx-1+activeP.media.length)%activeP.media.length; updateMedia(); };
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
