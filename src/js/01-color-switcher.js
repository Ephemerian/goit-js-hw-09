const body = document.querySelector('body');
let intervalId = null;

body.addEventListener('click', onClick);

// Handle click events
function onClick(event) {
  const targetElement = event.target;

  if (targetElement.hasAttribute('data-start')) {
    targetElement.disabled = true;
    intervalId = setInterval(setColorToBody, 1000);
  }

  if (targetElement.hasAttribute('data-stop')) {
    body.children[1].disabled = false;
    clearInterval(intervalId);
  }
}

// Set the background color of the body element to a random hex color
function setColorToBody() {
    body.style.backgroundColor = getRandomHexColor();
  }

// Generate a random hex color
function getRandomHexColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0);
    return `#${color}`;
  }