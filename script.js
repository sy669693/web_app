// Replace single date with multiple
const targetDates = [
  { name: "Next Meetup", date: new Date("2025-07-24T00:00:00") },
  { name: "Trip to Mountains", date: new Date("2025-08-15T18:00:00") },
  { name: "Anniversary", date: new Date("2025-12-25T00:00:00") }
];

// Sort dates to find the closest future one
function getUpcomingEvents() {
  const now = new Date();
  return targetDates
    .filter(event => event.date > now)
    .sort((a, b) => a.date - b.date);
}

// Format and display all events
function updateCountdowns() {
  const countdownContainer = document.querySelector(".countdown");
  countdownContainer.innerHTML = ""; // Clear all children

  const events = getUpcomingEvents();

  events.forEach((event, index) => {
    const diff = event.date - new Date();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(diff / (1000 * 60) % 60);
    const seconds = Math.floor(diff / 1000 % 60);

    const div = document.createElement("div");
    div.className = index === 0 ? "main-countdown" : "secondary-countdown";
    div.innerHTML = `
      <strong>${event.name}</strong><br>
      <span>${days}d ${hours}h ${minutes}m ${seconds}s</span>
    `;
    countdownContainer.appendChild(div);
  });
}

setInterval(updateCountdowns, 1000);
updateCountdowns();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
