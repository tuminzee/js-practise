var removeElement = function (nums, val) {
  const n = nums.length;
  let end = n - 1;

  let i = 0;

  while (i < end) {
    if (nums[i] === val) {
      swap(i, end);
      i -= 1;
      end -= 1;
    }
    i += 1;
  }

  function swap(i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return end + 1;
};

// nums = [3,2,2,3], val = 3
console.log(removeElement([3, 2, 2, 3], 3));
// nums = [0,1,2,2,3,0,4,2], val = 2
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
