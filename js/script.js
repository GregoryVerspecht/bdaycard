document.getElementById("surprise-btn").addEventListener("click", () => {
    const music = document.getElementById("birthday-music");
    music.play();
    alert("🎉 Surprise! Wishing you the best day ever, Hind!");
  });
 
  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("Running in standalone mode");
  } else {
    alert("Voor de beste ervaring, voeg de app toe aan je startscherm!");
  }

  // Stap 1: Voorkant tonen
document.getElementById("open-card-btn").addEventListener("click", () => {
    document.getElementById("front").classList.add("hidden");
    document.getElementById("inside").classList.remove("hidden");
    loadCandles();
  });
  
  // Stap 2: Dynamisch kaarsjes genereren
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
  
  // Stap 3: Microfoon activeren
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
          document.getElementById("popup").classList.remove("hidden");
          document.getElementById("inside").classList.add("hidden");
        }, 4000);
      }
      requestAnimationFrame(detectBlow);
    }
    detectBlow();
  }).catch(() => {
    alert("Microfoon toegang geweigerd. Klik op de kaarsjes om ze uit te blazen.");
  });
  
  // Stap 4: Grappige popup en klik-actie
  document.getElementById("click-to-extinguish").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
    alert("Alle kaarsjes zijn uit! 🎉 Gefeliciteerd Hind!");
  });
  