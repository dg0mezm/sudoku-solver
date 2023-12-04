const sudoku_solver = document.querySelector("#sudoku-solver");
const example_button = document.querySelector("#example-button");

let data = []
let example = [
  ["", "", "4", "6", "", "8", "9", "1", "2"],
  ["", "7", "2", "", "", "", "3", "4", "8"],
  ["1", "", "", "3", "4", "2", "5", "", "7"],
  ["", "5", "9", "7", "", "1", "4", "2", ""],
  ["", "2", "6", "", "5", "", "7", "9", ""],
  ["", "1", "3", "9", "", "4", "8", "5", ""],
  ["9", "", "1", "5", "3", "7", "", "", "4"],
  ["2", "8", "7", "", "", "", "6", "3", ""],
  ["3", "4", "5", "2", "", "6", "1", "", ""]
]

let solve = [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
]

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

function load_example() {
  let rows = sudoku_solver.children[0].children;
  let n_row = 0;
  for (let row of rows) {
    let cells = row.children;
    let n_cell = 0;
    for (let cell of cells) {
      cell.children[0].value = example[n_row][n_cell]
      n_cell++;
    }
    n_row++;
  }
}

sudoku_solver.addEventListener('submit', (event) => {
  event.preventDefault();
  get_data();
});

example_button.addEventListener('click', (event) => {
  event.preventDefault();
  load_example();
});