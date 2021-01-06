/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function resetAllActives() {
    const allActives = document.querySelectorAll('.your-active-class');
    allActives.forEach((active) => {
        active.className = '';
    });
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const nav = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

sections.forEach((section) => {
    console.log(section);

    const navItemLink = document.createElement('a');
    navItemLink.className = 'menu__link';
    navItemLink.setAttribute('target-section-id', section.id)
    navItemLink.textContent = section.getAttribute('data-nav');

    const navItem = document.createElement('li')
    navItem.appendChild(navItemLink);
    nav.appendChild(navItem);
});


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

const navItemLinks = document.querySelectorAll('.menu__link');

navItemLinks.forEach((navItemLink) => {
    navItemLink.addEventListener('click', () => {
        const targetSectionId = navItemLink.getAttribute('target-section-id');
        const targetSection = document.querySelector(`#${targetSectionId}`);
        targetSection.scrollIntoView();

        resetAllActives();
        targetSection.className = 'your-active-class';
    });
});


// Set sections as active


