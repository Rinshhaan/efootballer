/**
 * CONFIGURATION
 * Replace the number with your actual WhatsApp number (CountryCode + Number)
 */
const ADMIN_WHATSAPP = "919876543210"; 

/**
 * PRODUCT DATABASE
 * isSoldOut: true -> Shows the centered Red Banner
 * images: Array of images for the carousel slider
 */
const products = [
    {
        id: 1,
        title: "Messi 99 Legendary ID",
        price: "$49.99",
        isSoldOut: true, 
        description: "Includes 2015 Big Time Messi, 102 Rated Squad, and 4000 eFootball Coins. Fully optimized manager proficiency.",
        images: [
            "https://picsum.photos/id/237/800/500",
            "https://picsum.photos/id/238/800/500",
            "https://picsum.photos/id/239/800/500"
        ]
    },
    {
        id: 2,
        title: "Ronaldo Elite Account",
        price: "$35.00",
        isSoldOut: false,
        description: "Features Epic CR7, Real Madrid full squad, and 10+ Legendary players. Division 1 ready.",
        images: [
            "https://picsum.photos/id/240/800/500",
            "https://picsum.photos/id/241/800/500"
        ]
    },
    {
        id: 3,
        title: "Neymar Santos Edition",
        price: "$40.00",
        isSoldOut: false,
        description: "Special Santos FC Neymar Jr card with 99 dribbling. Includes many Epic Brazil legends.",
        images: [
            "https://picsum.photos/id/242/800/500"
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