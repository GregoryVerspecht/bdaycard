let deferredPrompt; // Variabele om het installatieprompt op Android te beheren

// Detecteer of de app niet in standalone modus draait
if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("Running in standalone mode");
} else {
  // Detecteer platform
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // Toon iOS installatiemelding
    showIOSInstallPrompt();
  } else if (/Android/i.test(navigator.userAgent)) {
    // Luister naar het beforeinstallprompt event voor Android
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // Voorkom de automatische prompt
      deferredPrompt = e; // Sla het event op voor later gebruik
      showAndroidInstallPrompt(); // Toon Android melding
    });
  }
}

// Functie om een iOS-installatie melding te tonen
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
    <p style="margin: 0 0 10px;">📱 Voeg deze app toe aan je startscherm voor een betere ervaring!</p>
    <ol style="text-align: left; padding: 0 20px; margin: 0; font-size: 14px;">
      <li>Druk op het <strong>Deel-icoon</strong> <span style="font-size: 16px;">📤</span> onderaan of bovenaan Safari.</li>
      <li>Kies <strong>'Zet op beginscherm'</strong>.</li>
      <li>Geef de app een naam en druk op <strong>'Voeg toe'</strong>.</li>
    </ol>
    <button id="close-prompt-ios" style="
      margin-top: 10px;
      padding: 8px 15px;
      background: #ff6b6b;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    ">Sluiten</button>
  `;

  document.body.appendChild(prompt);
  document.getElementById("close-prompt-ios").addEventListener("click", () => {
    document.body.removeChild(prompt);
  });
}

// Functie om een Android-installatie melding te tonen
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
    <p style="margin: 0 0 10px;">📱 Voeg deze app toe aan je startscherm voor een betere ervaring!</p>
    <button id="install-android" style="
      padding: 8px 15px;
      background: #ff6b6b;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    ">Toevoegen aan startscherm</button>
    <button id="close-prompt-android" style="
      margin-left: 10px;
      padding: 8px 15px;
      background: #ccc;
      color: #333;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    ">Sluiten</button>
  `;

  document.body.appendChild(prompt);

  document.getElementById("install-android").addEventListener("click", () => {
    deferredPrompt.prompt(); // Toon de echte installatieprompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Gebruiker heeft app toegevoegd aan startscherm");
      } else {
        console.log("Gebruiker heeft installatie geweigerd");
      }
      deferredPrompt = null; // Reset het event
    });
    document.body.removeChild(prompt); // Verwijder de prompt
  });

  document.getElementById("close-prompt-android").addEventListener("click", () => {
    document.body.removeChild(prompt); // Sluit de melding
  });
}

  
  // Functie om de voorkant van de kaart te laden
  function loadFront() {
    document.getElementById("app").innerHTML = `
      <div id="front">
        <div class="card">
          <img src="assets/hind-photo.png" alt="Foto van Hind" id="hind-photo">
          <button id="open-card-btn">Open de kaart</button>
        </div>
      </div>
    `;
  
    // Voeg event listener toe aan de knop
    document.getElementById("open-card-btn").addEventListener("click", loadInside);
  }
  
  // Functie om de binnenkant van de kaart te laden
  function loadInside() {
    document.getElementById("app").innerHTML = `
      <div id="inside">
        <h1>🎂 Blaas de 24 kaarsjes uit! 🎂</h1>
        <div id="candles"></div>
        <p id="hint">Tip: Probeer hard te blazen naar je microfoon hehe!</p>
      </div>
      <div id="popup" class="hidden">
        
        <button id="click-to-extinguish">Ik kan niet blazen :( </button>
      </div>
    `;
  
    // Dynamisch kaarsjes laden
    loadCandles();
  
    // Voeg logica voor microfoon en popup toe
    enableBlowing();
  }
  
  // Functie om de kaarsjes te genereren
  function loadCandles() {
    const candlesContainer = document.getElementById("candles");
    for (let i = 0; i < 24; i++) {
      const candle = document.createElement("div");
      candle.classList.add("candle");
      const flame = document.createElement("div");
      flame.classList.add("flame");
      candle.appendChild(flame);
      candlesContainer.appendChild(candle);
    }
  }
  
  // Functie om microfooninput te detecteren
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
          extinguishCandle(); // Blaas dynamisch kaarsjes uit
        }
  
        requestAnimationFrame(detectBlow); // Blijf luisteren naar de microfoon
      }
      detectBlow();
    }).catch(() => {
      alert("Microfoon toegang geweigerd. Klik op de kaarsjes om ze uit te blazen.");
    });
  
    // Fallback: Voeg een knop toe om kaarsjes handmatig uit te blazen
    document.getElementById("click-to-extinguish").addEventListener("click", () => {
      showFinalMessage();
    });
  }
  
  
  // Functie om kaarsjes één voor één uit te blazen
  function extinguishCandle() {
    const flame = document.querySelector(".flame");
    if (flame) {
      flame.style.opacity = "0"; // Verberg de vlam
      flame.style.transition = "opacity 0.75s";
      flame.classList.remove("flame");
    } else {
      showFinalMessage();
    }
  }

  // Functie om het liedje af te spelen
function playMusic() {
    const music = document.getElementById("birthday-music");
    music.play()
      .then(() => {
        console.log("Muziek speelt af!");
      })
      .catch((error) => {
        console.error("Kan muziek niet afspelen:", error);
      });
  }
    
  // Start met de voorkant
  document.addEventListener("DOMContentLoaded", () => {
    loadFront();
  });
  
  function showFinalMessage() {
    document.getElementById("app").innerHTML = `
      <div id="final">
        <h1>Gefeliciteerd, Hind! 🎉</h1>
        <p>Alle kaarsjes zijn uitgeblazen. Geniet van je dag!</p>
        <audio id="birthday-music" controls autoplay>
          <source src="assets/happy-birthday.mp3" type="audio/mpeg">
          Jouw browser ondersteunt geen audio-element.
        </audio>
      </div>
    `;
  
    // Voeg confetti toe
    startConfetti();
  }
  
  // Confetti-generatie
  function startConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = 0;
    confettiContainer.style.left = 0;
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.classList.add("confetti");
  
    document.body.appendChild(confettiContainer);
  
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
      confettiContainer.appendChild(confetti);
    }
  }
  
  // Voeg CSS voor confetti toe
  const confettiStyles = document.createElement("style");
  confettiStyles.innerHTML = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
  .confetti div {
    animation-delay: calc(var(--i) * 0.1s);
  }
  `;
  document.head.appendChild(confettiStyles);
  