const header = document.querySelector("header");
const menuLink = document.querySelectorAll(".menuLink");
const sliderItem = document.querySelectorAll("#slider .sliderItem");
const arrSliderItem = Array.from(sliderItem);
const whyVideoBox = document.getElementById("whyVideoBox");
const playIcon = document.querySelector("#whyChooseVideo .playIcon");
const closeModal = document.querySelector("#whyVideoBox .closeModal");
let scrollTimeout;
let lastScrollPosition = 0;
// header
window.addEventListener("scroll", () => {
  const currentScrollPosition =
    window.scrollY || document.documentElement.scrollTop;

  if (currentScrollPosition > lastScrollPosition) {
    header.classList.add("header-hide");
    header.classList.remove("header-show");
  } else {
    header.classList.add("header-show");
    header.classList.remove("header-hide");
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    header.classList.add("header-show");
    header.classList.remove("header-hide");
  }, 150);

  if (currentScrollPosition == 0) {
    header.classList.remove("header-black");
  } else {
    header.classList.add("header-black");
  }

  lastScrollPosition = currentScrollPosition;
});

menuLink.forEach((element) => {
  element.onmouseover = () => {
    if (element && element.querySelector(".dropMenu")) {
      element.querySelector(".dropMenu").classList.add("visible");
    }
  };
  element.onmouseout = () => {
    if (element.querySelector(".visible")) {
      element.querySelector(".dropMenu").classList.remove("visible");
    }
  };
});

// slider
function slide(e) {
  arrSliderItem.forEach((item) => item.classList.remove("active"));
  if (e == "prev") {
    let endItem = arrSliderItem[arrSliderItem.length - 1];
    arrSliderItem.pop();
    arrSliderItem.unshift(endItem);
    endItem.classList.add("active");
  } else {
    let startItem = arrSliderItem[0];
    arrSliderItem.shift();
    arrSliderItem.push(startItem);
    let newStartItem = arrSliderItem[0];
    newStartItem.classList.add("active");
  }
}

playIcon.onclick = () => {
  whyVideoBox.classList.add("visible");
};
closeModal.onclick = () => {
  whyVideoBox.classList.remove("visible");
};
window.onclick = (e) => {
  if (e.target === whyVideoBox) {
    whyVideoBox.classList.remove("visible");
  }
};

// services js
const swiper = new Swiper("#serviceSlider .swiper", {
  speed: 400,
  spaceBetween: 50,
  loop: true,
  slidesPerView: 3,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// projects slider
const swiper2 = new Swiper("#projectSlider .swiper", {
  loop: true,
  slidesPerView: 4,
  centeredSlides: false,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination-2",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 4,
    },
  },
});

// Galleries
const gallery = document.querySelectorAll(".gallery");
const galleryItemLink = document.querySelectorAll("#galleryNav li");
const galleryItem = document.querySelectorAll(".galleryItem");
const galleryModal = document.querySelector(".galleryModal");
const modalItem = galleryModal.querySelector(".galleryItem");
const modalRightIcon = document.querySelector(".modalRightIcon");
const modalLeftIcon = document.querySelector(".galleryModal .modalLeftIcon");

// modalin etrafina klik etdikde modal baglanir
window.onclick = (e) => {
  if (e.target == galleryModal) {
    galleryModal.classList.remove("active");
    galleryItem.forEach((el) => el.classList.remove("active"));
    modalItem.innerHTML = "";
  }
  if (!galleryModal.classList.contains("active")) {
    galleryItem.forEach((el) => el.classList.remove("active"));
  }
};

// ilk gallerynin gorunmesi
function showGallery() {
  if (gallery[0].classList.contains("active")) {
    gallery[0].querySelectorAll(".galleryItem").forEach((el) => {
      el.classList.add("is-visible");
    });
  }
}
showGallery();

// gallerynin linkleri arasinda kecid
galleryItemLink.forEach((item, index) => {
  item.onclick = () => {
    galleryItemLink.forEach((el) => el.classList.remove("active"));
    gallery.forEach((el) => el.classList.remove("active"));
    galleryItem.forEach((el) => el.classList.remove("is-visible"));

    // link activ olur
    item.classList.add("active");

    // linke uygun gallery acilir
    gallery[index].classList.add("active");

    // active gallerynin sekillerinin vaxtla gorunmesi
    const activeGalleryİtem = gallery[index].querySelectorAll(".galleryItem");
    activeGalleryİtem.forEach((el, i) => {
      setTimeout(() => el.classList.add("is-visible"), 200 * i);
    });
  };
});

