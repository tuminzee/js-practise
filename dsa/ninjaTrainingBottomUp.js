/* Declare and implement your function here 
eg: function example(parameter_name1,parameter_name2....){}
Handle the input/output from main()
*/

process.stdin.resume();
process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on("data", function (data) {
  input_stdin += data;
});

process.stdin.on("end", function () {
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
    const matrix = [];
    for (let i = 0; i < n; i++) {
      const arr = readLine().replace(/\s+$/g, "").split(" ").map(Number);
      matrix.push(arr);
    }
    console.log(ninjaTraining(n, matrix));
    t--;
  }

  /**
   * @param {number} n
   * @param {number[][]} arr
   * @returns {number}
   */
  function ninjaTraining(n, arr) {
    const dp = Array.from({ length: n }, () => new Array(4).fill(0));

    dp[0][0] = Math.max(arr[0][1], arr[0][2]);
    dp[0][1] = Math.max(arr[0][0], arr[0][2]);
    dp[0][2] = Math.max(arr[0][0], arr[0][1]);
    dp[0][3] = Math.max(arr[0][0], arr[0][1], arr[0][2]);

    for (let row = 1; row < n; row++) {
      for (let lastTask = 0; lastTask < 4; lastTask++) {
        for (let currTask = 0; currTask < 3; currTask++) {
          if (currTask === lastTask) continue;
          const points = arr[row][currTask] + dp[row - 1][currTask];
          dp[row][lastTask] = Math.max(dp[row][lastTask], points);
        }
      }
    }

    return dp[n - 1][3];
  }

  /* Read your input here 
    eg: For string variables:   let str = String(readLine()); 
        For int variables: let var_name = parseInt(readLine());
        For arrays : const arr = readLine().replace(/\s+$/g, '').split(' ');
    */

  /*
    Call your function with the input/parameters read above
    eg: let x = example(var_name, arr);
    */

  /*
    Log your output here 
    eg: console.log(x);
    */
}
