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
  gallery.forEach(gallery => {
    let galleryItems = Array.from(gallery.querySelectorAll(".galleryItem"));
    let act = galleryItems.find(el => el.classList.contains("active"));
    
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
  gallery.forEach(el => {
    if (el.classList.contains("active")) {
      let items = Array.from(el.querySelectorAll(".galleryItem"));
      let activeItem = items.find(item => item.classList.contains("active"));
      
      if (activeItem) {
        let prevElem = activeItem.previousElementSibling || items[items.length - 1];
        activeItem.classList.remove("active");
        prevElem.classList.add("active");
        modalItem.innerHTML = "";
        modalItem.appendChild(prevElem.querySelector("img").cloneNode(true));
      }
    }
  });
};

// sortGalleriesClick

const galleryBars = document.querySelector(".galleryBars")
const galleryNav = document.querySelector("#galleryNav")
galleryBars.onclick = () =>{
  galleryNav.classList.toggle("active")
}
