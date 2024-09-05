/* Declare and implement your function here 
eg: function example(parameter_name1,parameter_name2....){}
Handle the input/output from main()
*/

// @ts-check
"use strict";

process.stdin.resume();
process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on("data", function (data) {
  input_stdin += data;
});

process.stdin.on("end", function () {
  // @ts-ignore
  input_stdin_array = input_stdin.split("\n");
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

function main() {
  let t = parseInt(readLine());

  while (t) {
    const [m] = readLine().replace(/\s+$/g, "").split(" ").map(Number);
    const matrix = [];
    for (let i = 0; i < m; i++) {
      const arr = readLine().replace(/\s+$/g, "").split(" ").map(Number);
      matrix.push(arr);
    }
    console.log(minSumPath(matrix));
    t--;
  }

  /**
   * @param {number[][]} grid
   * @returns {number}
   */
  function minSumPath(grid) {
    const m = grid.length,
      n = grid[0].length;

    let prev = new Array(n).fill(0);

    for (let i = 0; i < m; i++) {
      const curr = new Array(n).fill(0);
      for (let j = 0; j < n; j++) {
        if (i == 0 && j == 0) {
          curr[0] = grid[0][0];
        } else {
          let left = Infinity,
            up = Infinity;
          if (j - 1 >= 0) left = grid[i][j] + curr[j - 1];
          if (i - 1 >= 0) up = grid[i][j] + prev[j];

          curr[j] = Math.min(left, up);
        }
      }
      prev = curr;
    }

    return prev[n - 1];
  }
}
