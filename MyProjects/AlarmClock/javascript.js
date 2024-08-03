document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const currentTimeElement = document.getElementById("current-time");
  const alarmTimeInput = document.getElementById("alarm-time");
  const setAlarmBtn = document.getElementById("set-alarm-btn");
  const alarmsListElement = document.getElementById("alarms-ul");

  // Array to store alarms
  let alarms = [];

  // Function to format time in 12-hour AM/PM format with seconds
  function formatTime(hours, minutes, seconds) {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  // Function to update the current time every second
  function updateCurrentTime() {
    const now = new Date();
    const formattedTime = formatTime(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );
    currentTimeElement.textContent = formattedTime;
  }

  // Function to check if any alarm matches the current time
  function checkAlarms() {
    const now = new Date();
    alarms.forEach((alarm, index) => {
      if (
        now.getHours() === alarm.time.getHours() &&
        now.getMinutes() === alarm.time.getMinutes() &&
        now.getSeconds() === alarm.time.getSeconds()
      ) {
        alert(`Alarm for ${alarm.timeString}`);
        removeAlarm(index); // Remove alarm after it triggers
      }
    });
  }

  // Function to set a new alarm
  function setAlarm() {
    const alarmTimeValue = alarmTimeInput.value;
    if (alarmTimeValue) {
      const alarmTime = new Date();
      const [hours, minutes, seconds] = alarmTimeValue.split(":");
      alarmTime.setHours(hours);
      alarmTime.setMinutes(minutes);
      alarmTime.setSeconds(seconds);

      const formattedTime = formatTime(
        alarmTime.getHours(),
        alarmTime.getMinutes(),
        alarmTime.getSeconds()
      );
      const alarm = {
        time: alarmTime,
        timeString: formattedTime,
      };
      alarms.push(alarm);
      renderAlarms();

      // Check alarms every second if it's the first alarm
      if (alarms.length === 1) {
        setInterval(checkAlarms, 1000);
      }

      alert(`Alarm set for ${formattedTime}`);
    }
  }

  // Function to remove an alarm
  function removeAlarm(index) {
    alarms.splice(index, 1);
    renderAlarms();
  }

  // Function to render all alarms in the list
  function renderAlarms() {
    alarmsListElement.innerHTML = "";
    alarms.forEach((alarm, index) => {
      const li = document.createElement("li");
      li.textContent = `${alarm.timeString}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => removeAlarm(index));
      li.appendChild(deleteBtn);
      alarmsListElement.appendChild(li);
    });
  }

  // Event listener for setting a new alarm
  setAlarmBtn.addEventListener("click", setAlarm);

  // Update the current time every second
  setInterval(updateCurrentTime, 1000);
  updateCurrentTime(); // Initial call to display current time immediately
});
