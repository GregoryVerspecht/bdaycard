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

// Content management
function loadPage(headerText, contentHtml, footerText) {
  const header = document.getElementById("header");
  const content = document.getElementById("content");
  const footer = document.getElementById("footer");

  header.innerHTML = `<h1>${headerText}</h1>`;
  content.innerHTML = contentHtml;
  footer.innerHTML = `<p>${footerText}</p>`;
}

// Dynamische inhoud voor "pagina's"
function loadFrontPage() {
    loadPage(
      ` 
      <h>🎉🎉🎉</h> <br>
      <h>Welkom op Hind's </h><br>
      <h>verjaardagskaart!</h><br>
      <h>🎉🎉🎉 - Versie 1</h>
      `
      ,
      `
        <img src="assets/hind-photo.jpg" alt="Foto van Hind" id="hind-photo">
        
      `,
      `
        <button onclick="loadIntroCandlePage()"> 👉🏼 Open jouw kaartje! 👈🏼</button>
      `
    );
  }
 
function loadIntroCandlePage() {
    loadPage(
      "🌬️ Hind maakt wind! 🌬️ ",
      `
      <h1>Adem heeeel diep in!</h1> 
      <p>Je gaat zo meteen zo hard mogelijk naar je gsm moeten blazen!
      Maar echt Hind, blazen eh!
      </p>
      <p></p>
      <img src="assets/blow.webp" alt="Foto van Hind" id="blow-gif">
      <p></p>
      <p>ℹ️ Tip: blaas naar je microfoon! ℹ️</p> 
        
      `,
      `<button onclick="loadCandlePage()"> 👉🏼 Ik ben klaar, laat mij blazen! 👈🏼</button>
      ` 
    );
    loadCandles();
    enableBlowing();
  } 

function loadCandlePage() {
  loadPage(
    "🕯️Blaas al je 24 kaarsjes uit!🕯️",
    `
    
    <div id="candles"></div>
      
    `,
    `
     <button onclick="loadFinalPage()"> 🥵 Help ik kan niet blazen! 🥵</button>
    ` 
  );
  loadCandles();
  enableBlowing();
}

function loadFinalPage() {
    loadPage(
      "Gefeliciteerd, Hind! 🎉",
      `
        <h2> 🎉 Van harte gefeliciteerd met je verjaardag Hind! 🎉 </h2>
        <audio controls autoplay>
          <source src="assets/happy-birthday.mp3" type="audio/mpeg">
          Jouw browser ondersteunt geen audio-element.
        </audio>
      `,
      `
        <button onclick="loadFrontPage()">🤗 Beleef je kaart opnieuw! 🤗</button>
      `
    );
  }

// Functie om kaarsjes dynamisch te genereren
function loadCandles() {
  const candlesContainer = document.getElementById("candles");
  candlesContainer.innerHTML = ""; // Reset container
  for (let i = 0; i < 24; i++) {
    const candle = document.createElement("div");
    candle.classList.add("candle");
    const flame = document.createElement("div");
    flame.classList.add("flame");
    candle.appendChild(flame);
    candlesContainer.appendChild(candle);
  }
}

// Detecteer blaasinput
function enableBlowing() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.fftSize = 256;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

      if (avgVolume > 80) {
        extinguishCandle();
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  }).catch(() => {
    alert("Microfoon toegang geweigerd. Klik op de kaarsjes om ze uit te blazen.");
  });
}

// Blaas kaarsjes uit
function extinguishCandle() {
  const flame = document.querySelector(".flame");
  if (flame) {
    flame.style.opacity = "0";
    flame.style.transition = "opacity 0.75s";
    flame.classList.remove("flame");
  } else {
    loadFinalPage();
  }
}

// Start de app
document.addEventListener("DOMContentLoaded", loadFrontPage);
