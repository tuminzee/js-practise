// @ts-check
"use strict";

/**
 * @param {number} n
 * @param {number []} heights
 * @returns {number}
 */
function frogJump(n, heights) {
  const memo = {};
  memo[n - 1] = 0;
  /**
   *
   * @param {number} i
   * @returns {number}
   */
  let solve = function (i) {
    process.stdout.write(`${i} `);
    if (i in memo) return memo[i];
    let step1 = 1001,
      step2 = 1001;
    if (i + 1 < n) step1 = Math.abs(heights[i] - heights[i + 1]) + solve(i + 1);
    if (i + 2 < n) step2 = Math.abs(heights[i] - heights[i + 2]) + solve(i + 2);

    memo[i] = Math.min(step1, step2);
    return memo[i];
  };
  return solve(0);
}

console.log(frogJump(6, [30, 10, 60, 10, 60, 50]));
console.log(frogJump(8, [7, 4, 4, 2, 6, 6, 3, 4]));
console.log(frogJump(6, [4, 8, 3, 10, 4, 4]));
console.log(frogJump(4, [10, 20, 30, 10]));
console.log(frogJump(3, [10, 20, 10]));
