// @ts-check
"use strict";

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dp = new Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    const temp = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) temp[j] = 1;
      else {
        let up = 0,
          left = 0;
        if (i > 0) up = dp[j];
        if (j > 0) left = temp[j - 1];
        temp[j] = left + up;
      }
    }
    dp = temp;
  }
  return dp[n - 1];
};

console.log(uniquePaths(3, 2));
console.log(uniquePaths(3, 7));
console.log(uniquePaths(50, 10));
