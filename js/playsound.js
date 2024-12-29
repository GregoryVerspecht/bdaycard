document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('birthdayAudio');
    
    // Controleer of er interactie heeft plaatsgevonden
    const userInteracted = sessionStorage.getItem('userInteracted') === 'true';
  
    if (userInteracted) {
      // Wacht totdat het audiobestand klaar is om afgespeeld te worden
      audio.addEventListener('canplaythrough', () => {
        playSound(audio);
      });
  
      // Forceer het laden van het audiobestand
      audio.load();
    } else {
      console.log('Geen interactie gedetecteerd. Geluid wordt niet afgespeeld.');
      const warning = document.createElement('p');
      warning.textContent = 'Klik eerst op een element op de eerste pagina om geluid te activeren.';
      warning.style.color = 'red';
      document.body.appendChild(warning);
    }
  });
  
  // Voeg zowel touchstart als click toe
  document.addEventListener('click', () => {
    console.log('Klik gedetecteerd.');
    const audio = document.getElementById('birthdayAudio');
    playSound(audio);
  });
  
  document.addEventListener('touchstart', (event) => {
    console.log('Touch gedetecteerd.');
    event.preventDefault(); // Voorkom de "click"-fallback
    const audio = document.getElementById('birthdayAudio');
    playSound(audio);
  });
  
  function playSound(audio) {
    if (!audio) return;
  
    // Controleer of het audiobestand klaar is
    if (audio.readyState >= 4) {
      // Probeer het geluid af te spelen
      audio.play().then(() => {
        console.log('Audio speelt succesvol af.');
      }).catch((error) => {
        console.error('Audio kon niet automatisch worden afgespeeld:', error);
      });
    } else {
      console.log('Audio is nog niet klaar om afgespeeld te worden.');
    }
  }
  