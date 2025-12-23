/**
 * CONFIGURATION
 * Replace the number with your actual WhatsApp number (CountryCode + Number)
 */
const ADMIN_WHATSAPP = "918078240018"; 

/**
 * PRODUCT DATABASE
 * isSoldOut: true -> Shows the centered Red Banner
 * images: Array of images for the carousel slider
 */
const products = [
    {
        id: 1,
        title: "BIG TIME NEY X OSIMHEN X RAPHI X GUARDIOLA X ODDO",
        price: "₹1249",
        isSoldOut: true, 
        description: "BIG TIME NEY X OSIMHEN X RAPHI X GUARDIOLA X ODDO",
        images: [
            "1.jpg"
        ]
    },
    {
        id: 2,
        title: "BIGTIME YAMAL X BLITZ RAUL",
        price: "₹399",
        isSoldOut: false,
        description: "BIGTIME YAMAL X BLITZ RAUL x best budget id to grow",
        images: [
            "2.jpg"
        ]
    },
    {
        id: 3,
        title: "MINI BEAST ID X FORLAN X BLITZ GIROUD C X VITINHA X PALMET X CECH",
        price: "₹3500",
        isSoldOut: false,
        description: "MINI BEAST ID X FORLAN X BLITZ GIROUD C X VITINHA X PALMET X CECH",
        images: [
            "3.jpg"
        ]
    },    {
        id: 4,
        title: "COLE X NEYMAR X VARDY X BALANCED ONE",
        price: "₹1549",
        isSoldOut: false,
        description: "COLE X NEYMAR X VARDY X BALANCED ONE",
        images: [
            "4.jpg"
        ]
    }, {
        id: 5,
        title: "VILLA X SALAH X SUAREZ X NEYMAR COMBO",
        price: "₹3300",
        isSoldOut: false,
        description: "VILLA X SALAH X SUAREZ X NEYMAR COMBO",
        images: [
            "69623c3b-013d-4866-b161-24a8e7a2ef71.jpeg"
        ]
    }
];

// --- SELECT ELEMENTS ---
const grid = document.getElementById('productGrid');
const search = document.getElementById('searchInput');
const modal = document.getElementById('imageModal');
const mImg = document.getElementById('modalImage');
const mTitle = document.getElementById('modalTitle');
const mPrice = document.getElementById('modalPrice');
const mDesc = document.getElementById('modalDescription');
const mBuyBtn = document.getElementById('modalBuyBtn');

let currentProduct = null;
let currentImgIndex = 0;

/**
 * RENDER THE GRID
 */
function render(items) {
    grid.innerHTML = "";
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.isSoldOut ? 'sold-out' : ''}`;
        
        // Sold out logic
        const badge = item.isSoldOut ? `<div class="sold-out-badge">SOLD OUT</div>` : "";

        card.innerHTML = `
            <div class="card-img-holder">
                ${badge}
                <img src="${item.images[0]}" alt="eFootball ID">
            </div>
            <div class="card-info">
                <h3>${item.title}</h3>
                <p class="price">${item.price}</p>
            </div>
        `;
        
        card.onclick = () => openModal(item);
        grid.appendChild(card);
    });
}

/**
 * MODAL & CAROUSEL LOGIC
 */
function openModal(p) {
    currentProduct = p;
    currentImgIndex = 0;

    mTitle.innerText = p.title;
    mPrice.innerText = `Price: ${p.price}`;
    mDesc.innerText = p.description;
    
    // Set WhatsApp link for specific product
    mBuyBtn.href = `https://wa.me/${ADMIN_WHATSAPP}?text=I am interested in: ${p.title}`;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scroll
    updateCarousel();
}

function updateCarousel() {
    mImg.src = currentProduct.images[currentImgIndex];
    
    // Hide arrows if only one image
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(b => b.style.display = currentProduct.images.length > 1 ? 'block' : 'none');
}

document.querySelector('.next-btn').onclick = (e) => {
    e.stopPropagation();
    currentImgIndex = (currentImgIndex + 1) % currentProduct.images.length;
    updateCarousel();
};

document.querySelector('.prev-btn').onclick = (e) => {
    e.stopPropagation();
    currentImgIndex = (currentImgIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
    updateCarousel();
};

// Close modal
document.querySelector('.close-modal').onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.onclick = (e) => { if(e.target === modal) document.querySelector('.close-modal').onclick(); };

/**
 * SEARCH LOGIC
 */
search.oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(val) || 
        p.description.toLowerCase().includes(val)
    );
    render(filtered);
};

// INITIALIZE
document.getElementById('mainWhatsapp').href = `https://wa.me/${ADMIN_WHATSAPP}?text=Hello Admin, I have a question.`;

render(products);


