const menuLink = document.querySelectorAll(".menuLink");
const header = document.querySelector("header");
let scrollTimeout;
let lastScrollPosition = 0;

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

  // Kaydırma durduğunda header'ı tekrar göster
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

const mobileMenuHam = document.getElementById("mobileMenuHam");
const mobNavLinks = document.getElementById("mobNavLinks");
const mobNavLinksClose = document.getElementById("mobNavLinksClose");
const mobNavigations = document.querySelectorAll("#mobNavigations ul li");
const downIcons = document.querySelectorAll(".fa-angle-down");
const rightIcons = document.querySelectorAll(".fa-angle-right");
const otherMobNavs = document.querySelectorAll(".otherNavs");

const toggleClass = (elements, className, action) => {
  elements.forEach(e => e.classList[action](className));
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

