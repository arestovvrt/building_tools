let timerId = null;

export default function timer(timeStr, callback) {
  const timeArr = timeStr.split(":");
  let timeMillis = (timeArr[0] * 60 * 60 + timeArr[1] * 60) * 1000;
  const futureDate = new Date().getTime() + timeMillis;

  timerId = setInterval(function () {
    // Future date
    const now = new Date();
    const diff = futureDate - now.getTime();

    // Hours
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours.toString().length == 1) hours = "0".concat(hours);
    // Minutes
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes.toString().length == 1) minutes = "0".concat(minutes);
    // Seconds
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (seconds.toString().length == 1) seconds = "0".concat(seconds);

    if (diff <= 0) {
      callback(timerId, null);
    } else {
      let strTimer = `${hours}:${minutes}:${seconds}`;
      callback(timerId, strTimer);
    }
  }, 1000);
}
