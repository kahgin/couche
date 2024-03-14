// Home banner image
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector("#bannerImage");
    let currentIndex = 0;
    let isDragging = false;
    let startX, moveX;

    function showNextImage(index) {
        currentIndex = index;
        const scrollValue = currentIndex * window.innerWidth;
        banner.scrollTo({ left: scrollValue, behavior: 'smooth' });
        updateCircleStyles();
    }

    function createNavigationCircle(index) {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.addEventListener("click", () => showNextImage(index));
        circlesContainer.appendChild(circle);
    }

    function updateCircleStyles() {
        const circles = circlesContainer.children;
        for (let i = 0; i < circles.length; i++) {
            circles[i].classList.remove("active");
            if (i === currentIndex) {
                circles[i].classList.add("active");
            }
        }
    }

    function initializeNavigationCircles() {
        for (let i = 0; i < banner.children.length; i++) {
            createNavigationCircle(i);
        }
        updateCircleStyles();
    }

    // Touch events
    banner.addEventListener('touchstart', startDrag);
    banner.addEventListener('touchmove', dragImage);
    banner.addEventListener('touchend', endDrag);

    // Mouse events
    banner.addEventListener('mousedown', startDrag);
    banner.addEventListener('mousemove', dragImage);
    banner.addEventListener('mouseup', endDrag);
    banner.addEventListener('mouseleave', endDrag);

    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function dragImage(e) {
        if (!isDragging) return;
        e.preventDefault();
        moveX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        if (startX - moveX > 50) {
            showNextImage((currentIndex + 1) % banner.children.length);
        } else if (moveX - startX > 50) {
            showNextImage((currentIndex - 1 + banner.children.length) % banner.children.length);
        }
    }

    // Create a container for navigation circles
    const circlesContainer = document.createElement("div");
    circlesContainer.className = "navigationCircles";

    // Append the container after the banner element
    banner.parentNode.insertBefore(circlesContainer, banner.nextSibling);

    const images = banner.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('touchstart', startDrag);
        img.addEventListener('touchmove', dragImage);
        img.addEventListener('touchend', endDrag);
        img.addEventListener('mousedown', startDrag);
        img.addEventListener('mousemove', dragImage);
        img.addEventListener('mouseup', endDrag);
        img.addEventListener('mouseleave', endDrag);
    });

    initializeNavigationCircles();
    setInterval(() => showNextImage((currentIndex + 1) % banner.children.length), 5000);
});