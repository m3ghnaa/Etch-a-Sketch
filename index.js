const container = document.getElementById('grid-container');
const randomizeButton = document.getElementById('randomize-button');
let isRandomizing = false;
let isDrawing = false;
let isErasing = false;
let selectedColor = '#FF5733';

function getRandomRGB() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function createGrid() {
  const gridSizeInput = document.getElementById('grid-size');
  const gridSize = parseInt(gridSizeInput.value, 10);

  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert('Please enter a valid grid size between 1 and 100');
    return;
  }

  const colorPicker = document.getElementById('color-picker');
  selectedColor = colorPicker.value;

  const selectedColorBox = document.getElementById('selected-color');
  selectedColorBox.style.backgroundColor = selectedColor;

  container.innerHTML = '';

  const squareSize = container.clientWidth / gridSize;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      gridSquare.style.width = `${squareSize}px`;
      gridSquare.style.height = `${squareSize}px`;
      container.appendChild(gridSquare);

      // Mouse events
      gridSquare.addEventListener('mousedown', (event) => {
        handleMouseInteraction(event, gridSquare);
      });

      gridSquare.addEventListener('mousemove', (event) => {
        if (event.buttons === 1) {
          handleMouseInteraction(event, gridSquare);
        } else {
          isDrawing = false;
        }
      });

      gridSquare.addEventListener('mouseup', () => {
        isDrawing = false;
      });

      // Touch events
      gridSquare.addEventListener('touchstart', (event) => {
        handleTouchStart(event.touches[0], gridSquare);
      });

      gridSquare.addEventListener('touchmove', (event) => {
        handleTouchMove(event.touches[0], gridSquare);
      });

      gridSquare.addEventListener('touchend', () => {
        isDrawing = false;
      });
    }
  }
  gridSizeInput.value = gridSize;
}

randomizeButton.addEventListener('click', () => {
  if (!isRandomizing) {
    // Display alert message for the first click
    alert("Note: If you want to use the eraser while randomizing, please stop the randomizing, use the eraser, then start the randomizing again.");
  }

  isRandomizing = !isRandomizing;
  randomizeButton.textContent = isRandomizing ? 'Stop Randomizing' : 'Randomize Colors';
});

const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', () => {
  selectedColor = colorPicker.value;
  const selectedColorBox = document.getElementById('selected-color');
  selectedColorBox.style.backgroundColor = selectedColor;
});

function handleMouseInteraction(event, gridSquare) {
  if (isErasing) {
    // If eraser is selected, set the square's color to white
    gridSquare.style.backgroundColor = 'white';
  } else if (isRandomizing) {
    // If randomizing is enabled, set the square's color to a random color
    const randomColor = getRandomRGB();
    gridSquare.style.backgroundColor = randomColor;
  } else {
    // Regular drawing behavior
    isDrawing = true;
    gridSquare.style.backgroundColor = selectedColor;
  }
}

function handleTouchStart(touch, gridSquare) {
  event.preventDefault();
  handleInteraction(touch, gridSquare);
}

function handleTouchMove(touch, gridSquare) {
  event.preventDefault();
  handleInteraction(touch, gridSquare);
}

function handleInteraction(interactionEvent, gridSquare) {
  if (isErasing) {
    // If eraser is selected, set the square's color to white
    gridSquare.style.backgroundColor = 'white';
  } else if (isRandomizing) {
    // If randomizing is enabled, set the square's color to a random color
    const randomColor = getRandomRGB();
    gridSquare.style.backgroundColor = randomColor;
  } else {
    // Regular drawing behavior
    isDrawing = true;
    gridSquare.style.backgroundColor = selectedColor;
  }
}

let selectedColorBox = document.getElementById('selected-color');

function toggleEraser() {
  if (isRandomizing) {
    // If randomizing is enabled, set the selectedColor to white
    selectedColor = 'white';
  } else {
    // If randomizing is not enabled, toggle between drawing color and eraser color
    selectedColor = selectedColor === 'white' ? '#FF5733' : 'white';
  }

  // Update the selectedColorBox and color picker
  selectedColorBox.style.backgroundColor = selectedColor;
}


function clearGrid() {
  const gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach((gridSquare) => {
    gridSquare.style.backgroundColor = 'white';
  });
}

createGrid();

