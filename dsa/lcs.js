function lcs(s, t) {
  const n = s.length;
  const m = t.length;
  let prev = new Array(m + 1).fill(0);
  let curr = new Array(m + 1).fill(0);

  for (let i1 = 1; i1 <= n; i1++) {
    for (let i2 = 1; i2 <= m; i2++) {
      if (s[i1 - 1] === t[i2 - 1]) {
        curr[i2] = 1 + prev[i2 - 1];
      } else {
        curr[i2] = Math.max(prev[i2], curr[i2 - 1]);
      }
    }
    [prev, curr] = [curr, prev]
  }

  return prev[m];
}


console.log(
  lcs(
    "qdekwlfcvtjndsytniderraminwepdsghikwqasfg",
    "mworsderatctedtcashicngdeaknwqpoelopeddepi"
  )
);
console.log(lcs("adebc", "dcadb"));
console.log(lcs("ab", "defg"));

// tc - 2^n x 2^m
// sc - O(m+n)
