const timerDisplay = document.querySelector(".timer__display"),
      timerButtons = document.querySelector(".timer__buttons"),
      timerPlay = document.querySelector(".timer__play"),
      timerPause = document.querySelector(".timer__pause"),
      timerReverse = document.querySelector(".timer__reverse"),
      timerStop = document.querySelector(".timer__stop"),
      timerReset = document.querySelector(".timer__reset"),
      timerWhat = document.querySelector(".timer__what");

let timer;

const goTimer = (event) => {
  const button = event.target;
  let currentTime = timerDisplay.innerHTML;

  switch(button) {
    case timerPause:
      clearTimeout(timer);
      break;

    case timerStop: 
    case timerReset:
      timerDisplay.innerHTML = 0;
      if (button === timerStop) clearTimeout(timer);
      break;

    case timerPlay:
      timerDisplay.innerHTML = currentTime;
      clearTimeout(timer);
  
      timer = setTimeout(function go() {
        timerDisplay.innerHTML++;
        timer = setTimeout(go, 1000);
      }, 1000);
      break;

    case timerReverse:
      timerDisplay.innerHTML = currentTime;
      clearTimeout(timer);
  
      timer = setTimeout(function goBackwards() {
        if (timerDisplay.innerHTML > 0) {
          timerDisplay.innerHTML--;
          timer = setTimeout(goBackwards, 1000);
        };
      }, 1000);
      break;
  }
};

const togglePause = (event) => {
  const button = event.target;

  switch(button) {
    case timerPause:
      timerPause.classList.add("timer__pause-paused");
      break;

    default:
      timerPause.classList.remove("timer__pause-paused");
  }
};

timerButtons.addEventListener("click", (e) => goTimer(e));
timerButtons.addEventListener("click", (e) => togglePause(e));


































timerWhat.addEventListener("click", () => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));