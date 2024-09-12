const sliderItem = document.querySelectorAll("#slider .sliderItem");
const arrSliderItem = Array.from(sliderItem);

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

