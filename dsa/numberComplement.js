// @ts-check
"use strict";

/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  const binaryString = num.toString(2);
  let complimentString = "";

  for (let char of binaryString) {
    if (char === "1") complimentString += "0";
    else complimentString += "1";
  }

  return parseInt(complimentString, 2);
  
};

console.log(findComplement(5));
console.log(findComplement(1));
