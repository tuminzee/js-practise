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
  const n = parseInt(readLine());
  const arr = readLine().replace(/\s+$/g, "").split(" ").map(Number);
  const target = parseInt(readLine());

  console.log(waysToMakeChange(n, arr, target));
}

function waysToMakeChange(n, arr, target) {
  let memo = Array.from({
    length: target+1
  }, () => -1);


  for(let t=0; t<target+1; t++){
    memo[t] = Number(t % arr[0] === 0)
  }

  const temp = new Array(target+1).fill(0);

  for(let i=1; i < n; i++){
    for(let t=0; t <= target; t++){

      let pick = 0
      const notPick = memo[t]
      if (arr[i] <= t) pick = temp[t-arr[i]]

      temp[t] = notPick + pick
    }
    memo = temp
  }

  return memo[target]

}