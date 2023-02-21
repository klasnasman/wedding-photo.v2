// PAGE FADE TRANSITION
async function fadeIn(el, durationInMs) {
  return new Promise((resolve) => {
    const animation = el.animate([{
      opacity: '0'
    },
    {
      opacity: '0.5',
      offset: 0.5
    },
    {
      opacity: '1',
      offset: 1
    }
    ], {
      duration: durationInMs,
      easing: 'linear',
      iterations: 1,
      direction: 'normal',
      fill: 'forwards',
      delay: 0,
      endDelay: 0
    });
    animation.onfinish = () => resolve();
  });
};

async function fadeInMain() {
  for (const main of document.getElementsByTagName('main')) {
    await fadeIn(main, 800);
  }
};

window.addEventListener('load', async () => {
  await fadeInMain();
});

// LAZY LOAD IMAGES WITH FADE IN:
let images = document.querySelectorAll('.lazy__load');

function checkScroll() {
  images.forEach((image) => {

    const top = Math.round(image.getBoundingClientRect().top)
    const height = Math.round(image.getBoundingClientRect().height)
    const windowHeight = window.innerHeight

    if (top + (height / 2) < windowHeight + 150) {
      // if image has no src
      if (image.src.length < 1) {
        // find url in data-img (<img data-src="image.png">) and set it as "src" 
        // (<img src="image.png">) when it is in viewport and should be loaded.
        if (image.dataset.src) {
          image.src = image.dataset.src;
        }
      }
      // add active class to add animation
      image.classList.add('lazy__load-active')
    } else {
      image.classList.remove('lazy__load-active')
    }
  })
};
// run function one time when first loaded to check if there are any images
// above the fold that needs to be loaded before scroll
checkScroll();
// run function when scroll
window.addEventListener('scroll', function () {
  checkScroll();
});

// SWIPER
const swiper = swiperFunc();
function swiperFunc() {
  return new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    cssMode: true,
    speed: 800,
    loop: true,
    initialSlide: 0,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      950: {
        slidesPerView: 1.5,
        spaceBetween: 240,
        cssMode: true,
        slideToClickedSlide: true,
        speed: 800,
        centeredSlides: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        }
      },
      1600: {
        slidesPerView: 1.4,
        spaceBetween: 300,
        cssMode: true,
        slideToClickedSlide: true,
        speed: 800,
        centeredSlides: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        }
      },
    }
  }
  )
};

// SWIPER - CHANGE CAPTION
swiper.on('slideChange', function () {
  const activeSlide = this.slides[this.activeIndex];
  const imgSrc = activeSlide.querySelector('img').src;

  if (!imgSrc.includes("wedding")) {
    const caption = activeSlide.querySelector('img').getAttribute('data-caption');
    if (caption) {
      document.querySelector('.details__caption').innerHTML = caption;
      document.querySelector('.details__caption-mob').innerHTML = caption;
    }
  }
});

// MOBILE MENU
const mobile = mobileMenu();
function mobileMenu() {
  const menuBtn = document.getElementById('header__button');
  const menuMobile = document.getElementById('mobile__menu');
  const linksMobile = menuMobile.querySelectorAll('.mobile__ul li');

  window.addEventListener('resize', () => {
    let w = window.innerWidth;
    if (w > 950) {
      menuMobile.classList.remove('open');
      menuBtn.textContent = 'Menu';
    }
  });

  menuBtn.addEventListener('click', function () {
    menuMobile.classList.toggle('open');
    menuBtn.textContent == 'Menu' ? menuBtn.textContent = 'Close' : menuBtn.textContent = 'Menu';
  });

  for (const link of linksMobile) {
    link.addEventListener('click', function (event) {
      menuMobile.classList.remove('open');
      menuBtn.textContent = 'Menu';
    });
  }
};




