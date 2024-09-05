// @ts-check
"use strict";

/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  let curr = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );
  let next = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );

  for (let c1 = 0; c1 < n; c1++) {
    for (let c2 = 0; c2 < n; c2++) {
      if (c1 === c2) {
        curr[c1][c2] = grid[m - 1][c1];
      } else {
        curr[c1][c2] = grid[m - 1][c1] + grid[m - 1][c2];
      }
    }
  }

  for (let i = m - 2; i >= 0; i--) {
    for (let j1 = 0; j1 < n; j1++) {
      for (let j2 = 0; j2 < n; j2++) {
        let points = -Infinity;
        for (let c1 = -1; c1 <= 1; c1++) {
          for (let c2 = -1; c2 <= 1; c2++) {
            const newJ1 = j1 + c1;
            const newJ2 = j2 + c2;

            if (newJ1 < 0 || newJ2 < 0 || newJ1 >= n || newJ2 >= n) continue;

            if (j1 === j2) {
              points = Math.max(points, grid[i][j1] + curr[newJ1][newJ2]);
            } else {
              points = Math.max(
                points,
                grid[i][j1] + grid[i][j2] + curr[newJ1][newJ2]
              );
            }
          }
        }

        next[j1][j2] = points;
      }
    }
    [curr, next] = [next, curr];
  }

  return curr[0][n - 1];
};

// TC = O(m * n * n) * 9 ~= O(m * n * n)
// SC = O(n * n)

console.log(
  cherryPickup([
    [4, 1, 5, 7, 1],
    [6, 0, 4, 6, 4],
    [0, 9, 6, 3, 5],
  ])
);

console.log(
  cherryPickup([
    [3, 1, 1],
    [2, 5, 1],
    [1, 5, 5],
    [2, 1, 1],
  ])
);

console.log(
  cherryPickup([
    [1, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 3, 0],
    [2, 0, 9, 0, 0, 0, 0],
    [0, 3, 0, 5, 4, 0, 0],
    [1, 0, 2, 3, 0, 0, 6],
  ])
);
