var sortColors = function(nums) {
  quickSort(nums, 0, nums.length-1);
}

function quickSort(nums, left, right) {
  const index = partition(nums, left, right);
  if (left < index-1) {
    quickSort(nums, left, index-1);
  }
  if (index < right) {
    quickSort(nums, index, right);
  }
}

function partition(nums, left, right) {
  const pivot = nums[ left + Math.floor((right-left)/2) ];
  
  while (left <= right) {
    while (pivot > nums[left]) { left += 1; }
    while (pivot < nums[right]) { right -= 1; }
    
    if (left <= right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left += 1;
      right -= 1;
    }
  }
  
  return left;
}
