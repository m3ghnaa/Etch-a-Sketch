

const container = document.getElementById('grid-container');
let isDrawing = false;
let isErasing = false;
let selectedColor = '#FF5733';



function createGrid() {
  const gridSizeInput = document.getElementById('grid-size');
  const gridSize = parseInt(gridSizeInput.value, 10);

  if(isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert('Please enter a valid grid size between 1 and 100');
    return;
  }

  const colorPicker = document.getElementById('color-picker');
  selectedColor = colorPicker.value;

  const selectedColorBox = document.getElementById('selected-color');
  selectedColorBox.style.backgroundColor = selectedColor;

  container.innerHTML = '';

  const squareSize = container.clientWidth / gridSize;

  for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      gridSquare.style.width = `${squareSize}px`;
      gridSquare.style.height = `${squareSize}px`;
      container.appendChild(gridSquare);

      //Mouse events
      gridSquare.addEventListener('mousedown', () => {
        if (!isErasing) {
          isDrawing = true;
          gridSquare.style.backgroundColor = selectedColor;
        }
      });

      gridSquare.addEventListener('mousemove', () => {
        if (isDrawing) {
          gridSquare.style.backgroundColor = selectedColor;
        }
      });

      gridSquare.addEventListener('mouseup', () => {
        isDrawing = false;
      });

      //Touch events
      gridSquare.addEventListener('touchstart', (event) => {
        isDrawing=true;
        handleTouch(event);
      });

      gridSquare.addEventListener('touchmove', (event) => {
        if(isDrawing){
          handleTouch(event);
        }
      });

      gridSquare.addEventListener('touchend', (event) => {
        isDrawing = false;
      });

      
    }
  }
  gridSizeInput.value = gridSize;
}



const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', () => {
  selectedColor =  colorPicker.value;

  const selectedColorBox = document.getElementById('selected-color');
  selectedColorBox.style.backgroundColor = selectedColor;
})

function handleTouch(event, gridSquare) {
  event.preventDefault();

  const touch = event.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  if (target && target.classList.contains('grid-square')) {
    target.style.backgroundColor = selectedColor;
  }
}

let selectedColorBox = document.getElementById('selected-color');

function toggleEraser() {
  console.log('Toggling eraser');

  // Use a tertiary operator to toggle between drawing color and eraser color
  selectedColor = selectedColor === 'white' ? '#FF5733' : 'white';

  console.log(selectedColor);

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
