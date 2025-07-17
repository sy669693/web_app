// List of events
const events = [
  { name: "Next Meetup", date: new Date("2025-07-24T00:00:00") },
  { name: "Trip to Mountains", date: new Date("2025-08-15T18:00:00") },
  { name: "Anniversary", date: new Date("2025-12-25T00:00:00") }
];

let currentIndex = 0;

function updateCountdownView(index) {
  const countdown = document.getElementById("main-countdown");
  const title = document.getElementById("event-title");
  const prevBubble = document.getElementById("prev-bubble");
  const nextBubble = document.getElementById("next-bubble");

  // Fade out animation
  countdown.classList.add("fade-out");
  title.classList.add("fade-out");

  setTimeout(() => {
    // Update content
    title.innerText = events[index].name;
    prevBubble.textContent = index > 0 ? `earlier... ${events[index - 1].name}` : "";
    nextBubble.textContent = index < events.length - 1 ? `and then... ${events[index + 1].name}` : "";

    // Remove animation
    countdown.classList.remove("fade-out");
    title.classList.remove("fade-out");

    // Start/resync timer for new event
    updateTimer();
  }, 200); // duration of fade-out
}

function updateTimer() {
  const countdown = document.getElementById("main-countdown");
  const target = events[currentIndex].date;
  const now = new Date();
  const diff = target - now;

  if (diff < 0) {
    countdown.innerText = "Event passed!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prev-bubble").onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCountdownView(currentIndex);
    }
  };

  document.getElementById("next-bubble").onclick = () => {
    if (currentIndex < events.length - 1) {
      currentIndex++;
      updateCountdownView(currentIndex);
    }
  };

  updateCountdownView(currentIndex); // includes timer now
  setInterval(updateTimer, 1000);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
