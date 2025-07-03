const canvas = document.getElementById("crystal-wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");

const colors = ["blue", "green", "purple", "yellow", "white", "orange", "red", "magenta"];
const prizes = [
  "250 jaku-coinów",
  "Fragment Reliktu",
  "Pełny Relikt",
  "Bonus +50% monet",
  "2x losowanie",
  "3 dodatkowe losy",
  "Zestaw specjalny",
  "Sekretny Kryształ"
];

let angle = 0;
const sliceAngle = (2 * Math.PI) / colors.length;

function drawWheel() {
  for (let i = 0; i < colors.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 140, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.fill();
  }
}

function spinWheel() {
  const rand = Math.floor(Math.random() * colors.length);
  angle = (rand + 0.5) * sliceAngle;
  canvas.style.transform = `rotate(${(360 / colors.length) * rand + 720}deg)`;
  result.innerText = `🎉 Nagroda: ${prizes[rand]}!`;
  saveToLocalStorage(prizes[rand]);
}

function saveToLocalStorage(prize) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({ prize, time: new Date().toLocaleString() });
  localStorage.setItem("history", JSON.stringify(history));
}

drawWheel();
spinBtn.addEventListener("click", spinWheel);
