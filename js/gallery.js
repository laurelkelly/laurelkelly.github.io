new Swiper(".swiper-container", {
    speed: 400,
    spaceBetween: 100,
    effect: "flip",
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    autoplay: {
        delay: 5000,
      },
});

// navigation physics

const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector('.brand');
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, 'mousedown touchstart')
  .start((e) => {
    e.preventDefault();
    pointer(ballXY.get()).start(ballXY);
  });

listen(document, 'mouseup touchend')
  .start(() => {
    ballXY.stop();
  });

  const { transformMap, smooth } = transform;

  const smoothXY = transformMap({
    x: smooth(300),
    y: smooth(300)
  });
  
  listen(ball, 'mousedown touchstart').start(() => 
    schedule(everyFrame(), pointer(ballXY.get()))
      .pipe(smoothXY)
      .start(ballXY)
  );