function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log(gcd(12, 24));
console.log(gcd(12, 240));
console.log(gcd(1, 100));
console.log(gcd(3, 33433));
console.log(gcd(30, 777));
console.log(lcm(70,700));
console.log(lcm(3,453));


