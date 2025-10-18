// -----------------------------
// Client-side ARG mail site logic
// -----------------------------

// NPC emails with delays (ms)
const NPC_EMAILS = [
  { delay: 0, sender: "Eleanor", message: "You shouldn’t have opened that door." },
  { delay: 60000, sender: "Bellboy", message: "The walls remember." },
  { delay: 120000, sender: "Doctor H", message: "The ledger is not empty." }
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
    const CORRECT_PASSWORD = "holmes2025"; // change to your desired password
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
