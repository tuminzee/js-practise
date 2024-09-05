// @ts-check

/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
  let nums = 0,
    denoms = 1;

  const regex = /([+-]?\d+)\/(\d+)/g;

  let match;

  while ((match = regex.exec(expression)) !== null) {
    let num = parseInt(match[1]);
    let den = parseInt(match[2]);

    nums = nums * den + num * denoms;
    denoms *= den;

    let gcdVal = gcd(Math.abs(nums), denoms);
    nums /= gcdVal;
    denoms /= gcdVal;
  }

  return nums.toString() + "/" + denoms.toString();
};

function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

console.log(fractionAddition("-1/2+1/2"));
console.log(fractionAddition("-1/2+1/2+1/3"));
