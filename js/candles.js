// SCRIPT CANDLES

function loadCandlePage() {
    console.log("loadCandlePage wordt uitgevoerd.");
    loadCandles();
  }
  
  function loadCandles() {
    console.log("loadCandles wordt uitgevoerd.");
    const candlesContainer = document.getElementById("candles");
    if (!candlesContainer) {
      console.error("Element met id 'candles' niet gevonden.");
      return;
    }
    candlesContainer.innerHTML = ""; // Reset container
    for (let i = 0; i < 24; i++) {
      const candle = document.createElement("div");
      candle.classList.add("candle");
      candle.setAttribute('aria-label', `Kaars ${i+1}`); // Toegankelijkheid
      const flame = document.createElement("div");
      flame.classList.add("flame");
      candle.appendChild(flame);
      candlesContainer.appendChild(candle);
    }
  }
  
  // Detecteer blaasinput
  function enableBlowing() {
    console.log("enableBlowing wordt uitgevoerd.");
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
    console.log("extinguishCandle wordt uitgevoerd.");
    const flame = document.querySelector(".flame");
    if (flame) {
      flame.style.opacity = "0";
      flame.style.transition = "opacity 0.75s";
      flame.classList.remove("flame");
    } else {
      loadFinalPage();
    }
  }
  
  function loadFinalPage() {
    console.log("loadFinalPage wordt uitgevoerd.");
    window.location.href = 'page-4.html';
  }
  
  // Voeg de DOMContentLoaded listener toe
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event gedetecteerd in candles.js.");
    loadCandlePage();

      // Voeg klik- en touch event listeners toe aan elke kaars
  const candles = document.querySelectorAll('.candle');
  candles.forEach(candle => {
    candle.addEventListener('click', extinguishCandle);
    candle.addEventListener('touchstart', extinguishCandle);
  });

  });
  
