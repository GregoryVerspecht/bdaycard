document.getElementById("surprise-btn").addEventListener("click", () => {
    const music = document.getElementById("birthday-music");
    music.play();
    alert("🎉 Surprise! Wishing you the best day ever, Hind!");
  });
 
  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("Running in standalone mode");
  } else {
    alert("Je kan deze ook op je startscherm toevoegen als webapp!!");
  }

 // Functie om de voorkant van de kaart te laden
function loadFront() {
    document.getElementById("app").innerHTML = `
      <div id="front">
        <img src="assets/hind-photo.jpg" alt="Foto van Hind" id="hind-photo">
        <button id="open-card-btn">Open de kaart</button>
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
        <h2>Ja nee eh Hind... dat gaat zo niet 🤣</h2>
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
    let micTimeout;
  
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
  
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
      function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
  
        if (avgVolume > 50) {
          clearTimeout(micTimeout);
          micTimeout = setTimeout(() => {
            showPopup();
          }, 4000);
        }
        requestAnimationFrame(detectBlow);
      }
      detectBlow();
    }).catch(() => {
      alert("Microfoon toegang geweigerd. Klik op de kaarsjes om ze uit te blazen.");
    });
  
    // Voeg click-handler toe voor als blazen niet werkt
    document.getElementById("click-to-extinguish").addEventListener("click", () => {
      alert("Alle kaarsjes zijn uit! 🎉 Gefeliciteerd Hind!");
      document.getElementById("popup").classList.add("hidden");
    });
  }
  
  // Functie om de popup te tonen
  function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("inside").classList.add("hidden");
  }
  
  // Start de kaart met de voorkant
  loadFront();
  