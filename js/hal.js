window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.transition = "0.5s ease";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});





function animateSkills(){
  document.querySelectorAll('.skill-item').forEach(item=>{
    const percent = item.dataset.percent;
    const bar = item.querySelector('.skill-fill');
    const text = item.querySelector('.skill-percent');

    let count = 0;
    const timer = setInterval(()=>{
      if(count >= percent){
        clearInterval(timer);
        bar.style.width = percent + '%';
        text.innerText = percent + '%';
      }else{
        count++;
        bar.style.width = count + '%';
        text.innerText = count + '%';
      }
    },30);
  });
}

let played = false;
window.addEventListener('scroll',()=>{
  const section = document.querySelector('.skills');
  const pos = section.getBoundingClientRect().top;
  if(pos < window.innerHeight - 100 && !played){
    played = true;
    animateSkills();
  }
});



function smoothScrollTo(targetY, duration = 900) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('.header__nav__menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      smoothScrollTo(targetPosition, 900);
    }
  });
});