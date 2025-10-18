// -----------------------------
// Client-side ARG mail site logic
// -----------------------------

// NPC emails with delays (ms)
const NPC_EMAILS = [
  { delay: 0, sender: "ALiceINmurdercastle@chicago.org", message: "Where in the world am I? Ah, that's the great puzzle.I knew where I was this morning but I've changed a few times since then. Your curiouser and curiouser Alice!" },
  { delay: 60000, sender: "ALiceINmurdercastle@chicago.org", message: "One can't believe impossible things. If I had a world of my own, everything would be nonsense- skeletons eating keys going through the trapdoors under rugs? We're all mad here." },
  { delay: 120000, sender: "ALiceINmurdercastle@chicago.org", message: "I can't explain myself, sir. Because I'm not myself, you know... but if I were H.H.H... I could not help the fact that I was a murderer, no more than the poet can help the inspiration to sing, and I would wrote a poem about skeletons on my work-desk..." },
  { delay: 600000, sender: "ALiceINmurdercastle@chicago.org", message: "I'm late, I'm late, for a very important date! and Oh dear! Oh dear! I shall be too late! Time only knows my prince, but Thou shall wait 10 minutes since! Tick-tock..!" }
];

// Grab form elements
const registerForm = document.getElementById('registerForm');
const qr = document.getElementById('qr');
const messageEl = document.getElementById('message');

// Hide QR by default
if(qr) qr.style.display = 'none';

// Function to show fake email
function showFakeEmail(sender, message) {
  alert(`From: ${sender}\n\n${message}`);
}

// Schedule fake NPC emails
function scheduleNPCEmails() {
  NPC_EMAILS.forEach(mail => {
    setTimeout(() => {
      showFakeEmail(mail.sender, mail.message);
    }, mail.delay);
  });
}

// -----------------------------
// Registration form submission
// -----------------------------
if (registerForm) {
  registerForm.addEventListener('submit', function(e){
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const optIn = document.getElementById('optIn').checked;

    // Check Mail & Password
    if(!email || !password) {
      alert("You must enter both Mail and Password to proceed.");
      return;
    }

    // Optional: check against a correct password
    const CORRECT_PASSWORD = "1895"; // change to your desired password
    if(password !== CORRECT_PASSWORD) {
      alert("Incorrect password. Try again.");
      return;
    }

    console.log(`Player email: ${email}, Password correct.`);

    // QR appears immediately
    if(qr) qr.style.display = 'block';

    // If opted-in for real emails (WIP)
    if(optIn) {
      alert("Opt-in feature for real emails is Work In Progress. You will still see fake emails.");

      // Placeholder for Apps Script call (future)
      // Example:
      // google.script.run.registerEmail(email, false);
    } else {
      // Start fake emails sequence if not opted-in
      scheduleNPCEmails();
    }

    if(messageEl) messageEl.innerText = "Registration successful! QR code is now visible.";
  });
}

// -----------------------------
// Favicon animation (old method)
// -----------------------------
(function(){
  const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
  favicon.rel = 'icon';
  document.head.appendChild(favicon);
  let state = false;
  setInterval(() => {
    state = !state;
    // Alternate between two favicons or colors (replace URLs with your icons)
    favicon.href = state ? 'assets/favicon1.ico' : 'assets/favicon2.ico';
  }, 500);
})();



