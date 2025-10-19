const form = document.getElementById("password-form");
const qrContainer = document.getElementById("qr-container");
const favicon = document.getElementById("favicon");

let faviconToggle = false;
setInterval(() => {
  faviconToggle = !faviconToggle;
  favicon.href = faviconToggle ? "assets/favicon2.ico" : "assets/favicon1.ico";
}, 500);

// --- POP-UP SYSTEM ---
function showPopup(from, subject, text) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <div class="popup-header">
      <strong>from:</strong> ${from}<br>
      <strong>subject:</strong> ${subject}
    </div>
    <p>${text}</p>
  `;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 25000); // auto remove after 25s
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value.trim();
  qrContainer.classList.add("hidden");

  if (password === "1895") {
    qrContainer.classList.remove("hidden");
    showPopup(
      "ALiceINmurdercastle@chicago.org",
      "Where in the world am I?",
      `"Where in the world am I? Ah, that's the great puzzle.
      I knew where I was this morning but I've changed a few times since then.
      Your curiouser and curiouser Alice!"`
    );

    setTimeout(() => {
      showPopup(
        "ALiceINmurdercastle@chicago.org",
        "I'm going slightly mad...",
        `"One can't believe impossible things. 
        If I had a world of my own, everything would be nonsense — skeletons eating keys going through the trapdoors under rugs?
        We're all mad here."`
      );
    }, 60000);

    setTimeout(() => {
      showPopup(
        "ALiceINmurdercastle@chicago.org",
        "Skeletal poetry",
        `"I can't explain myself, sir. Because I'm not myself, you know...
        ...but if I were H.H.H...
        I could not help the fact that I was a murderer, no more than the poet can help the inspiration to sing,
        and I would wrote a poem about skeletons on my work-desk..."`
      );
    }, 360000);

    setTimeout(() => {
      showPopup(
        "ALiceINmurdercastle@chicago.org",
        "Sands of time",
        `"I'm late, I'm late, for a very important date!
        and 
        Oh dear! Oh dear! I shall be too late!
        Time only knows my prince, but
        Thou shall wait 10 minutes since!
        Tick-tock..!"`
      );
    }, 660000);

  } else if (password === "D3v1l0fCh1cag0#34") {
    showPopup(
      "ALiceINmurdercastle@chicago.org",
      "Thank you",
      `"At last, I'm free. Thank you for playing the demo, the game ends here for now."`
    );
  } else {
    alert("Wrong password. Try again.");
  }
});

// --- STYLING FOR POPUPS ---
const style = document.createElement('style');
style.textContent = `
.popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: black;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 15px;
  max-width: 300px;
  font-family: 'Courier New', monospace;
  animation: fadeIn 0.5s ease-in;
}
@keyframes fadeIn {
  from {opacity: 0; transform: translateY(10px);}
  to {opacity: 1; transform: translateY(0);}
}
`;
document.head.appendChild(style);
