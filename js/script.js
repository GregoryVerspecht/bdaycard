// Variabele voor installatieprompt op Android
let deferredPrompt;

// Detecteer of de app niet in standalone modus draait
if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("Running in standalone mode");
} else {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    showIOSInstallPrompt();
  } else if (/Android/i.test(navigator.userAgent)) {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showAndroidInstallPrompt();
    });
  }
}

// Functie om een iOS-installatiemelding te tonen
function showIOSInstallPrompt() {
  const prompt = document.createElement("div");
  prompt.id = "install-prompt";
  prompt.style = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    padding: 15px;
    background: #fff;
    color: #000000;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    text-align: center;
    z-index: 1000;
  `;
  prompt.innerHTML = `
    <p>📱 Voeg deze app toe aan je startscherm voor een betere ervaring!</p>
    <ol>
      <li>Druk op het <strong>Deel-icoon</strong> 📤 onderaan of bovenaan Safari.</li>
      <li>Kies <strong>'Zet op beginscherm'</strong>.</li>
      <li>Geef de app een naam en druk op <strong>'Voeg toe'</strong>.</li>
    </ol>
    <button id="close-prompt-ios">Sluiten</button>
  `;

  document.body.appendChild(prompt);
  document.getElementById("close-prompt-ios").addEventListener("click", () => {
    document.body.removeChild(prompt);
  });
}

// Functie om een Android-installatiemelding te tonen
function showAndroidInstallPrompt() {
  const prompt = document.createElement("div");
  prompt.id = "install-prompt";
  prompt.style = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    padding: 15px;
    background: #fff;
    color: #000000;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    text-align: center;
    z-index: 1000;
  `;
  prompt.innerHTML = `
    <p>📱 Voeg deze app toe aan je startscherm voor een betere ervaring!</p>
    <button id="install-android">Toevoegen aan startscherm</button>
    <button id="close-prompt-android">Sluiten</button>
  `;

  document.body.appendChild(prompt);

  document.getElementById("install-android").addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(
          choiceResult.outcome === "accepted"
            ? "Gebruiker heeft app toegevoegd aan startscherm"
            : "Gebruiker heeft installatie geweigerd"
        );
        deferredPrompt = null;
      });
      document.body.removeChild(prompt);
    }
  });

  document.getElementById("close-prompt-android").addEventListener("click", () => {
    document.body.removeChild(prompt);
  });
}

// Selecteer de kaart en de open-knop
const card = document.getElementById('card');
const openButton = document.getElementById('open-card');


