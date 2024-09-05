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
    const [n, k] = readLine().replace(/\s+$/g, "").split(" ").map(Number);
    const arr = readLine().replace(/\s+$/g, "").split(" ").map(Number);
    console.log(subsetSumToK(n, k, arr));
    t--;
  }
}

/**
 * @param {number} n
 * @param {number} k
 * @param {number[]} arr
 * @returns {boolean}
 */
function subsetSumToK(n, k, arr) {
  let dp = new Array(k + 1).fill(false);

  dp[0] = true;

  if (arr[0] <= k) {
    dp[arr[0]] = true;
  }

  for (let i = 1; i < n; i++) {
    const temp = new Array(k + 1).fill(false);
    for (let target = 1; target <= k; target++) {
      let notPick = dp[target];
      let pick = false;
      if (arr[i] <= target) pick = dp[target - arr[i]];

      temp[target] = pick || notPick;
    }

    dp = temp;
  }

  return dp[k];
}
