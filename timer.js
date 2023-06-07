const timerDisplay = document.querySelector(".timer__display"),
      timerButtons = document.querySelector(".timer__buttons"),
      timerPlay = document.querySelector(".timer__play"),
      timerPause = document.querySelector(".timer__pause"),
      timerReverse = document.querySelector(".timer__reverse"),
      timerStop = document.querySelector(".timer__stop"),
      timerReset = document.querySelector(".timer__reset"),
      timerWhat = document.querySelector(".timer__what"),
      timerDelay = document.querySelector(".timer__delay-input");

let timer;
let delay = timerDelay.value;

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
        timer = setTimeout(go, delay);
      }, delay);
      break;

    case timerReverse:
      timerDisplay.innerHTML = currentTime;
      clearTimeout(timer);
  
      timer = setTimeout(function goBackwards() {
        if (timerDisplay.innerHTML > 0) {
          timerDisplay.innerHTML--;
          timer = setTimeout(goBackwards, delay);
        };
      }, delay);
      break;
  }
};

const togglePause = (event) => {
  const button = event.target;
  (button === timerPause)
    ? timerPause.classList.add("timer__pause_paused")
    : timerPause.classList.remove("timer__pause_paused");
};

const clearInput = () => {
  const value = timerDelay.value;
  let numbersValue = "";

  for (let i = 0; i < value.length; i++) {
    const symbol = value[i];
    if (!isNaN(Number(symbol))) numbersValue += symbol;
  };

  timerDelay.value = numbersValue;
  return numbersValue;
};

timerButtons.addEventListener("click", (e) => goTimer(e));
timerButtons.addEventListener("click", (e) => togglePause(e));
timerDelay.addEventListener("input", clearInput);
timerDelay.addEventListener("change", () => delay = timerDelay.value);


































timerWhat.addEventListener("click", () => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));