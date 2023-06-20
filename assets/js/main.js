// PAGE FADE TRANSITION
async function fadeIn(el, durationInMs) {
  return new Promise((resolve) => {
    const animation = el.animate(
      [
        {
          opacity: "0",
        },
        {
          opacity: "0.5",
          offset: 0.5,
        },
        {
          opacity: "1",
          offset: 1,
        },
      ],
      {
        duration: durationInMs,
        easing: "linear",
        iterations: 1,
        direction: "normal",
        fill: "forwards",
        delay: 0,
        endDelay: 0,
      }
    );
    animation.onfinish = () => resolve();
  });
}

async function fadeInMain() {
  for (const main of document.getElementsByTagName("main")) {
    await fadeIn(main, 800);
  }
}

window.addEventListener("load", async () => {
  await fadeInMain();
});

// LAZY LOAD IMAGES WITH FADE IN:
const images = document.querySelectorAll(".lazy__load");

function checkScroll() {
  images.forEach((image) => {
    const top = Math.round(image.getBoundingClientRect().top);
    const height = Math.round(image.getBoundingClientRect().height);
    const windowHeight = window.innerHeight;

    if (top + height / 2 < windowHeight + 150) {
      if (!image.src) {
        if (image.dataset.src) {
          image.src = image.dataset.src;
        }
      }
      image.classList.add("lazy__load-active");
    } else {
      image.classList.remove("lazy__load-active");
    }
  });
}

const runCheckScroll = () => {
  checkScroll();
};

window.addEventListener("load", runCheckScroll);

window.addEventListener("scroll", runCheckScroll);

// SWIPER
const swiper = swiperFunc();
function swiperFunc() {
  return new Swiper(".swiper", {
    slidesPerView: 1,
    cssMode: true,
    speed: 800,
    centeredSlides: false,
    loop: true,
    initialSlide: 0,
    slideToClickedSlide: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      950: {
        slidesPerView: 1.5,
        spaceBetween: 250,
        cssMode: true,
        speed: 800,
        centeredSlides: false,
        loop: true,
        initialSlide: 0,
        slideToClickedSlide: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
      1600: {
        slidesPerView: 1.5,
        spaceBetween: 250,
        cssMode: true,
        speed: 800,
        centeredSlides: false,
        loop: true,
        initialSlide: 0,
        slideToClickedSlide: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
    },
  });
}

// SWIPER - CHANGE CAPTION
const onSlideChange = function () {
  const activeSlide = this.slides[this.activeIndex];
  const imgSrc = activeSlide.querySelector("img").src;

  if (!imgSrc.includes("wedding")) {
    const caption = activeSlide
      .querySelector("img")
      .getAttribute("data-caption");
    if (caption) {
      const detailsCaption = document.querySelector(".details__caption");
      const detailsCaptionMob = document.querySelector(".details__caption-mob");
      detailsCaption.innerHTML = caption;
      detailsCaptionMob.innerHTML = caption;
    }
  }
};

swiper.on("slideChange", onSlideChange);

// MOBILE MENU
function mobileMenu() {
  const menuBtn = document.getElementById("header__button");
  const menuMobile = document.getElementById("mobile__menu");
  const linksMobile = menuMobile.querySelectorAll(".mobile__ul li");

  const resizeHandler = () => {
    let w = window.innerWidth;
    if (w > 950) {
      menuMobile.classList.remove("open");
      menuBtn.textContent = "Menu";
    }
  };

  const toggleMenuHandler = () => {
    menuMobile.classList.toggle("open");
    menuBtn.textContent = menuBtn.textContent == "Menu" ? "Close" : "Menu";
  };

  const linkClickHandler = () => {
    menuMobile.classList.remove("open");
    menuBtn.textContent = "Menu";
  };

  window.addEventListener("resize", resizeHandler);
  menuBtn.addEventListener("click", toggleMenuHandler);

  linksMobile.forEach((link) => {
    link.addEventListener("click", linkClickHandler);
  });
}

const mobile = mobileMenu();
