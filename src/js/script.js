const exibirMenuBtn = document.querySelector(".exibir__menu");
const fecharMenuBtn = document.querySelector(".fechar__menu");
const menuOverlay = document.querySelector(".menu__overlay");
const menuLinks = document.querySelectorAll(".menu__overlay-links a");
const body = document.body;

function exibirMenu() {
  if (window.innerWidth < 1300) {
    menuOverlay.classList.add("ativo");
    body.style.overflow = "hidden";
  }
}

function fecharMenu() {
  if (window.innerWidth < 1300) {
    menuOverlay.classList.remove("ativo");
    body.style.overflow = "";
  }
}

exibirMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  exibirMenu();
});

fecharMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fecharMenu();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fecharMenu();
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1300) {
    menuOverlay.classList.remove("ativo");
    body.style.overflow = "";
  }
});

function isIndexPage() {
  return (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  );
}

if (isIndexPage()) {
  let previousScrollPosition = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > 200) {
      body.classList.add("sticky");
    } else {
      body.classList.remove("sticky");
    }

    previousScrollPosition = currentScrollPosition;
  });
}

const sliderContainer = document.querySelector(".banner__slider");

if (sliderContainer) {
  const sliderImages = Array.from(
    sliderContainer.querySelectorAll(".slider_foto")
  );
  let currentImageIndex = 0;
  let lastTimestamp = 0;
  const interval = 3000;

  function changeImage(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;

    if (timestamp - lastTimestamp >= interval) {
      sliderImages.forEach((image, index) => {
        image.style.opacity = index === currentImageIndex ? 1 : 0;
      });

      currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
      lastTimestamp = timestamp;
    }

    requestAnimationFrame(changeImage);
  }

  sliderImages.forEach((image, index) => {
    image.style.opacity = index === 0 ? 1 : 0;
    image.style.transition = "opacity 1s ease-in-out";
  });

  requestAnimationFrame(changeImage);
}
