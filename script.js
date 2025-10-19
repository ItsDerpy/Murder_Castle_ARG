// ========== Dynamic Favicon ==========
let angle = 0;
const favicon = document.querySelector("link[rel='icon']");
setInterval(() => {
  angle += 5;
  favicon.style.transform = `rotate(${angle}deg)`;
}, 200);

// ========== Password Logic ==========
const form = document.getElementById('accessForm');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');
const qrSection = document.getElementById('qrSection');
const popupContainer = document.getElementById('popupContainer');

// Predefined responses for each password
const responses = {
  "castle": { type: "qr", src: "assets/qr.png", message: "Access granted. Proceed to the next chamber." },
  "elevator": { type: "popup", texts: ["You shouldn’t be here.", "The walls have ears."] },
  "holmes": { type: "popup", texts: ["He's watching.", "Look behind you."] }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const pw = passwordInput.value.trim().toLowerCase();

  // Clear previous stuff
  qrSection.style.display = "none";
  popupContainer.innerHTML = "";
  message.textContent = "";

  if (responses[pw]) {
    const r = responses[pw];

    if (r.type === "qr") {
      qrSection.style.display = "block";
      document.getElementById('qr').src = r.src;
      message.textContent = r.message;
    } else if (r.type === "popup") {
      r.texts.forEach((t, i) => {
        setTimeout(() => spawnPopup(t), i * 2000);
      });
      message.textContent = "Incoming transmission...";
    }

  } else {
    message.textContent = "Access Denied.";
  }

  passwordInput.value = "";
});

// ========== Fake Pop-Up Generator ==========
function spawnPopup(text) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = text;

  const x = Math.random() * (window.innerWidth - 260);
  const y = Math.random() * (window.innerHeight - 120);
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 5000);
}
