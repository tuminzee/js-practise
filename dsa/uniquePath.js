// @ts-check
"use strict";

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const memo = {};
  function solve(i, j) {
    if (i === m - 1 && j === n - 1) return 1;
    if (i < 0 || i >= m || j < 0 || j >= n) return 0;
    const key = `${i},${j}`;
    if (key in memo) return memo[key];

    const bottom = solve(i + 1, j);
    const right = solve(i, j + 1);

    memo[key] = bottom + right;
    return memo[key];
  }
  return solve(0, 0);
};

console.log(uniquePaths(3, 7));
console.log(uniquePaths(3, 2));
