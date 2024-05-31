'use strict';

///////////////////////////////////////
// Modal window

// Gets the first element with class .modal
const modal = document.querySelector('.modal');
// Gets element with the overlay class which is blurred background
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
// Gets all the elements with class .btn--show-modal, which is Open account button and open your free account today button
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  // default action that belongs to the event will not occur. E.g., clicking on a link, prevent the link from following the URL
  // console.log(e);
  // e in this case is a pointing event
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// console.log(btnsOpenModal.forEach(smt => console.log(smt)));

// btn is a parameter of an arrow function with a value of a show modal element that goes throught all the objects in a node list because of forEach function
// each button gets an event listener added
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

// Creates a DOM object that we can use, but not yet in the DOM itself because you need to manually insert it
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>>';
// // Inserts the element after header element
// header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // Removes the element
//     message.remove();
//   });

// Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // Gets section 1 coordinates
  // getBoundingClientRect coordinates returns size of an element and its position relative to the viewport and not to the top of the webpage
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // Current scroll position (from the top of the current viewport position to the top of the webpage)
  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
  // Current size of the viewport
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // Scrolling function (left position, top position)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  // modern solution but only works for the new broswers
  // section1.scrollIntoView({ behavior: 'smooth' });
});
// Page navigation
const navLinks = document.querySelector('.nav__links');

// Adding event listener to the common parent
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    // .target stores where the event actually happened
    // contains method return true if a node is a descendant(child, grandchild, etc.) of node
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});
// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  /* Guard clause - conditional statement at the beginning of a function to check for specific 
  condition, when these condition are met, the function returns early, preventing the rest 
  of the code from executing */
  // Null is a falsy value, which means if the clicked === null the function would return
  if (!clicked) return;
  // Removes the class first for each element and only then tab activates on an element that has been clicked
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
// Questions why does this === opacity and why does handlehover.bind work
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
/* bind method creates a copy of a function that it's called on and it would set .this 
keyword to whatever value we pass in the bind*/
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// Sticky navigation
// Scroll event is't really efficient and should be avoided because it's bad for the performance
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   // Tells the position from the top of the viewport to the top of the page
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// Sticky navigation: Intersection Observer API
// Intersection observer API - API that allows the code to observe changes to the way that a certain target element intersects another element or the viewport
// entries are actually an array of the threshold entries
// const obsCallback = function (entries, observer) {
//   /* The callback function will get called each time that the observed element(section1) is intersecting
//   the root element(entire viewport) at the threshold(10%) that we defined */
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // root is the element that the target(section1) is intersecting
//   // null value lets you observe target element intersecting entire viewport
//   root: null,
//   // threshold is the percentage of intersection at which the observer callback will be called. Note: 0.1 basically means 10%
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // Observes a certain target, which in this case is a section1
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  // destructuring assignment makes it possible to unpack values from arrays, objects, into distinct variables.
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // a bov of 90px that will be applied outside of our target element
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
// Revealing elements on scroll
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // Stop observing
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
// Lazy loading images
// selects all the images that has data-src attribute
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserver(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider component
// Putting all the code in a function so we don't pollute the global namespace
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  // Functions
  const createDots = function () {
    // _ is a convention of a throwaway variable
    slides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (s) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - s)}%)`)
    );
  };
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard events are handled right at the document
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    // Short circuit method
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// Event - signal that is generated by a certain DOM node

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading');
//   // removes the event handler after execution
//   h1.removeEventListener('mouseenter', alertH1);
// };
// // mouseenter is like a hover event
// h1.addEventListener('mouseenter', alertH1);
// Another way of adding event listener, there is on-event property for each of the events
// This is kind of old school way of adding event listeners, because you can't add multiple event listeners to the same event and also you can't remove the event handler afterwards
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading');
// };
// You can handle events by using HTML attributes but this method should be avoided

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// // These three event handlers basically handles the same event
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // e.target shows where the click happened and not the element on which the event handler was attached
//   console.log('Link', e.target);
//   // console.log(e.currentTarget === this);

//   // Stop propagation, in general not a very good idea
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target);
// });
// // If there is a third parameter with a value of true the event handler will no longer listen to bubbling events but instead to a capturing events
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target);
//   },
//   true
// );
// DOM traversing
// const h1 = document.querySelector('h1');
// // Going downwards: child
// // Doesn't have to be a direct children
// console.log(h1.querySelectorAll('.highlight'));
// // Shows the direct children
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// // Going upwards: parents
// // Direct parent
// console.log(h1.parentElement);
// // Return closest mathcing ancestor, would also match the element that we're calling closest
// h1.closest('.header');
// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// // If you want to get all the siblings
// console.log(h1.parentElement.children);
// DOM content load event (fired as soon as the HTML is completely parsed)
document.addEventListener('DOMContentLoaded', function (e) {
  // This event doesn't wait for the images or other external resources to load, so just HTML and JavaSctipt needs to be loaded
  console.log('HTML parsed and DOM tree built!');
});
window.addEventListener('load', function (e) {
  // Fired by the window as HTML is parsed and all the images and external resources like CSS are loaded
  console.log('Page fully loaded!');
});
window.addEventListener('beforeunload', function (e) {
  // This event is created immediately before a user is about to leave a page, e.g., after clicking close button in browser tab
});
