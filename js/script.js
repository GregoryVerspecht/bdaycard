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
  