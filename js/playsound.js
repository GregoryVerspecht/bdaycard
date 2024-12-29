document.addEventListener('DOMContentLoaded', () => {
    // Controleer of er interactie heeft plaatsgevonden
    const userInteracted = sessionStorage.getItem('userInteracted') === 'true';
  
    if (userInteracted) {
      playSound();
    } else {
      console.log('Geen interactie gedetecteerd. Geluid wordt niet afgespeeld.');
      const warning = document.createElement('p');
      warning.textContent = 'Klik eerst op een element op de eerste pagina om geluid te activeren.';
      warning.style.color = 'red';
      document.body.appendChild(warning);
    }
  });

  document.addEventListener('click', (event) => {
     
      console.log('Ergens anders op het scherm geklikt, niet op een knop of kaart.');
      playSound();
   
  });

  // Voeg zowel touchstart als click toe
  document.addEventListener('touchstart', (event) => {
    console.log('Touch event gedetecteerd!');
    event.preventDefault(); // Voorkom de "click"-fallback
    playSound();
  });
  

  function playSound() {
    const audio = document.getElementById('birthdayAudio');
  
    // Probeer het geluid af te spelen
    audio.play().then(() => {
      console.log('Audio speelt af omdat er interactie was.');
    }).catch((error) => {
      console.error('Audio kon niet automatisch worden afgespeeld:', error);
    });

}