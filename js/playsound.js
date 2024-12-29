// Functie om een flag op te slaan en eventueel geluid af te spelen
function enableSound() {
    // Sla de flag op in sessionStorage
    sessionStorage.setItem('soundEnabled', 'true');
  
    // Optioneel: speel geluid af als feedback op de eerste actie
    const audio = new Audio('assets/click-sound.mp3'); // Feedbackgeluid
    audio.play().catch((error) => {
      console.error('Geluid kan niet worden afgespeeld:', error);
    });
  }
  
  // Voeg event listeners toe aan klikbare elementen
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const card = document.querySelector('.card');
  
    // Voeg enableSound toe aan de klikacties
    if (button) {
      button.addEventListener('click', enableSound);
    }
    if (card) {
      card.addEventListener('click', enableSound);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('birthdayAudio');
    const isSoundEnabled = sessionStorage.getItem('soundEnabled') === 'true';
  
    if (isSoundEnabled) {
      audio.play().then(() => {
        console.log('Audio speelt automatisch af op Page-4.');
      }).catch((error) => {
        console.error('Audio kon niet automatisch afspelen:', error);
      });
    } else {
      console.log('Geluid is niet geactiveerd. Interactie is vereist.');
    }
  });
  