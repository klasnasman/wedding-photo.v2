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
}

async function fadeInMain() {
  for (const main of document.getElementsByTagName('main')) {
    await fadeIn(main, 800);
  }
}

window.addEventListener('load', async () => {
  await fadeInMain();
});


// SWIPER
const swiper = swiperFunc();
function swiperFunc() {
  return new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    cache: false,
    longSwipesRatio: 0,
    initialSlide: 0,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      // when window width is >= 900px
      950: {
        slidesPerView: 1.5,
        spaceBetween: 240,
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
        slidesPerView: 1.5,
        spaceBetween: 300,
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
      document.querySelector('.caption').innerHTML = caption;
      document.querySelector('.caption-mob').innerHTML = caption;
    }
  }
});

// MOBILE MENU
const mobile = mobileMenu();
function mobileMenu() {
  const navButton = document.getElementById('menu-btn');
  const navMobile = document.getElementById('menu-mobile');
  const navLinks = navMobile.querySelectorAll('.nav-links li');

  window.addEventListener('resize', () => {
    let w = window.innerWidth;
    if (w > 950) {
      navMobile.classList.remove('open');
      navButton.textContent = 'Menu';
    }
  });

  navButton.addEventListener('click', function () {
    navMobile.classList.toggle('open');
    navButton.textContent == 'Menu' ? navButton.textContent = 'Close' : navButton.textContent = 'Menu';
  });

  for (const link of navLinks) {
    link.addEventListener('click', function (event) {
      navMobile.classList.remove('open');
      navButton.textContent = 'Menu';
    });
  }
};



