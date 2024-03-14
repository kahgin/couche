// Product data for shop all page
const products = [
    { 
        name: 'Fir Tree', 
        description: 'A fir tree fragrance candle that transports you to Christmas with its nostalgic and festive aroma.', 
        scentNotes: 'Fresh pine, Woody Undertone, Subtle Hints of Citrus' 
    },
    { 
        name: 'After Rain Garden', 
        description: 'A garden exploding in full bloom with our fresh, botanical English Garden fragrance.', 
        scentNotes: 'Green, Leaves, Lily, Jasmine' 
    },
    { 
        name: 'Bergamot Vetiver', 
        description: 'Aroma blend that combines light, citrus and warm, woody notes.', 
        scentNotes: 'Sandalwood, Bergamot, Vetiver' 
    },
    { 
        name: 'Black Tea', 
        description: 'A refreshing fragrance that smells like Pu Erh Tea / Black Tea.', 
        scentNotes: 'Fig Tree, Tea, Sandalwood' 
    },
    { 
        name: 'Earl Grey Tea', 
        description: 'Deep and rich, its honey tones, fresh cucumber and touches of tobacco and vanilla bring an elegant to the fragrance.', 
        scentNotes: 'Jasmine, Cucumber, Cedarwood' 
    },
    { 
        name: 'Lychee Rosa', 
        description: 'A fragrance that has both sweetly floral as well as earthy and herbaceous.', 
        scentNotes: 'Citrus, Lychee, Rose' 
    },
    { 
        name: 'Noir Saffron', 
        description: 'A seductive blend of aromatic herbs, warm amber, and wood.', 
        scentNotes: 'Bergamot, Violet, Saffron' 
    },
    { 
        name: 'Oakmoss Amber', 
        description: 'Smells earthy, and woody, sensual with hints of musk and amber.', 
        scentNotes: 'Sage, Lavender, Oakmoss' 
    },
    { 
        name: 'Orchid Driftwood', 
        description: 'A smooth and elegant blend of soft floral notes with salty highlights and touches of sandalwood.', 
        scentNotes: 'Ozone, Lily, Sandalwood' 
    },
    { 
        name: 'Peach Oolong Tea', 
        description: 'Fragrant and sweet like a perfectly ripe fruit, with a smooth astringency and lingering floral aroma.', 
        scentNotes: 'Peach, Oolong, Jasmine' 
    },
    { 
        name: 'White Tea', 
        description: 'A luxurious fragrance that smells like Marina Bay Sands.', 
        scentNotes: 'Lemon, Bergamot, White Tea' 
    }
];

// Get the name of the image using the name above with '-' replacing the empty space
function createProductListing(product) {
    const productListing = document.createElement('div');
    productListing.classList.add('productListing');
    
    const imageName = product.name.toLowerCase().replace(/ /g, '-');
    const imagePath = `assets/product/scentedCandle/${imageName}.PNG`;
    const hoverImagePath = `assets/product/scentedCandle/${imageName}-1.PNG`;

    productListing.innerHTML = `
        <img class="productListingImage" src="${imagePath}" data-hover-src="${hoverImagePath}" alt="${product.name}">
        <div class="productListingDesc">
            <h3>${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            <p class="scentNotes"><strong>Scent Notes:</strong> ${product.scentNotes}</p>
            <button type="button" class="buttonAddtoCart">Add to Cart</button>
        </div>
    `;

    productListing.onclick = function() {
        location.href = `product/product-scented-candle-${imageName}.html`;
    };

    // Event listeners to change the image on hover
    const imgElement = productListing.querySelector('.productListingImage');
    imgElement.addEventListener('mouseenter', function() {
        imgElement.src = imgElement.getAttribute('data-hover-src');
    });
    imgElement.addEventListener('mouseleave', function() {
        imgElement.src = imagePath;
    });

    return productListing;
}

// Function to display all products
function displayProducts() {
    const productListContainer = document.getElementById('productListContainer');

    products.forEach(product => {
        const productListing = createProductListing(product);
        productListContainer.appendChild(productListing);
    });
}

// Call the function to display products
displayProducts();