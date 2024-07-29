document.addEventListener("DOMContentLoaded", () => {
    const packagingButtons = document.querySelectorAll('.buttonPackaging');
    const productImages = document.querySelectorAll('.productImage');
    const navigationContainer = document.querySelector('.navigationContainer');
    let currentIndex = 0; 
    const changeInterval = 3000;
    let interval;
    let isDragging = false;
    let startX;
    let endX;

    // Apply styles directly to each image to prevent dragging
    productImages.forEach(image => {
        image.style.pointerEvents = 'none';
    });

    // Function to update the active image based on the button clicked
    packagingButtons.forEach(button => {
        button.addEventListener('click', function() {
            let buttonText = this.textContent.trim();
            if (buttonText === 'Christmas') {
                goToImage(findImageIndex('christmas/christmas-packaging-1.JPG'));
            }
        });
    });

    // Function to find the index of an image by filename
    function findImageIndex(filename) {
        return Array.from(productImages).findIndex(img => img.src.includes(filename));
    }

    // Function to go to a specific image
    function goToImage(index) {
        productImages[currentIndex].classList.remove('active');
        currentIndex = (index + productImages.length) % productImages.length;
        productImages[currentIndex].classList.add('active');
        updateNavigationCircles(currentIndex);
        resetInterval();
    }

    // Function to reset the automatic transition interval
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextImage, changeInterval);
    }

    resetInterval();

    // Function to change to the next image
    function nextImage() {
        goToImage(currentIndex + 1);
    }

    // Function to change to the previous image
    function previousImage() {
        goToImage(currentIndex - 1);
    }

    // Update navigation circles and click functionality
    productImages.forEach((image, index) => {
        let circle = document.createElement('div');
        circle.classList.add('navigationCircle');
        circle.addEventListener('click', () => {
            goToImage(index);
        });
        navigationContainer.appendChild(circle);
    });

    function updateNavigationCircles(activeIndex) {
        let circles = document.querySelectorAll('.navigationCircle');
        circles.forEach((circle, index) => {
            circle.classList.toggle('active', index === activeIndex);
        });
    }

    // Drag handling
    const onDragStart = (event) => {
        isDragging = true;
        startX = event.pageX || event.touches[0].pageX;
    };

    const onDragMove = (event) => {
        if (isDragging) {
            endX = event.pageX || event.touches[0].pageX;
        }
    };

    const onDragEnd = () => {
        if (isDragging && startX && endX) {
            const difference = startX - endX;
            if (difference > 50) { // Dragged left
                nextImage();
            } else if (difference < -50) { // Dragged right
                previousImage();
            }
        }
        isDragging = false;
        startX = null;
        endX = null;
    };

    // Add event listeners for dragging
    const imageContainer = document.querySelector('.imageContainer');
    imageContainer.addEventListener('mousedown', onDragStart);
    imageContainer.addEventListener('mousemove', onDragMove);
    imageContainer.addEventListener('mouseup', onDragEnd);
    imageContainer.addEventListener('mouseleave', onDragEnd);
    imageContainer.addEventListener('touchstart', onDragStart);
    imageContainer.addEventListener('touchmove', onDragMove);
    imageContainer.addEventListener('touchend', onDragEnd);
});

// Select product
document.addEventListener('DOMContentLoaded', () => {
    // Handle product variation selection
    const buttons = document.querySelectorAll('.buttonVariation');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentNode.querySelectorAll('.buttonVariation').forEach(sib => sib.classList.remove('selected'));
            this.classList.add('selected');

            if(this.classList.contains('buttonVolume')) {
                const price = this.dataset.price;
                document.querySelector('.priceVariation').innerText = `RM ${price}`;
            }
        });
    });

    const volumeButtons = document.querySelectorAll('.buttonVolume');
    volumeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedPrice = this.getAttribute('data-price');
            const priceVariations = document.querySelectorAll('.priceVariation');
            // Hide all priceVariations initially
            priceVariations.forEach(price => price.style.display = 'none');
            // Find and display only the correct priceVariation
            Array.from(priceVariations).find(price => price.innerText.includes(`RM ${selectedPrice}`)).style.display = 'inline';
        });
    });

    // Handle quantity changes
    const quantityButtons = document.querySelectorAll('.buttonQuantity');
    const quantityDisplay = document.getElementById('quantity');
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            let currentQuantity = parseInt(quantityDisplay.innerText, 10);
            currentQuantity += this.classList.contains('plus') ? 1 : -1;
            currentQuantity = Math.max(0, currentQuantity); // Ensure quantity doesn't go below 0
            quantityDisplay.innerText = currentQuantity;
        });
    });
    
    // Add to Cart functionality
    const addToCartButton = document.querySelector('.buttonAddtoCart');
    addToCartButton.addEventListener('click', () => {
        // Collect item details
        const selectedItem = {
            name: document.querySelector('.product_name').innerText,
            price: document.querySelector('.priceVariation').innerText,
            volume: document.querySelector('.buttonVolume.selected').innerText,
            packaging: document.querySelector('.buttonPackaging.selected').innerText,
            quantity: document.getElementById('quantity').innerText
        };

        // Update sidebar with the collected item details
        addToCartSidebar(selectedItem);
    });
});

// For the subscription form
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('newsletterForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for subscribing!');
        form.reset();
    });
});

// Function to update the sidebar with the new item
function addToCartSidebar(item) {
    // Implementation depends on how your sidebar is structured.
    // You'd typically create a new element with the item's details and append it to the sidebar.
    console.log('Adding to sidebar:', item);
}
