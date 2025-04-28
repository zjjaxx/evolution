var lengthOfLIS = function (nums) {
  if (nums.length == 0) {
    return [];
  }
  let result = [[nums[0]]];
  function update(item) {
    for (let i = result.length - 1; i >= 0; i--) {
      const resultItem = result[i];
      if (resultItem[resultItem.length - 1] < item) {
        result[i + 1] = [...resultItem, item];
        return result;
      }
    }
    result[0] = [item];
    return result;
  }
  for (let i = 1; i < nums.length; i++) {
    update(nums[i]);
  }
  return result[result.length - 1];
};
const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);
