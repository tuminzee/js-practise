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
    console.log(maxPathSum(matrix));
    t--;
  }

  /**
   * @param {number[][]} grid
   * @returns {number}
   */
  function maxPathSum(grid) {
    const m = grid.length,
      n = grid[0].length;

    let prev = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      prev[i] = grid[0][i];
    }

    for (let i = 1; i < m; i++) {
      const curr = new Array(n).fill(0);
      for (let j = 0; j < n; j++) {
        let up = -Infinity,
          left = -Infinity,
          right = -Infinity;

        up = grid[i][j] + prev[j];
        if (j - 1 >= 0) left = grid[i][j] + prev[j - 1];
        if (j + 1 <= n - 1) right = grid[i][j] + prev[j + 1];

        curr[j] = Math.max(up, left, right);
      }
      prev = curr;
    }

    let maxSum = -Infinity;
    for (let i = 0; i < n; i++) {
      maxSum = Math.max(maxSum, prev[i]);
    }

    return maxSum;
  }
}
