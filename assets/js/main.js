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
      document.querySelector('.caption').innerHTML = caption;
      document.querySelector('.caption-mob').innerHTML = caption;
    }
  }
});

// MOBILE MENU
const mobile = mobileMenu();
function mobileMenu() {
  const menuButton = document.getElementById('menu-btn');
  const menuMobile = document.getElementById('menu-mobile');
  const menuLinks = menuMobile.querySelectorAll('.nav-links li');

  window.addEventListener('resize', () => {
    let w = window.innerWidth;
    if (w > 950) {
      menuMobile.classList.remove('open');
      menuButton.textContent = 'Menu';
    }
  });

  menuButton.addEventListener('click', function () {
    menuMobile.classList.toggle('open');
    menuButton.textContent == 'Menu' ? menuButton.textContent = 'Close' : menuButton.textContent = 'Menu';
  });

  for (const link of menuLinks) {
    link.addEventListener('click', function (event) {
      menuMobile.classList.remove('open');
      menuButton.textContent = 'Menu';
    });
  }
};



