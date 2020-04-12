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
let sl_value = parseInt(el_sessionlength.value);
let el_breaklength = document.querySelector("#break-length");
let bl_value = parseInt(el_breaklength.value);

let current_sl_seconds = sl_value * 60;
let current_bl_seconds = bl_value * 60;
let status = "Session";
let isPaused = true;

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

setInterval(() => {
  el_timerLabel.textContent = status;

  if (!isPaused) {
    if (status === "Session") {
      current_sl_seconds = current_sl_seconds - 1;
      //   el_display.value =
      //     Math.floor(current_sl_seconds / 60) + ":" + (current_sl_seconds % 60);
      updateDisplay();
    } else {
      current_bl_seconds = current_bl_seconds - 1;
      //   el_display.value =
      //     Math.floor(current_sl_seconds / 60) + ":" + (current_sl_seconds % 60);
      updateDisplay();
    }
    if (current_sl_seconds === 0 && status === "Session") {
      status = "Break";
      current_sl_seconds = sl_value * 60;
      audio_beep.play();
    } else if (status === "Break" && current_bl_seconds === 0) {
      status = "Session";
      current_bl_seconds = bl_value * 60;
      audio_beep.play();
    }
  }
}, 1000);

function handlePauseStart(e) {
  e.preventDefault();
  if (isPaused) {
    isPaused = false;
  } else {
    isPaused = true;
  }
}

function handleReset(e) {
  el_sessionlength = document.querySelector("#session-length");
  el_breaklength = document.querySelector("#break-length");
  sl_value = parseInt(el_sessionlength.value);
  bl_value = parseInt(el_breaklength.value);
  current_sl_seconds = sl_value * 60;
  current_bl_seconds = bl_value * 60;
  isPaused = true;
  status = "Session";
  updateDisplay();
}

function updateDisplay() {
  if (status === "Session") {
    el_display.value =
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
    el_display.value =
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
  el_breaklength.value = bl_value;
  el_sessionlength.value = sl_value;
}
