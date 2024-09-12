const aboutCounters = document.getElementById("aboutCounters");
const counters = document.querySelectorAll(".count");
console.log(window.innerHeight);

window.addEventListener("scroll", function () {
  const aboutTop = aboutCounters.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (aboutTop < windowHeight && aboutTop >= 0) {
    counter();
  }
});

function counter() {
  counters.forEach((el) => {
    let t = el.innerHTML;
    let count = 0;

    let int = setInterval(() => {
      if (count < t) {
        count += 1;
        el.innerHTML = count;
      } else {
        clearInterval(int);
      }
    }, 0);
  });
}
