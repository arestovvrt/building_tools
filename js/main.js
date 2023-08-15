import showAlert from "./messages.js";
import { diffDates, diffToHtml } from "./datecalc.js";
import timer from "./timer.js";

/****************************** Calc Diff */
const dateCalcForm = document.getElementById("datecalc");
dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
  event.preventDefault();

  let { firstDate, secondDate } = event.target.elements;
  (firstDate = firstDate.value), (secondDate = secondDate.value);

  if (firstDate && secondDate) {
    const diff = diffDates(firstDate, secondDate);
    return showAlert(diffToHtml(diff), "success", "beforeend", 2000);
  } else
    return showAlert(
      "Для расчета промежутка необходимо заполнить оба поля",
      "danger",
      "afterbegin",
      2000
    );
}

/****************************** Timer */
const timerForm = document.getElementById("timer");
let timerId = null;
const elemId = `timer_${new Date().getTime()}`;
const sound = new Howl({
  src: ["../audio/cute_sound.mp3"],
});

timerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  switch (e.submitter.id) {
    case "startBtn":
      if (timerId) {
        return showAlert(
          "Для повторного запуска необходимо остановить действующий таймер",
          "danger",
          "afterbegin",
          2000
        );
      }

      let { start } = e.target.elements;
      if (start.value) {
        const bodyEl = document.querySelector("body");
        bodyEl.insertAdjacentHTML(
          "beforeend",
          `<div id="${elemId}" class="card mx-auto p-3" style="width: 18rem;"></div>`
        );
        const appendEl = document.querySelector("#" + elemId);

        timer(start.value, function (id, value) {
          if (!timerId) timerId = id;
          if (value) {
            appendEl.innerText = value;
          } else {
            clearInterval(id);
            appendEl.remove();
            timerId = null;
            // Play the sound.
            sound.play();
          }
        });
      } else {
        return showAlert(
          "Для запуска таймера необходимо указать время",
          "danger",
          "afterbegin",
          2000
        );
      }
      break;
    case "stopBtn":
      clearInterval(timerId);
      const removeEl = document.querySelector("#" + elemId);
      if (removeEl) removeEl.remove();
      timerId = null;

      // Play the sound.
      sound.play();
      break;
  }
});
