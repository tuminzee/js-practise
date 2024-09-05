// @ts-check
"use strict";

/**
 * @param {number} n
 * @param {number []} heights
 * @returns {number}
 */
function frogJump(n, heights) {
  let prev = Math.abs(heights[0] - heights[1]);
  let prevToPrev = 0;
  let curr = 0;

  for (let i = 2; i < n; i++) {
    curr = Math.min(
      Math.abs(heights[i] - heights[i - 1]) + prev,
      Math.abs(heights[i] - heights[i - 2]) + prevToPrev
    );
    prevToPrev = prev;
    prev = curr;
  }
  return curr;
}

console.log(frogJump(6, [30, 10, 60, 10, 60, 50]));
console.log(frogJump(8, [7, 4, 4, 2, 6, 6, 3, 4]));
console.log(frogJump(6, [4, 8, 3, 10, 4, 4]));
console.log(frogJump(4, [10, 20, 30, 10]));
console.log(frogJump(3, [10, 20, 10]));
