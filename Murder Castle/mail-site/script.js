// =============================
// CONFIGURATION
// =============================
const correctPassword = "1896"; // password from ARG
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwm2Fsceok2hdN2PSQR0AQD_y5TQWcTLA1MU0R2hhdWWDyU9R-ZzRmowrHixBEs1s-mpA/exec"; // Replace with your URL

// Favicon images for hint animation
const favicons = [
  "assets/favicon1.ico",
  "assets/favicon2.ico",
];
let faviconIndex = 0;

// =============================
// FAVICON ANIMATION (hint)
// =============================
function changeFavicon() {
  const link = document.getElementById("favicon");
  faviconIndex = (faviconIndex + 1) % favicons.length;
  link.href = favicons[faviconIndex];
}
// Animate every 3 seconds
setInterval(changeFavicon, 3000);

// =============================
// FORM SUBMISSION LOGIC
// =============================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const mail = document.getElementById("mail").value.trim();
  const pass = document.getElementById("password").value.trim().toLowerCase();
  const optIn = document.getElementById("optIn").checked;
  const messageBox = document.getElementById("message");

  console.log("Form submit:", { mail, pass, optIn });

  // Basic validations
  if (!mail) {
    messageBox.innerText = "Please provide an email.";
    return;
  }
  if (pass !== correctPassword) {
    messageBox.innerText = "Access denied.";
    return;
  }
  if (!optIn) {
    messageBox.innerText = "You must opt-in to receive messages to continue. Please check the box.";
    return;
  }

  // At this point: password correct AND opted-in
  messageBox.innerText = "Access granted. Preparing your mailbox...";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("qr").style.display = "block";

  // Send email to Google Apps Script
  try {
    console.log("Posting to Apps Script:", GOOGLE_SCRIPT_URL);
    const resp = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "cors", // Important to allow cross-origin
      body: JSON.stringify({ email: mail }),
      headers: { "Content-Type": "application/json" }
    });

    const text = await resp.text();
    console.log("Apps Script response:", resp.status, text);
  } catch (err) {
    console.error("Error contacting Apps Script:", err);
    messageBox.innerText = "Error registering your email. Try again later.";
  }
});
