let allAssets = document.querySelectorAll(".expandable");
let blurBg = document.querySelector(".blurry-bg");
let assetOpen = false;

const closeImg = (el) => {
  let {width, height, top, left} = el.parentNode.getBoundingClientRect();
  animation(
    el, 
    {height: el.style.width, width: el.style.width, x:  el.style.left, y:  el.style.top}, 
    {height: height, width: width, x: left, y: top},
    true
  );
  blurBg.classList.remove("background-visible");
  el.style.cursor = "zoom-in";
  assetOpen = false;
}

const animation = (el, from, to, closing) => {
  el.animate(
        [
          { 
            height: `${from.height}px`, 
            width: `${from.width}px`,
            top: `${from.y}px`,
            left: `${from.x}px`
          },
          { 
            height: `${to.height}px`,
            width: `${to.width}px`,
            top: `${to.y}px`,
            left: `${to.x}px`
          },
        ],
        {
          duration: 150,
          iterations: 1,
          easing: "ease-in-out"
        },
  ).addEventListener("finish",() => {
    if(closing) {
      el.style.width = "100%";
      el.style.height = "auto";
      el.classList.remove("zoomed-in");
      el.parentNode.style.height = "auto";
      return;
    }
    el.style.width = `${to.width}px`;
    el.style.height = `${to.height}px`;
    el.style.top = `${to.y}px`;
    el.style.left = `${to.x}px`;
  });
};

window.addEventListener("scroll", () => {
  if(assetOpen) {
    closeImg(document.querySelector(".zoomed-in"));
  }
})

allAssets.forEach((el) => {
  el.addEventListener("click", () => {
    let { width, height, top, left } = el.getBoundingClientRect();
    if(el.classList.contains("zoomed-in")){
      closeImg(el);
      return;
    }
    assetOpen = true;
    el.classList.add("zoomed-in");
    el.style.cursor = "zoom-out";
    el.parentNode.style.height = `${height}px`;
    blurBg.classList.add("background-visible");
    
    if((window.innerHeight/height) * width > window.innerWidth - 20) {
      animation(
        el, 
        {height: height, width: width, x: left, y: top}, 
        {height: ((window.innerWidth - 20)/width) * height, width: window.innerWidth - 20, x: 10, y: (window.innerHeight - (((window.innerWidth - 20)/width) * height))/2 }, 
        false
      )
    } else {
      animation(
        el, 
        {height: height, width: width, x: left, y: top}, 
        {height: window.innerHeight - 20, width: ((window.innerHeight - 20)/height) * width, x: (window.innerWidth - (((window.innerHeight - 20)/height) * width))/2, y: 10},
        false
      )
    }
  })
})

blurBg.addEventListener("click", () => {
  closeImg(document.querySelector(".zoomed-in"));
})