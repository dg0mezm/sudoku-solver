const sudoku_solver = document.querySelector("#sudoku-solver");

let data = []

function get_data() {
  let rows = sudoku_solver.children[0].children;
  for (let row of rows) {
    let row_data = []
    let cells = row.children
    for (let cell of cells) {
      row_data.push(cell.children[0].value);
    }
    data.push(row_data)
  }
}

sudoku_solver.addEventListener('submit', (event) => {
  event.preventDefault();
  get_data();
})