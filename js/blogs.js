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
  item.addEventListener("mouseout",(event)=>{
    item.style.transform = `rotateX(0deg) rotateY(0deg)`;
  })
});
