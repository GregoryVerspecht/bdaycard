// Controleer of de app in standalone modus draait
if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("Running in standalone mode");
  } else {
    alert("Je kan deze ook op je startscherm toevoegen als webapp!");
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
        <p id="hint">Tip: Probeer te blazen naar je microfoon!</p>
      </div>
      <div id="popup" class="hidden">
        <h2>Indien geluid niet werkt</h2>
        <button id="click-to-extinguish">Klik om verder te gaan</button>
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
  
  // Functie om de eindboodschap en het liedje te tonen
  function showFinalMessage() {
    playMusic(); // Speel muziek af
    document.getElementById("app").innerHTML = `
      <div id="final">
        <h1>Gefeliciteerd, Hind! 🎉</h1>
        <p>Alle kaarsjes zijn uitgeblazen. Geniet van je dag! - 80 + muziek</p>
        <audio id="birthday-music" controls autoplay>
          <source src="assets/happy-birthday.mp3" type="audio/mpeg">
          Jouw browser ondersteunt geen audio-element.
        </audio>
      </div>
    `;
  }
  
  // Start met de voorkant
  document.addEventListener("DOMContentLoaded", () => {
    loadFront();
  });
  