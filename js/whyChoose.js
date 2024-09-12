const whyVideoBox = document.getElementById("whyVideoBox");
const playIcon = document.querySelector("#whyChooseVideo .playIcon");
const closeModal = document.querySelector("#whyVideoBox .closeModal");
playIcon.onclick = () => {
  whyVideoBox.classList.add("visible");
};
closeModal.onclick = () => {
  whyVideoBox.classList.remove("visible");
};
window.onclick = (e) => {
  if (e.target===whyVideoBox) {
    whyVideoBox.classList.remove("visible");
  }
};