// gallerynin sekline klik etdikde active klasi atilir ve modala kocur
galleryItem.forEach((e) => {
  e.onclick = (event) => {
    modalGalleryShow(event.target, event.currentTarget);
    e.classList.add("active");
  };
});

// hansi sekle klik etsek modalda acilir
function modalGalleryShow(clickedItem) {
  gallery.forEach((el) => {
    if (el.classList.contains("active")) {
      modalItem.appendChild(clickedItem.cloneNode(true));
      galleryModal.classList.add("active");
    }
  });
}

// modalItem not click
modalItem.onclick = function (event) {
  event.preventDefault();
};

// modalRightClicked
modalRightIcon.onclick = () => {
  gallery.forEach((gallery) => {
    let galleryItems = Array.from(gallery.querySelectorAll(".galleryItem"));
    let act = galleryItems.find((el) => el.classList.contains("active"));

    if (act) {
      modalItem.innerHTML = "";
      let nextElem = act.nextElementSibling || galleryItems[0];
      act.classList.remove("active");
      nextElem.classList.add("active");
      modalItem.appendChild(nextElem.querySelector("img").cloneNode(true));
    }
  });
};

// modalLeftClicked
modalLeftIcon.onclick = () => {
  gallery.forEach((el) => {
    if (el.classList.contains("active")) {
      let items = Array.from(el.querySelectorAll(".galleryItem"));
      let activeItem = items.find((item) => item.classList.contains("active"));

      if (activeItem) {
        let prevElem =
          activeItem.previousElementSibling || items[items.length - 1];
        activeItem.classList.remove("active");
        prevElem.classList.add("active");
        modalItem.innerHTML = "";
        modalItem.appendChild(prevElem.querySelector("img").cloneNode(true));
      }
    }
  });
};

// sortGalleriesClick

const galleryBars = document.querySelector(".galleryBars");
const galleryNav = document.querySelector("#galleryNav");
galleryBars.onclick = () => {
  galleryNav.classList.toggle("active");
};

// blogs
const blogs = document.querySelectorAll(".blog");

const range = 40;

const calcValue = (a, b) => {
  return ((a / b) * range - range / 2).toFixed(1);
};

blogs.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const yValue = calcValue(event.y, window.innerHeight);
    const xValue = calcValue(event.x, window.innerWidth);

    item.style.transform = `rotateX(${xValue}deg) rotateY(${yValue}deg)`;
  });
  item.addEventListener("mouseout", (event) => {
    item.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});

// headerMobile
const mobileMenuHam = document.getElementById("mobileMenuHam");
const mobNavLinks = document.getElementById("mobNavLinks");
const mobNavLinksClose = document.getElementById("mobNavLinksClose");
const mobNavigations = document.querySelectorAll("#mobNavigations ul li");
const downIcons = document.querySelectorAll(".fa-angle-down");
const rightIcons = document.querySelectorAll(".fa-angle-right");
const otherMobNavs = document.querySelectorAll(".otherNavs");

const toggleClass = (elements, className, action) => {
  elements.forEach((e) => e.classList[action](className));
};

mobileMenuHam.onclick = function () {
  this.classList.toggle("open");
  mobNavLinks.classList.add("openLinks");
};

mobNavLinksClose.onclick = () => {
  mobNavLinks.classList.remove("openLinks");
  mobileMenuHam.classList.remove("open");
  toggleClass(downIcons, "active", "remove");
  toggleClass(rightIcons, "close", "remove");
  toggleClass(otherMobNavs, "open", "remove");
};

mobNavigations.forEach((el) => {
  el.onclick = (event) => {
    let href = event.target.getAttribute("href");
    if (!href) {
      event.preventDefault();
      el.querySelector(".fa-angle-right").classList.toggle("close");
      el.querySelector(".fa-angle-down").classList.toggle("active");
      el.parentElement.querySelector(".otherNavs").classList.toggle("open");
    }
  };
});

// aboutcounters
const aboutCounters = document.getElementById("aboutCounters");
const counters = document.querySelectorAll(".count");
let hasRun = false;

window.addEventListener("scroll", function () {
  const aboutTop = aboutCounters.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (aboutTop < windowHeight && aboutTop >= 0) {
    if (!hasRun) {
      counter();
      hasRun = true;
    }
  } else {
    hasRun = false;
  }
});

function counter() {
  counters.forEach((el) => {

    let target = parseInt(el.innerHTML);
    let count = 0;

    let duration = 2000;
    let stepTime = Math.abs(Math.floor(duration / target));

    el.innerHTML = count;

    let int = setInterval(() => {
      if (count < target) {
        count += 1;
        el.innerHTML = count;
      } else {
        clearInterval(int);
      }
    }, stepTime);
  });
}
