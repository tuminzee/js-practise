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
    const n = parseInt(readLine());
    const wi = readLine().replace(/\s+$/g, "").split(" ").map(Number);
    const vi = readLine().replace(/\s+$/g, "").split(" ").map(Number);
    const w = parseInt(readLine());

    console.log(knapsack(n, wi, vi, w));

    t--;
  }
}

function knapsack(n, wi, vi, w) {
  const dp = Array.from({ length: n + 1 }, () => Array(w + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= w; j++) {
      if (wi[i - 1] <= j) {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - wi[i - 1]] + vi[i - 1]
        );
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][w];
}


// /**
//  * @param {number} n
//  * @param {number[]} wi
//  * @param {number[]} vi
//  * @param {number} w
//  * @returns {number}
//  */
// function knapsack(n, wi, vi, w) {
//   const memo = Array.from({ length: n }, () =>
//     Array.from({ length: w + 1 }, () => -1)
//   );

//   function pickNotPick(index, weightsLeft) {
//     if (index == 0 ) {
//       if (weightsLeft >= wi[0]) return vi[0]
//       else return 0
//     }
//     if (memo[index][weightsLeft] != -1) return memo[index][weightsLeft];

//     let pick = -Infinity,
//       notPick = -Infinity;

//     if (wi[index] <= weightsLeft) {
//       pick = vi[index] + pickNotPick(index - 1, weightsLeft - wi[index]);
//     }
//     notPick = pickNotPick(index - 1, weightsLeft);

//     memo[index][weightsLeft] = Math.max(pick, notPick);
//     return memo[index][weightsLeft];
//   }

//   return pickNotPick(n-1, w);
// }
