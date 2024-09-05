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
    const n = parseInt(readLine());
    const arr = readLine().replace(/\s+$/g, "").split(" ").map(Number);
    console.log(rodCutting(n, arr));
    t--;
  }

  function rodCutting(n, arr) {
    let dp = Array(n - 1).fill(0);
    let temp = Array(n - 1).fill(0);

    for (let i = 0; i < n + 1; i++) {
      dp[i] = arr[0] * i;
    }

    for (let i = 1; i < n; i++) {
      for (let moves = 0; moves < n + 1; moves++) {
        let pick = 0,
          notPick = 0;

        if (i + 1 <= moves) pick = arr[i] + temp[moves - (i + 1)];
        notPick = dp[moves];

        temp[moves] = Math.max(pick, notPick);
      }
      dp = temp;
    }

    return dp[n];
  }
}
