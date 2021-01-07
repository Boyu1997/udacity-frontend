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
    const activeSections = document.querySelectorAll('.active-section');
    activeSections.forEach((activeSection) => {
        activeSection.className = '';
    });

    const activeNavs = document.querySelectorAll('.active-nav');
    activeNavs.forEach((activeNav) => {
        activeNav.className = 'menu__link';
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
    const navItemLink = document.createElement('a');
    navItemLink.className = section.className == 'active-section' ? 'menu__link active-nav' : 'menu__link';
    navItemLink.setAttribute('id', `${section.id}-nav`);
    navItemLink.setAttribute('target-section-id', section.id);
    navItemLink.textContent = section.getAttribute('data-nav');

    const navItem = document.createElement('li')
    navItem.appendChild(navItemLink);
    nav.appendChild(navItem);
});


// Add class 'active' to section when near top of viewport

document.addEventListener('scroll', () => {
    let activeSessionId = sections[sections.length-1].getAttribute('id');
    let activeSessionSelected = false;
    sections.forEach((session) => {
        if (session.getBoundingClientRect()['y'] >= 0 && activeSessionSelected === false) {
            activeSessionId = session.getAttribute('id');
            activeSessionSelected = true;
        }
    });
    resetAllActives();
    document.querySelector(`#${activeSessionId}`).className = 'active-section';
    document.querySelector(`#${activeSessionId}-nav`).className = 'menu__link active-nav';
})


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
        targetSection.scrollIntoView({behavior: "smooth"});
    });
});


// Set sections as active
