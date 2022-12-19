const { default: tweenUmd } = require("./tween.umd");

const images = document.querySelectorAll(".image-container img");

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  images.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const imageX = rect.left + rect.width / 2;
    const imageY = rect.top + rect.height / 2;
    const dx = mouseX - imageX;
    const dy = mouseY - imageY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    

    if (distance < 100) {
      // use Tween.js to apply the transformation
      tweenUmd.to(image, 1, {
        perspective: "100px",
        transformOrigin: `${imageX}px ${imageY}px`,
        transform: `perspective(100px) rotateY(${angle}rad)`,
        ease: Power2.easeOut,
      });
    } else {
      // use Tween.js to reset the transformation
      tweenUmd.to(image, 1, {
        perspective: "",
        transformOrigin: "",
        transform: "",
        ease: Power2.easeOut,
      });
    }
  });
});
