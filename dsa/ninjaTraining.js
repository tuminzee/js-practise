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
    const memo = {};
    function solve(last, curr) {
      if (curr == n) return 0;
      if ([last, curr] in memo) return memo[[last, curr]];

      let maxPoints = -Infinity;
      for (let day = 0; day < 3; day++) {
        if (r == i) continue;
        maxPoints = Math.max(maxPoints, arr[j][i] + solve(r, j + 1));
      }
      memo[[i, j]] = maxPoints;
      return maxPoints;
    }

    return Math.max(solve(0, 0), solve(1, 0), solve(2, 0));
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
