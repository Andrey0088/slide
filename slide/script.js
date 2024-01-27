let track = document.querySelector('.carousel__track');
let slides = Array.from(track.children);
let nextButton = document.querySelector('.carousel__button--next');
let prevButton = document.querySelector('.carousel__button--prev');
let dotsNav = document.querySelector('.carousel__nav');
let dots = Array.from(dotsNav.children);

let slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Move slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Update dots
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

// When I click left, move slides to the left
prevButton.addEventListener('click', e => {
    let currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;

    if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    }
});

// When I click right, move slides to the right
nextButton.addEventListener('click', e => {
    let currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;

    if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }
});

// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // What indicator was clicked on?
    let targetDot = e.target.closest('button');

    if (!targetDot) return;

    let currentSlide = track.querySelector('.current-slide');
    let currentDot = dotsNav.querySelector('.current-slide');
    let targetIndex = dots.findIndex(dot => dot === targetDot);
    let targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

// Create dots
const createDots = () => {
    slides.forEach((slide, index) => {
        let dot = document.createElement('button');
        dot.classList.add('carousel__indicator');
        if (index === 0) {
            dot.classList.add('current-slide');
        }
        dotsNav.appendChild(dot);
    });
};

createDots();
dots = Array.from(dotsNav.children); // Re-get the dots now that they have been added

