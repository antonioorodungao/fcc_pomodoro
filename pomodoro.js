let el_display = document.querySelector("#time-left");
let el_bl_plus = document.querySelector("#break-increment");
let el_bl_minus = document.querySelector("#break-decrement");
let el_sl_plus = document.querySelector("#session-increment");
let el_sl_minus = document.querySelector("#session-decrement");
let el_startstop = document.querySelector("#start_stop");
let el_reset = document.querySelector("#reset");
let el_timerLabel = document.querySelector("#timer-label");
let audio_beep = document.querySelector("#beep");

let el_sessionlength = document.querySelector("#session-length");
let el_breaklength = document.querySelector("#break-length");
let bl_value = parseInt(el_breaklength.value);
let sl_value = parseInt(el_sessionlength.value);

let current_sl_seconds = sl_value * 60;
let current_bl_seconds = bl_value * 60;
let status = "Session";
let isPaused = true;
let intervalId;

(function () {
  handleReset();
  updateDisplay();
  el_bl_plus.addEventListener("click", handleSettingClickEvent);
  el_bl_minus.addEventListener("click", handleSettingClickEvent);
  el_sl_plus.addEventListener("click", handleSettingClickEvent);
  el_sl_minus.addEventListener("click", handleSettingClickEvent);
  el_startstop.addEventListener("click", handlePauseStart);
  el_reset.addEventListener("click", handleReset);
})();

function handlePauseStart(e) {
  e.preventDefault();

  if (isPaused) {
    isPaused = false;
    intervalId = setInterval(() => {
      el_timerLabel.textContent = status;
      console.log("Text Content " + el_display.textContent);
      if (!isPaused) {
        if (status === "Session") {
          current_sl_seconds = current_sl_seconds - 1;
          updateDisplay();
        } else {
          current_bl_seconds = current_bl_seconds - 1;
          updateDisplay();
        }
        if (current_sl_seconds === 0 && status === "Session") {
          status = "Break";
          current_sl_seconds = sl_value * 60;
          updateDisplay();
          audio_beep.play();
        } else if (status === "Break" && current_bl_seconds === 0) {
          status = "Session";
          current_bl_seconds = bl_value * 60;
          updateDisplay();
          audio_beep.play();
        }
      }
    }, 1000);
    console.log("Set:" + intervalId);
  } else {
    isPaused = true;
    clearInterval(intervalId);
    console.log("Clear:" + intervalId);
  }
}

function handleReset(e) {
  el_sessionlength.textContent = 25;
  el_breaklength.textContent = 5;
  sl_value = parseInt(el_sessionlength.textContent);
  bl_value = parseInt(el_breaklength.textContent);
  current_sl_seconds = sl_value * 60;
  current_bl_seconds = bl_value * 60;
  isPaused = true;
  status = "Session";
  updateDisplay();
}

function updateDisplay() {
  if (status === "Session") {
    el_display.textContent =
      Math.floor(current_sl_seconds / 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      (current_sl_seconds % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
  } else if (status === "Break") {
    el_display.textContent =
      Math.floor(current_bl_seconds / 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      (current_bl_seconds % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
  }
}

function handleSettingClickEvent(e) {
  e.preventDefault();
  switch (e.target.parentElement.id) {
    case "break-increment":
      if (bl_value >= 1 && bl_value <= 60) bl_value = bl_value + 1;
      break;
    case "break-decrement":
      if (bl_value >= 1 && bl_value <= 60) bl_value = bl_value - 1;
      break;
    case "session-increment":
      if (sl_value >= 1 && sl_value <= 60) sl_value = sl_value + 1;
      break;
    case "session-decrement":
      if (sl_value >= 1 && sl_value <= 60) sl_value = sl_value - 1;
      break;
  }
  el_breaklength.textContent = bl_value;
  el_sessionlength.textContent = sl_value;
}
