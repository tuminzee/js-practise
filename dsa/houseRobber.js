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
  // let t = parseInt(readLine());

  // while (t) {
  const _n = parseInt(readLine());
  const _arr = readLine().replace(/\s+$/g, "").split(" ").map(Number);
  console.log(houseRobber(_n, _arr));
  // t--;
  // }

  /**
   * @param {number} n
   * @param {number[]} arr
   * @returns {number}
   */
  function houseRobber(n, arr) {

    const dp = new Array(n).fill(0);

    dp[0] = arr[0];
    if (n > 1) dp[1] = Math.max(arr[0], arr[1]);

    for (let i = 2; i < n; i++) {
      let pick = dp[i - 2] + arr[i];
      let notPick = dp[i - 1];

      dp[i] = Math.max(pick, notPick);
    }

    return dp[n - 1];
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
