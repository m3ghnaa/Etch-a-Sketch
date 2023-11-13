
const container = document.getElementById('grid-container');
let isDrawing = false;

function createGrid() {
  for(let i = 0; i < 16; i++) {
    for(let j = 0; j < 16; j++) {
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      container.appendChild(gridSquare);

      gridSquare.addEventListener('mousedown', () => {
        isDrawing = true;
        gridSquare.style.backgroundColor = '#FF5733';
      });

      gridSquare.addEventListener('mousemove', () => {
        if (isDrawing) {
          gridSquare.style.backgroundColor = '#FF5733';
        }
      });

      gridSquare.addEventListener('mouseup', () => {
        isDrawing = false;
      });
    }
  }
}

createGrid();
