const body = document.body;

function setGradientBackground(e) {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  body.style.backgroundImage = `radial-gradient(at ${x}% ${y}%, #ee7752, #e73c7e, #23a6d5, #23d5ab)`;
}

body.addEventListener('mousemove', setGradientBackground);
