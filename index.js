const sudoku_solver = document.querySelector("#sudoku-solver");
const example_button = document.querySelector("#example-button");

let tries = 0;
let data = []
let solution = []
let example = [
  ["5", "", "4", "6", "", "8", "9", "1", "2"],
  ["", "7", "2", "", "", "", "3", "4", "8"],
  ["1", "", "", "3", "4", "2", "5", "", "7"],
  ["", "5", "9", "7", "", "1", "4", "2", ""],
  ["", "2", "6", "", "5", "", "7", "9", ""],
  ["", "1", "3", "9", "", "4", "8", "5", ""],
  ["9", "", "1", "5", "3", "7", "", "", "4"],
  ["2", "8", "7", "", "", "", "6", "3", ""],
  ["3", "4", "5", "2", "", "6", "1", "", ""]
]

let clean_board = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""]
]

let example_solution = [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
]

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

function solve() {
  tries++;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let n_row = 0;
  for (let row of data) {
    let n_cell = 0;
    for (let cell of row) {
      if (cell == '') {
        for (let number of numbers) {
          number = number.toString();
          if (check_row(number, row) && check_column(number, data, n_cell) && check_3x3(number, data, n_row, n_cell)) {
            console.log(tries)
            data[n_row][n_cell] = number;
            if (solve()) {
              return true;
            } else {
              data[n_row][n_cell] = ''
            }
          }      
        }
        return false;
      }
      n_cell++;
    }
    n_row++;
  }
  return true;
}

function check_row(possible_value, row) {
  return !row.includes(possible_value);
}

function check_column(possible_value, solution, n_cell) {
  let result = true;
  for (let row of solution) {
    if (row[n_cell] == possible_value) {
      result = false
    }
  }

  return result;
}

function check_3x3(possible_value, solution, n_row, n_cell) {
  let result = true;

  let first_row = ~~(n_row / 3) * 3;
  let first_cell = ~~(n_cell / 3) * 3;

  for (let i = first_row; i <= first_row + 2 && result; i++) {
    for (let h = first_cell; h <= first_cell + 2 && result; h++) {
      result = !(solution[i][h] == possible_value);
    }
  }

  return result;
}

function data_to_board(result) {
  let rows = sudoku_solver.children[0].children;
  let n_row = 0;
  for (let row of rows) {
    let cells = row.children;
    let n_cell = 0;
    for (let cell of cells) {
      cell.children[0].value = result[n_row][n_cell]
      n_cell++;
    }
    n_row++;
  }
}

sudoku_solver.addEventListener('submit', (event) => {
  event.preventDefault();
  get_data();
  solve();
  console.log(tries)
  data_to_board(data);
});

example_button.addEventListener('click', (event) => {
  event.preventDefault();
  load_example();
});