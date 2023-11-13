
const container = document.getElementById('grid-container');


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

      gridSquare.addEventListener('mousedown', () => {
        isDrawing = true;
        gridSquare.style.backgroundColor = selectedColor;
      });

      gridSquare.addEventListener('mousemove', () => {
        if (isDrawing) {
          gridSquare.style.backgroundColor = selectedColor;
        }
      });

      gridSquare.addEventListener('mouseup', () => {
        isDrawing = false;
      });
    }
  }
  gridSizeInput.value = gridSize;
}


createGrid();
